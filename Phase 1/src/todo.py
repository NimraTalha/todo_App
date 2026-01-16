#!/usr/bin/env python3
"""
Core functionality for the Todo Python Console App.

Implements the task management features as specified in the project constitution.
"""

from typing import Dict, List, Optional
from dataclasses import dataclass, field


@dataclass
class Task:
    """Represents a single task in the todo list."""
    id: int
    title: str
    description: str = ""
    completed: bool = False
    priority: str = "Medium"  # "High", "Medium", or "Low"
    tags: List[str] = field(default_factory=list)  # List of string tags
    due_date: Optional[str] = None  # Due date in "YYYY-MM-DD" format
    recurrence_frequency: Optional[str] = None  # Recurrence frequency: "daily", "weekly", "monthly", or None

    def __str__(self) -> str:
        status = "[x]" if self.completed else "[ ]"
        return f"{status} {self.id}: {self.title} - {self.description}"


class TodoManager:
    """Main application class for the Todo Console App."""
    
    def __init__(self):
        self.tasks: Dict[int, Task] = {}
        self.next_id = 1
        
    def add_task(self, title: str, description: str = "", priority: str = "Medium", tags: Optional[List[str]] = None,
                 due_date: Optional[str] = None, recurrence_frequency: Optional[str] = None) -> None:
        """Add a new task with a unique ID."""
        if not title.strip():
            print("Error: Task title cannot be empty.")
            return

        # Validate priority
        priority = priority if priority in ["High", "Medium", "Low"] else "Medium"

        # Ensure tags is a list
        tags = tags if tags is not None else []

        # Validate recurrence frequency if provided
        if recurrence_frequency and recurrence_frequency not in ["daily", "weekly", "monthly"]:
            print(f"Error: Recurrence must be one of 'daily', 'weekly', or 'monthly'. Got: {recurrence_frequency}")
            return

        task = Task(self.next_id, title.strip(), description.strip(), priority=priority, tags=tags,
                   due_date=due_date, recurrence_frequency=recurrence_frequency)
        self.tasks[self.next_id] = task
        print(f"Task added with ID: {self.next_id}")
        self.next_id += 1
        
    def delete_task(self, task_id: int) -> None:
        """Delete a task by its ID."""
        if task_id not in self.tasks:
            print(f"Error: Task with ID {task_id} does not exist.")
            return
            
        del self.tasks[task_id]
        print(f"Task {task_id} deleted successfully.")
        
    def update_task(self, task_id: int, title: Optional[str] = None, description: Optional[str] = None,
                    priority: Optional[str] = None, tags: Optional[List[str]] = None,
                    due_date: Optional[str] = None, recurrence_frequency: Optional[str] = None) -> None:
        """Update a task's title, description, priority, tags, due date, or recurrence."""
        if task_id not in self.tasks:
            print(f"Error: Task with ID {task_id} does not exist.")
            return

        task = self.tasks[task_id]

        if title is not None:
            title = title.strip()
            if title:
                task.title = title
            else:
                print("Error: Task title cannot be empty.")
                return

        if description is not None:
            task.description = description.strip()

        if priority is not None:
            if priority in ["High", "Medium", "Low"]:
                task.priority = priority
            else:
                print("Error: Priority must be one of 'High', 'Medium', or 'Low'.")
                return

        if tags is not None:
            task.tags = tags

        if due_date is not None:
            # Validate the due date format
            from utils.date_utils import is_valid_date
            if due_date is not None and due_date != "" and not is_valid_date(due_date):
                print(f"Error: Invalid date format or date. Please use YYYY-MM-DD format and ensure it's a valid date.")
                return
            task.due_date = due_date

        if recurrence_frequency is not None:
            # Validate the recurrence frequency
            if recurrence_frequency and recurrence_frequency not in ["daily", "weekly", "monthly"]:
                print(f"Error: Recurrence must be one of 'daily', 'weekly', or 'monthly'. Got: {recurrence_frequency}")
                return
            task.recurrence_frequency = recurrence_frequency

        print(f"Task {task_id} updated successfully.")
        
    def list_tasks(self) -> None:
        """Display all tasks with their ID, title, description, priority, tags, and completion status."""
        if not self.tasks:
            print("No tasks available.")
            return

        print("\nID  Prio  Tags              Title                Description        Status")
        print("--  ----  ----              -----                -----------        ------")

        # Sort tasks by ID
        for task_id in sorted(self.tasks.keys()):
            task = self.tasks[task_id]
            status = "[x]" if task.completed else "[ ]"

            # Format priority indicator
            priority_indicator = ""
            if task.priority == "High":
                priority_indicator = "[H]"
            elif task.priority == "Medium":
                priority_indicator = "[M]"
            elif task.priority == "Low":
                priority_indicator = "[L]"
            else:
                priority_indicator = "[ ]"  # Default if priority is invalid

            # Format tags (show up to 3, with ellipsis if more)
            tags_str = ""
            if task.tags:
                if len(task.tags) > 3:
                    tags_str = ",".join(task.tags[:3]) + ",..."
                else:
                    tags_str = ",".join(task.tags)

            # Truncate title and description to fit the display
            title = task.title[:17] + ".." if len(task.title) > 17 else task.title
            desc = task.description[:15] + ".." if len(task.description) > 15 else task.description

            print(f"{task.id:<3} {priority_indicator:<4} {tags_str:<17} {title:<17} {desc:<15} {status}")
            
    def toggle_task_status(self, task_id: int) -> None:
        """Toggle the completion status of a task."""
        if task_id not in self.tasks:
            print(f"Error: Task with ID {task_id} does not exist.")
            return
            
        task = self.tasks[task_id]
        task.completed = not task.completed
        status = "complete" if task.completed else "incomplete"
        print(f"Task {task_id} marked as {status}.")
        
    def get_task(self, task_id: int) -> Optional[Task]:
        """Get a task by its ID."""
        return self.tasks.get(task_id)

    def search_tasks(self, keyword: str) -> List[Task]:
        """Search tasks by keyword in title or description."""
        keyword = keyword.lower()
        results = []
        for task in self.tasks.values():
            if keyword in task.title.lower() or keyword in task.description.lower():
                results.append(task)
        return results

    def filter_tasks(self, status: Optional[str] = None, priority: Optional[str] = None, tag: Optional[str] = None) -> List[Task]:
        """Filter tasks by status, priority, or tag."""
        results = list(self.tasks.values())

        if status is not None:
            if status == "completed":
                results = [task for task in results if task.completed]
            elif status == "pending":
                results = [task for task in results if not task.completed]

        if priority is not None:
            results = [task for task in results if task.priority == priority]

        if tag is not None:
            results = [task for task in results if tag in task.tags]

        return results

    def sort_tasks(self, sort_by: str, ascending: bool = True) -> List[Task]:
        """Sort tasks by specified field."""
        if sort_by == "priority":
            # Define priority order: High, Medium, Low
            priority_order = {"High": 1, "Medium": 2, "Low": 3}
            sorted_tasks = sorted(self.tasks.values(),
                                key=lambda x: priority_order.get(x.priority, 999),
                                reverse=not ascending)
        elif sort_by == "title":
            sorted_tasks = sorted(self.tasks.values(),
                                key=lambda x: x.title.lower(),
                                reverse=not ascending)
        elif sort_by == "created":
            # Sort by task ID (creation order)
            sorted_tasks = sorted(self.tasks.values(),
                                key=lambda x: x.id,
                                reverse=not ascending)
        else:
            # Default sorting by ID
            sorted_tasks = sorted(self.tasks.values(),
                                key=lambda x: x.id,
                                reverse=not ascending)

        return sorted_tasks

    def list_filtered_tasks(self, status: Optional[str] = None, priority: Optional[str] = None,
                          tag: Optional[str] = None, sort_by: Optional[str] = None,
                          ascending: bool = True, search_keyword: Optional[str] = None) -> None:
        """Display filtered and sorted tasks."""
        # Start with all tasks
        tasks_to_display = list(self.tasks.values())

        # Apply search if provided
        if search_keyword:
            tasks_to_display = self.search_tasks(search_keyword)

        # Apply filters
        if status or priority or tag:
            # We need to apply each filter individually since our filter method takes one filter at a time
            if status:
                tasks_to_display = [task for task in tasks_to_display if
                                  (status == "completed" and task.completed) or
                                  (status == "pending" and not task.completed)]

            if priority:
                tasks_to_display = [task for task in tasks_to_display if task.priority == priority]

            if tag:
                tasks_to_display = [task for task in tasks_to_display if tag in task.tags]

        # Apply sorting if requested
        if sort_by:
            if sort_by == "priority":
                priority_order = {"High": 1, "Medium": 2, "Low": 3}
                tasks_to_display = sorted(tasks_to_display,
                                        key=lambda x: priority_order.get(x.priority, 999),
                                        reverse=not ascending)
            elif sort_by == "title":
                tasks_to_display = sorted(tasks_to_display,
                                        key=lambda x: x.title.lower(),
                                        reverse=not ascending)
            elif sort_by == "created":
                tasks_to_display = sorted(tasks_to_display,
                                        key=lambda x: x.id,
                                        reverse=not ascending)

        # Display the filtered/sorted tasks
        if not tasks_to_display:
            print("No tasks match the specified criteria.")
            return

        print("\nID  Prio  Tags              Title                Description        Status")
        print("--  ----  ----              -----                -----------        ------")

        for task in tasks_to_display:
            status = "[x]" if task.completed else "[ ]"

            # Format priority indicator
            priority_indicator = ""
            if task.priority == "High":
                priority_indicator = "[H]"
            elif task.priority == "Medium":
                priority_indicator = "[M]"
            elif task.priority == "Low":
                priority_indicator = "[L]"
            else:
                priority_indicator = "[ ]"  # Default if priority is invalid

            # Format tags (show up to 3, with ellipsis if more)
            tags_str = ""
            if task.tags:
                if len(task.tags) > 3:
                    tags_str = ",".join(task.tags[:3]) + ",..."
                else:
                    tags_str = ",".join(task.tags)

            # Truncate title and description to fit the display
            title = task.title[:17] + ".." if len(task.title) > 17 else task.title
            desc = task.description[:15] + ".." if len(task.description) > 15 else task.description

            print(f"{task.id:<3} {priority_indicator:<4} {tags_str:<17} {title:<17} {desc:<15} {status}")