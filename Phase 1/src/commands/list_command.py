"""
List command module for the Todo Python Console App.

Implements the functionality to display tasks with due date and recurrence indicators.
"""

from typing import Optional, List
from datetime import date
from todo import TodoManager, Task
from utils.date_utils import is_overdue, days_overdue
from utils.display_utils import format_task_line, get_task_due_status, get_recurrence_indicator


def list_tasks_with_options(app: TodoManager, args: List[str]) -> None:
    """
    Display all tasks with optional filtering and sorting, including due date and recurrence indicators.
    
    Args:
        app: The TodoManager instance
        args: List of arguments from the command line
    """
    # Parse command line arguments
    status = None
    priority = None
    tag = None
    sort_by = None
    ascending = True
    search_keyword = None
    due_status = None  # For filtering by due date status (overdue, due-today, upcoming)

    i = 0
    while i < len(args):
        arg = args[i]

        if arg == "--search" and i + 1 < len(args):
            search_keyword = args[i + 1]
            i += 2
        elif arg == "--filter" and i + 1 < len(args):
            filter_value = args[i + 1]
            if "=" in filter_value:
                key, value = filter_value.split("=", 1)
                if key == "status":
                    status = value
                elif key == "priority":
                    priority = value
                elif key == "tag":
                    tag = value
                elif key == "due-status":
                    due_status = value
            i += 2
        elif arg == "--sort" and i + 1 < len(args):
            sort_by = args[i + 1]
            i += 2
        elif arg == "--desc":
            ascending = False
            i += 1
        else:
            i += 1

    # Get all tasks
    all_tasks = list(app.tasks.values())

    # Apply search if provided
    if search_keyword:
        all_tasks = app.search_tasks(search_keyword)

    # Apply filters
    filtered_tasks = []
    for task in all_tasks:
        # Status filter
        if status:
            if status == "completed" and not task.completed:
                continue
            elif status == "pending" and task.completed:
                continue

        # Priority filter
        if priority and task.priority != priority:
            continue

        # Tag filter
        if tag and tag not in task.tags:
            continue

        # Due status filter
        if due_status:
            if due_status == "overdue" and not (task.due_date and is_overdue(task.due_date)):
                continue
            elif due_status == "due-today" and not (task.due_date and days_overdue(task.due_date) == 0):
                continue
            elif due_status == "upcoming" and not (task.due_date and days_overdue(task.due_date) > 0):
                continue

        filtered_tasks.append(task)

    # Apply sorting
    if sort_by:
        if sort_by == "due-date":
            # Sort by due date, overdue tasks first
            def sort_key(task):
                if not task.due_date:
                    # Tasks without due dates go to the end
                    return (2, date.max)  # Use a high priority and max date
                
                if is_overdue(task.due_date):
                    # Overdue tasks get highest priority
                    return (0, task.due_date)  # Priority 0, actual due date
                else:
                    # Non-overdue tasks get lower priority
                    return (1, task.due_date)  # Priority 1, actual due date

            filtered_tasks.sort(key=sort_key, reverse=not ascending)
        elif sort_by == "priority":
            priority_order = {"High": 1, "Medium": 2, "Low": 3}
            filtered_tasks.sort(
                key=lambda x: priority_order.get(x.priority, 999),
                reverse=not ascending
            )
        elif sort_by == "title":
            filtered_tasks.sort(
                key=lambda x: x.title.lower(),
                reverse=not ascending
            )
        elif sort_by == "created":
            filtered_tasks.sort(
                key=lambda x: x.id,
                reverse=not ascending
            )
    else:
        # Default sort: overdue tasks first, then by due date ascending
        def default_sort_key(task):
            if not task.due_date:
                # Tasks without due dates go to the end
                return (2, date.max, task.id)  # Priority 2, max date, then by ID
            
            if is_overdue(task.due_date):
                # Overdue tasks get highest priority
                return (0, task.due_date, task.id)  # Priority 0, due date, then by ID
            else:
                # Non-overdue tasks get middle priority
                return (1, task.due_date, task.id)  # Priority 1, due date, then by ID

        filtered_tasks.sort(key=default_sort_key)

    # Display the tasks
    if not filtered_tasks:
        print("\nNo tasks found.")
        return

    # Print table header
    print("\n{:<3}  {:^5}  {:^4}  {:<30}  {:<12}  {:<10}  {}".format("ID", "Stat", "Prio", "Title", "Due", "Recur", "Tags"))
    print("" + "-" * 90)

    for task in filtered_tasks:
        status = "x" if task.completed else " "
        pr = "H" if task.priority == "High" else ("M" if task.priority == "Medium" else ("L" if task.priority == "Low" else ""))
        title = task.title if len(task.title) <= 30 else task.title[:27] + "..."
        due = get_task_due_status(task)
        recur = get_recurrence_indicator(task)
        tags = ",".join(task.tags) if task.tags else ""

        print("{:<3}  [{:^3}]  {:^4}  {:<30}  {:<12}  {:<10}  {}".format(task.id, status, pr, title, due, recur, tags))