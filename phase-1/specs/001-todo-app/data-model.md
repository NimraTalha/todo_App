# Data Model: Todo In-Memory Python Console App

## Task Entity

**Entity Name:** Task

**Description:** Represents a single to-do item in the application.

### Fields
- **id** (int): Unique identifier for the task, auto-generated as a sequential number
- **title** (str): Required text title of the task
- **description** (str): Optional text description of the task
- **completed** (bool): Boolean indicating whether the task is completed or not

### Relationships
- None (standalone entity)

### Validation Rules
- `id` must be unique and auto-incremented
- `title` is required and must not be empty
- `completed` defaults to `False` when creating a new task

### State Transitions
- A task can transition from incomplete (completed=False) to complete (completed=True)
- A task can transition from complete (completed=True) back to incomplete (completed=False)

## TodoManager Entity

**Entity Name:** TodoManager

**Description:** Manages the collection of tasks in memory and provides functionality for task operations.

### Fields
- **tasks** (dict): Dictionary storing tasks with ID as key and Task object as value
- **next_id** (int): Counter to track the next available ID for new tasks

### Validation Rules
- Must not contain duplicate task IDs
- Must validate that a title is provided before accepting a new task
- Must validate that a task ID exists before performing operations on it