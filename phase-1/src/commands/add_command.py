"""
Add command module for the Todo Python Console App.

Implements the functionality to add new tasks with optional due date and recurrence.
"""

from typing import Optional, List
from todo import TodoManager
from utils.date_utils import is_valid_date


def add_task_with_options(app: TodoManager, args: List[str]) -> None:
    """
    Add a new task with optional due date and recurrence.
    
    Args:
        app: The TodoManager instance
        args: List of arguments from the command line
    """
    if len(args) < 1:
        print("Usage: add <title> [-d description] [-p priority] [-t tags] [--due-date YYYY-MM-DD] [--recurrence daily|weekly|monthly]")
        print("Example: add \"Buy groceries\" -d \"Milk and bread\" -p High -t shopping --due-date 2025-12-31 --recurrence weekly")
        return

    title = args[0]
    description = ""
    priority = "Medium"
    tags = []
    due_date = None
    recurrence = None

    # Parse command line arguments
    i = 1
    while i < len(args):
        arg = args[i]

        if arg == "-d" and i + 1 < len(args):
            description = args[i + 1]
            i += 2
        elif arg == "-p" and i + 1 < len(args):
            priority_val = args[i + 1]
            if priority_val in ["High", "Medium", "Low"]:
                priority = priority_val
            else:
                print(f"Error: Priority must be one of 'High', 'Medium', or 'Low'. Got: {priority_val}")
                return
            i += 2
        elif arg == "-t" and i + 1 < len(args):
            # Tags are space-separated, so we need to collect them until we hit another flag
            j = i + 1
            while j < len(args) and not args[j].startswith("-"):
                tags.append(args[j])
                j += 1
            i = j
        elif arg == "--due-date" and i + 1 < len(args):
            date_str = args[i + 1]
            if is_valid_date(date_str):
                due_date = date_str
            else:
                print(f"Error: Invalid date format or date. Please use YYYY-MM-DD format and ensure it's a valid date.")
                return
            i += 2
        elif arg == "--recurrence" and i + 1 < len(args):
            recurrence_val = args[i + 1]
            if recurrence_val in ["daily", "weekly", "monthly"]:
                recurrence = recurrence_val
            else:
                print(f"Error: Recurrence must be one of 'daily', 'weekly', or 'monthly'. Got: {recurrence_val}")
                return
            i += 2
        else:
            # If it's not a recognized flag, treat it as part of the description
            if description:
                description += " " + arg
            else:
                description = arg
            i += 1

    # Add the task to the app
    app.add_task(title=title, description=description, priority=priority, tags=tags, due_date=due_date, recurrence_frequency=recurrence)