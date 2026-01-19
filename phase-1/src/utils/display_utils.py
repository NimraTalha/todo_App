"""
Display utilities for the Todo Python Console App.

Implements formatting functions for displaying tasks with due dates and recurrence indicators.
"""

from datetime import date
from typing import Optional
from todo import Task
from utils.date_utils import is_overdue, days_overdue


def format_task_display(task: Task) -> str:
    """
    Formats a task for display in the console with appropriate indicators.
    
    Args:
        task: The task to format
        
    Returns:
        Formatted string representation of the task
    """
    status_icon = "✔" if task.completed else " "

    # Build due status and recurrence pieces
    due_status = get_task_due_status(task)
    recur = get_recurrence_indicator(task)

    # Priority short label
    priority = ""
    if task.priority == "High":
        priority = "[H]"
    elif task.priority == "Medium":
        priority = "[M]"
    elif task.priority == "Low":
        priority = "[L]"

    # Tags
    tags_str = ""
    if task.tags:
        tags_str = f"[{','.join(task.tags)}]"

    # Main summary line (aligned for readability)
    title = (task.title[:40] + "...") if len(task.title) > 43 else task.title
    formatted_task = f"{task.id:>3} | {status_icon} | {title:<43} {priority} {due_status} {recur} {tags_str}".strip()

    # Add description on a second indented line if present
    if task.description:
        formatted_task += f"\n    - {task.description}"

    return formatted_task


def get_task_due_status(task: Task) -> str:
    """
    Returns a string describing the due date status of a task.
    
    Args:
        task: The task to check
        
    Returns:
        String describing the due date status
    """
    if not task.due_date:
        return ""
    
    if is_overdue(task.due_date):
        days = days_overdue(task.due_date)
        return f"(due {days} days ago)"
    elif days_overdue(task.due_date) == 0:  # Due today
        return "(Due today)"
    else:  # Due in the future
        days = abs(days_overdue(task.due_date))
        return f"(due in {days} days)"


def get_recurrence_indicator(task: Task) -> str:
    """
    Returns a string indicating the recurrence status of a task.
    
    Args:
        task: The task to check
        
    Returns:
        String indicating recurrence status
    """
    if task.recurrence_frequency:
        return f"↻ {task.recurrence_frequency}"
    return ""


def format_task_line(task: Task) -> str:
    """
    Formats a task for display in a list with all indicators.
    
    Args:
        task: The task to format
        
    Returns:
        Formatted string for list display
    """
    # Use the same display style as format_task_display for consistency
    return format_task_display(task)