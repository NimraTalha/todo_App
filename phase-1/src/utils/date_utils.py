"""
Date utilities for the Todo Python Console App.

Implements date validation, parsing, and calculation functions for the Advanced Level features.
"""

from datetime import datetime, date, timedelta
import re
from typing import Optional


def validate_date_format(date_str: str) -> bool:
    """
    Validates that the input follows "YYYY-MM-DD" format.
    
    Args:
        date_str: Date string to validate
        
    Returns:
        True if the format is valid, False otherwise
    """
    pattern = r'^\d{4}-\d{2}-\d{2}$'
    return bool(re.match(pattern, date_str))


def is_valid_date(date_str: str) -> bool:
    """
    Validates that the date string represents a real calendar date.
    
    Args:
        date_str: Date string in "YYYY-MM-DD" format
        
    Returns:
        True if the date is valid, False otherwise
    """
    if not validate_date_format(date_str):
        return False
    
    try:
        year, month, day = map(int, date_str.split('-'))
        date(year, month, day)  # This will raise ValueError for invalid dates
        return True
    except ValueError:
        return False


def parse_date(date_str: str) -> Optional[date]:
    """
    Converts a "YYYY-MM-DD" string to a date object.
    
    Args:
        date_str: Date string in "YYYY-MM-DD" format
        
    Returns:
        Date object if valid, None otherwise
    """
    if not is_valid_date(date_str):
        return None
    
    year, month, day = map(int, date_str.split('-'))
    return date(year, month, day)


def format_date(date_obj: date) -> str:
    """
    Converts a date object to "YYYY-MM-DD" format.
    
    Args:
        date_obj: Date object to format
        
    Returns:
        Date string in "YYYY-MM-DD" format
    """
    return date_obj.strftime("%Y-%m-%d")


def is_overdue(due_date: str) -> bool:
    """
    Checks if the due date is in the past compared to current date.
    
    Args:
        due_date: Due date string in "YYYY-MM-DD" format
        
    Returns:
        True if the due date is in the past, False otherwise
    """
    due_date_obj = parse_date(due_date)
    if due_date_obj is None:
        return False
    
    today = date.today()
    return due_date_obj < today


def days_overdue(due_date: str) -> int:
    """
    Returns the number of days a task is overdue (negative if in future).
    
    Args:
        due_date: Due date string in "YYYY-MM-DD" format
        
    Returns:
        Number of days overdue (positive) or days until due (negative)
    """
    due_date_obj = parse_date(due_date)
    if due_date_obj is None:
        return 0
    
    today = date.today()
    delta = today - due_date_obj
    return delta.days


def get_next_occurrence(due_date: str, frequency: str) -> Optional[str]:
    """
    Calculates the next occurrence date based on the recurrence frequency.
    
    Args:
        due_date: Current due date in "YYYY-MM-DD" format
        frequency: Recurrence frequency - "daily", "weekly", "monthly"
        
    Returns:
        Next occurrence date in "YYYY-MM-DD" format, or None if invalid
    """
    if not is_valid_date(due_date) or frequency not in ["daily", "weekly", "monthly"]:
        return None
    
    current_date = parse_date(due_date)
    if current_date is None:
        return None
    
    if frequency == "daily":
        next_date = current_date + timedelta(days=1)
    elif frequency == "weekly":
        next_date = current_date + timedelta(days=7)
    elif frequency == "monthly":
        # For monthly recurrence, we add approximately 30 days
        # For more accurate monthly recurrence, we'd need to handle month boundaries
        next_date = current_date + timedelta(days=30)
    else:
        return None
    
    return format_date(next_date)