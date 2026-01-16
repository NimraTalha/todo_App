"""
Update command module for the Todo Python Console App.

Implements the functionality to update existing tasks with optional due date and recurrence.
"""

from typing import Optional, List
from todo import TodoManager
from utils.date_utils import is_valid_date


def update_task_with_options(app: TodoManager, args: List[str]) -> None:
    """
    Update an existing task with optional due date and recurrence.
    
    Args:
        app: The TodoManager instance
        args: List of arguments from the command line
    """
    if len(args) < 2:
        print("Usage: update <id> [-t title] [-d description] [-p priority] [-t tags] [--due-date YYYY-MM-DD] [--recurrence daily|weekly|monthly]")
        print("Example: update 1 -t \"Updated title\" -d \"Updated description\" --due-date 2025-12-31 --recurrence weekly")
        return

    try:
        task_id = int(args[0])
    except ValueError:
        print("Error: Task ID must be a number.")
        return

    # Check if the task exists
    task = app.get_task(task_id)
    if not task:
        print(f"Error: Task with ID {task_id} does not exist.")
        return

    # Default values - None means no change
    title = None
    description = None
    priority = None
    tags = None
    due_date = None
    recurrence = None

    # Parse command line arguments
    i = 1
    while i < len(args):
        arg = args[i]

        if arg == "-t" and i + 1 < len(args):
            # Check if this is for title or tags
            if title is None and args[i + 1].startswith('-') == False:
                # This is a title update
                title = args[i + 1]
                i += 2
            else:
                # This might be for tags, so we need to collect them
                j = i + 1
                tags = []
                while j < len(args) and not args[j].startswith("-"):
                    tags.append(args[j])
                    j += 1
                i = j
        elif arg == "--title" and i + 1 < len(args):
            title = args[i + 1]
            i += 2
        elif arg == "-d" and i + 1 < len(args):
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
        elif arg == "--tags" and i + 1 < len(args):
            # Tags are space-separated, so we need to collect them until we hit another flag
            j = i + 1
            tags = []
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
            print(f"Error: Unknown argument '{arg}'. Use -t for title, -d for description, -p for priority, --tags for tags, --due-date for due date, --recurrence for recurrence.")
            return

    # Update the task
    app.update_task(task_id=task_id, title=title, description=description, priority=priority, tags=tags, due_date=due_date, recurrence_frequency=recurrence)