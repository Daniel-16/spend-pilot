import base64
import os
from typing import Dict, Any
import PyPDF2
import io
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
from langchain_core.output_parsers import JsonOutputParser
from core.config import settings
from core.system_prompt import SYSTEM_PROMPT
import json
import logging

logger = logging.getLogger(__name__)

async def analyze_pdf_with_gemini(file_content: bytes, content_type: str) -> Dict[str, Any]:
    if not settings.GEMINI_API_KEY:
        raise RuntimeError("Gemini API key not configured.")
    
    os.environ["GOOGLE_API_KEY"] = settings.GEMINI_API_KEY

    if content_type.lower() != "application/pdf":
        raise ValueError(f"Invalid file type. Expected application/pdf, got {content_type}")

    try:
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-flash",
            temperature=0,
            max_tokens=None,
            timeout=None,
            max_retries=2,
        )
        
        parser = JsonOutputParser()
        chain = llm | parser
        
        try:
            result = await _analyze_with_vision(chain, file_content, content_type)
            return _validate_and_clean_result(result)
        except Exception as vision_error:
            logger.warning(f"Vision analysis failed, trying text extraction: {vision_error}")
            result = await _analyze_with_text_extraction(chain, file_content)
            return _validate_and_clean_result(result)
            
    except Exception as e:
        error_msg = str(e).lower()
        if "api key" in error_msg or "authentication" in error_msg or "401" in error_msg:
            raise RuntimeError("API key missing or invalid")
        elif "quota" in error_msg or "rate limit" in error_msg or "429" in error_msg:
            raise RuntimeError("Rate limit exceeded")
        elif "timeout" in error_msg or "504" in error_msg:
            raise RuntimeError("Request timed out")
        else:
            logger.error(f"Unexpected error: {str(e)}")
            raise RuntimeError(f"Failed to analyze PDF: {str(e)}")

async def _analyze_with_vision(chain, file_content: bytes, content_type: str) -> Dict[str, Any]:
    """Analyze PDF using vision capabilities."""
    b64_pdf = base64.b64encode(file_content).decode('utf-8')    
    message = HumanMessage(
        content=[
            {"type": "text", "text": SYSTEM_PROMPT},
            {
                "type": "image_url", 
                "image_url": {"url": f"data:{content_type};base64,{b64_pdf}"}
            }
        ]
    )
    result = await chain.ainvoke([message])
    return result

async def _analyze_with_text_extraction(chain, file_content: bytes) -> Dict[str, Any]:
    """Fallback: Extract text from PDF and analyze."""
    try:
        pdf_reader = PyPDF2.PdfReader(io.BytesIO(file_content))
        text_content = ""
        
        for page_num, page in enumerate(pdf_reader.pages):
            try:
                page_text = page.extract_text()
                if page_text.strip():
                    text_content += f"\n--- Page {page_num + 1} ---\n{page_text}\n"
            except Exception as e:
                logger.warning(f"Failed to extract text from page {page_num + 1}: {e}")
                continue
        
        if not text_content.strip():
            raise ValueError("Could not extract any readable text from PDF")
        
        full_prompt = f"""
        {SYSTEM_PROMPT}
        
        Here is the extracted text from the bank statement PDF:
        
        {text_content[:8000]}  # Limit text to avoid token limits
        """
        
        message = HumanMessage(content=full_prompt)
        result = await chain.ainvoke([message])
        return result
        
    except Exception as e:
        raise RuntimeError(f"Text extraction analysis failed: {str(e)}")

def _validate_and_clean_result(result: Any) -> Dict[str, Any]:
    """Validate and clean the LLM result."""
    
    if isinstance(result, str):
        if "```json" in result:
            try:
                json_start = result.find("```json") + 7
                json_end = result.find("```", json_start)
                json_str = result[json_start:json_end].strip()
                result = json.loads(json_str)
            except (json.JSONDecodeError, ValueError):
                pass
        
        if isinstance(result, str):
            try:
                result = json.loads(result.strip())
            except json.JSONDecodeError as e:
                logger.error(f"Failed to parse JSON response: {e}")
                logger.error(f"Raw response: {result[:500]}")
                raise ValueError("Invalid JSON response from LLM")
    
    if not isinstance(result, dict):
        raise ValueError(f"Expected dictionary response from LLM, got {type(result)}")
    
    if "error" in result:
        return result
    
    required_fields = ["transactions", "spending_by_category", "monthly_summary", "runway_estimate"]
    missing_fields = [field for field in required_fields if field not in result]
    
    if missing_fields:
        logger.error(f"Missing required fields: {missing_fields}")
        logger.error(f"Available fields: {list(result.keys())}")
        raise ValueError(f"Missing required fields in response: {missing_fields}")
    
    return _clean_data_structure(result)

def _clean_data_structure(result: Dict[str, Any]) -> Dict[str, Any]:
    """Clean and validate the data structure."""
    
    if not isinstance(result.get("transactions", []), list):
        result["transactions"] = []
    
    if not isinstance(result.get("spending_by_category", {}), dict):
        result["spending_by_category"] = {}
    
    if not isinstance(result.get("monthly_summary", []), list):
        result["monthly_summary"] = []
    
    runway = result.get("runway_estimate")
    if runway is not None:
        try:
            result["runway_estimate"] = float(runway) if runway != "null" else None
        except (ValueError, TypeError):
            result["runway_estimate"] = None
    
    for transaction in result["transactions"]:
        if isinstance(transaction, dict):
            if "amount" in transaction:
                try:
                    transaction["amount"] = round(float(transaction["amount"]), 2)
                except (ValueError, TypeError):
                    pass
            if "balance" in transaction and transaction["balance"] is not None:
                try:
                    transaction["balance"] = round(float(transaction["balance"]), 2)
                except (ValueError, TypeError):
                    transaction["balance"] = None
    
    for category, amount in result["spending_by_category"].items():
        try:
            result["spending_by_category"][category] = round(float(amount), 2)
        except (ValueError, TypeError):
            result["spending_by_category"][category] = 0.0
    
    for month_data in result["monthly_summary"]:
        if isinstance(month_data, dict):
            for field in ["inflow", "outflow", "closing_balance"]:
                if field in month_data and month_data[field] is not None:
                    try:
                        month_data[field] = round(float(month_data[field]), 2)
                    except (ValueError, TypeError):
                        month_data[field] = 0.0
    
    return result