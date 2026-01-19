# API Contract: Todo In-Memory Python Console App

## Overview
This contract defines the command-line interface for the Todo application. All interactions occur through console commands with specific syntax.

## Commands

### Add Task
- **Command**: `add "title" [description]`
- **Synopsis**: Adds a new task to the todo list
- **Parameters**:
  - `title` (string, required): Title of the task (must not be empty)
  - `description` (string, optional): Description of the task
- **Response**: Confirmation message with the assigned task ID
- **Error Cases**:
  - Title is empty → Error message: "Error: Task title cannot be empty."

### List Tasks
- **Command**: `list`
- **Synopsis**: Displays all tasks with their details
- **Parameters**: None
- **Response**: Table of tasks with ID, title, description, and completion status
- **Sample Output**:
  ```
  ID  Title              Description        Status
  --  -----              -----------        ------
  1   Buy groceries      Milk, eggs, bread  [ ]
  2   Walk the dog                          [x]
  ```

### Update Task
- **Command**: `update [id] [title] [description]`
- **Synopsis**: Updates an existing task's title and/or description
- **Parameters**:
  - `id` (int, required): ID of the task to update
  - `title` (string, optional): New title for the task
  - `description` (string, optional): New description for the task
- **Response**: Confirmation message
- **Error Cases**:
  - Task ID doesn't exist → Error message: "Error: Task with ID {id} does not exist."
  - Title is empty → Error message: "Error: Task title cannot be empty."

### Complete Task
- **Command**: `complete [id]`
- **Synopsis**: Toggles the completion status of a task
- **Parameters**:
  - `id` (int, required): ID of the task to update
- **Response**: Confirmation message showing new status
- **Error Cases**:
  - Task ID doesn't exist → Error message: "Error: Task with ID {id} does not exist."

### Delete Task
- **Command**: `delete [id]`
- **Synopsis**: Removes a task from the todo list
- **Parameters**:
  - `id` (int, required): ID of the task to delete
- **Response**: Confirmation message
- **Error Cases**:
  - Task ID doesn't exist → Error message: "Error: Task with ID {id} does not exist."

### Help
- **Command**: `help`
- **Synopsis**: Shows available commands
- **Parameters**: None
- **Response**: List of available commands with usage

### Exit
- **Command**: `exit`
- **Synopsis**: Quits the application
- **Parameters**: None
- **Response**: Goodbye message