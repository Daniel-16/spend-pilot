import pandas as pd
from typing import Dict, Any, List, Optional

class StatementAnalyzer:
    """Analyzes bank statement data and provides insights"""
    
    def __init__(self):
        self.required_columns = ['date', 'description', 'amount']
        self.column_variants = {
            'date': ['transaction_date', 'trans_date', 'posting_date', 'date'],
            'description': ['description', 'details', 'transaction_details', 'memo'],
            'amount': ['amount', 'debit', 'credit', 'balance', 'transaction_amount']
        }
    
    def analyze_statement(self, df: pd.DataFrame, filename: str) -> Dict[str, Any]:
        """Analyze bank statement and return insights"""
        
        column_mapping = self._map_columns(df)
        
        stats = self._get_basic_stats(df, filename)
        
        insights = self._get_insights(df, column_mapping)
        
        preview = self._get_data_preview(df)
        
        return {
            "stats": stats,
            "column_mapping": column_mapping,
            "insights": insights,
            "preview": preview
        }
    
    def _map_columns(self, df: pd.DataFrame) -> Dict[str, Optional[str]]:
        """Map DataFrame columns to standard column names"""
        column_mapping = {}
        df_columns_lower = [col.lower() for col in df.columns]
        
        for req_col in self.required_columns:
            found_column = None
            
            for col in df.columns:
                if req_col.lower() == col.lower():
                    found_column = col
                    break
            
            if not found_column:
                for variant in self.column_variants.get(req_col, []):
                    for col in df.columns:
                        if variant.lower() in col.lower() or col.lower() in variant.lower():
                            found_column = col
                            break
                    if found_column:
                        break
            
            column_mapping[req_col] = found_column
        
        return column_mapping
    
    def _get_basic_stats(self, df: pd.DataFrame, filename: str) -> Dict[str, Any]:
        """Get basic statistics about the DataFrame"""
        return {
            "filename": filename,
            "total_rows": len(df),
            "total_columns": len(df.columns),
            "columns": list(df.columns),
            "memory_usage_mb": round(df.memory_usage(deep=True).sum() / (1024 * 1024), 2)
        }
    
    def _get_insights(self, df: pd.DataFrame, column_mapping: Dict[str, Optional[str]]) -> Dict[str, Any]:
        """Generate insights from the data"""
        insights = {}
        
        if column_mapping.get('amount'):
            amount_col = column_mapping['amount']
            if amount_col is not None and pd.api.types.is_numeric_dtype(df[amount_col]):
                insights.update(self._get_amount_insights(df, amount_col))
        
        if column_mapping.get('date'):
            date_col = column_mapping['date']
            if date_col is not None:
                insights.update(self._get_date_insights(df, date_col))
        
        if column_mapping.get('description'):
            desc_col = column_mapping['description']
            if desc_col is not None:
                insights.update(self._get_description_insights(df, desc_col))
        
        return insights
    
    def _get_amount_insights(self, df: pd.DataFrame, amount_col: str) -> Dict[str, Any]:
        """Get insights from amount column"""
        amounts = df[amount_col].dropna()
        
        if len(amounts) == 0:
            return {"amount_insights": "No valid amount data found"}
        
        return {
            "amount_insights": {
                "total_transactions": len(amounts),
                "total_amount": float(amounts.sum()),
                "average_transaction": float(amounts.mean()),
                "median_transaction": float(amounts.median()),
                "min_transaction": float(amounts.min()),
                "max_transaction": float(amounts.max()),
                "positive_transactions": int((amounts > 0).sum()),
                "negative_transactions": int((amounts < 0).sum()),
                "zero_transactions": int((amounts == 0).sum())
            }
        }
    
    def _get_date_insights(self, df: pd.DataFrame, date_col: str) -> Dict[str, Any]:
        """Get insights from date column"""
        try:
            dates = pd.to_datetime(df[date_col], errors='coerce').dropna()
            
            if len(dates) == 0:
                return {"date_insights": "No valid date data found"}
            
            return {
                "date_insights": {
                    "earliest_transaction": dates.min().strftime('%Y-%m-%d'),
                    "latest_transaction": dates.max().strftime('%Y-%m-%d'),
                    "date_range_days": (dates.max() - dates.min()).days,
                    "transactions_with_valid_dates": len(dates)
                }
            }
        except Exception:
            return {"date_insights": "Unable to parse date information"}
    
    def _get_description_insights(self, df: pd.DataFrame, desc_col: str) -> Dict[str, Any]:
        """Get insights from description column"""
        descriptions = df[desc_col].dropna().astype(str)
        
        if len(descriptions) == 0:
            return {"description_insights": "No description data found"}
        
        all_words = ' '.join(descriptions.str.upper()).split()
        word_counts = pd.Series(all_words).value_counts().head(10)
        
        return {
            "description_insights": {
                "unique_descriptions": len(descriptions.unique()),
                "most_common_words": word_counts.to_dict(),
                "average_description_length": float(descriptions.str.len().mean())
            }
        }
    
    def _get_data_preview(self, df: pd.DataFrame, rows: int = 5) -> List[Dict[str, Any]]:
        """Get a preview of the data"""
        return df.head(rows).to_dict('records')