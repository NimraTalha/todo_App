"""
Complete command module for the Todo Python Console App.

Implements the functionality to mark tasks as complete with special handling for recurring tasks.
"""

from typing import Optional, List
from todo import TodoManager, Task


def complete_task_with_recurrence(app: TodoManager, args: List[str]) -> None:
    """
    Mark a task as complete, with special handling for recurring tasks.
    
    Args:
        app: The TodoManager instance
        args: List of arguments from the command line
    """
    if len(args) != 1:
        print("Usage: complete <id>")
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

    # If the task is already completed, mark it as incomplete
    if task.completed:
        task.completed = False
        print(f"Task {task_id} marked as incomplete.")
        return

    # Mark the task as completed
    task.completed = True

    # Check if it's a recurring task
    if task.recurrence_frequency:
        # Create a new task with the same properties but incremented due date
        from utils.date_utils import get_next_occurrence
        
        next_due_date = None
        if task.due_date:
            next_due_date = get_next_occurrence(task.due_date, task.recurrence_frequency)
        
        # Create new task with the same properties
        app.add_task(
            title=task.title,
            description=task.description,
            priority=task.priority,
            tags=task.tags.copy(),  # Copy the tags
            due_date=next_due_date,
            recurrence_frequency=task.recurrence_frequency
        )
        
        print(f"Task {task_id} marked as complete. Next occurrence created with new ID.")
    else:
        print(f"Task {task_id} marked as complete.")