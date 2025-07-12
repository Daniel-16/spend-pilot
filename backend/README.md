# SpendPilot Backend (Minimal LLM Version)

This backend provides a single endpoint to analyze bank statement PDFs using the Gemini LLM API.

## Setup

1. **Install dependencies:**
   ```bash
   pip install fastapi uvicorn httpx pydantic-settings
   ```
2. **Set your Gemini API key:**
   - Create a `.env` file in the backend directory:
     ```env
     GEMINI_API_KEY=your_gemini_api_key_here
     ```

## Running the Server

```bash
uvicorn main:app --reload
```

## API Usage

### POST `/analyze-statement`

- **Body:** `multipart/form-data` with a single PDF file (`file` field)
- **Response:** JSON with extracted transactions, spending by category, monthly summary, and runway estimate.

#### Example (using `curl`):

```bash
curl -F "file=@your_statement.pdf" http://localhost:8000/analyze-statement
```

---

This backend is minimal by design. All analysis is performed by the Gemini LLM.
