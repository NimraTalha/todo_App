# API Contract: Todo App CLI Interface

## Overview
CLI interface contracts for the Todo App with Intermediate Level features.

## Command Contracts

### Add Command
**Command**: `add <title> [description] [priority] [tags...]`
- **Purpose**: Add a new task with optional priority and tags
- **Parameters**:
  - `title`: Required string, task title
  - `description`: Optional string, task description
  - `priority`: Optional string, one of "High", "Medium", "Low" (defaults to "Medium")
  - `tags`: Optional list of strings, tags to assign to the task
- **Success Response**: "Task added with ID: <id>"
- **Error Response**: Appropriate error message for invalid input

### Update Command
**Command**: `update <id> [title] [description] [priority] [tags...]`
- **Purpose**: Update an existing task with new information
- **Parameters**:
  - `id`: Required integer, task identifier
  - `title`: Optional string, new task title
  - `description`: Optional string, new task description
  - `priority`: Optional string, one of "High", "Medium", "Low"
  - `tags`: Optional list of strings, new tags to assign to the task
- **Success Response**: "Task <id> updated successfully"
- **Error Response**: Appropriate error message for invalid input or non-existent task

### Update Priority Sub-Command
**Command**: `update <id> priority <priority>`
- **Purpose**: Update only the priority of an existing task
- **Parameters**:
  - `id`: Required integer, task identifier
  - `priority`: Required string, one of "High", "Medium", "Low"
- **Success Response**: "Task <id> priority updated to <priority>"
- **Error Response**: Appropriate error message for invalid input or non-existent task

### Update Tags Sub-Command
**Command**: `update <id> tags <tag1> [tag2] [tag3]...`
- **Purpose**: Update only the tags of an existing task
- **Parameters**:
  - `id`: Required integer, task identifier
  - `tag1, tag2, ...`: Required list of strings, new tags to assign to the task
- **Success Response**: "Task <id> tags updated successfully"
- **Error Response**: Appropriate error message for invalid input or non-existent task

### List Command
**Command**: `list [--filter <filter-type>=<value>] [--search <keyword>] [--sort <field>] [--desc]`
- **Purpose**: Display tasks with optional filtering, searching, and sorting
- **Parameters**:
  - `--filter`: Optional filter in format "status=pending", "priority=High", or "tag=work"
  - `--search`: Optional keyword to search in title and description
  - `--sort`: Optional field to sort by ("priority", "title", "created")
  - `--desc`: Optional flag to sort in descending order
- **Success Response**: Formatted list of tasks matching criteria
- **Error Response**: Appropriate error message for invalid filter/sort parameters

### Complete Command
**Command**: `complete <id>`
- **Purpose**: Toggle completion status of a task
- **Parameters**:
  - `id`: Required integer, task identifier
- **Success Response**: "Task <id> marked as [complete/incomplete]"
- **Error Response**: Appropriate error message for invalid input or non-existent task

### Delete Command
**Command**: `delete <id>`
- **Purpose**: Delete a task by ID
- **Parameters**:
  - `id`: Required integer, task identifier
- **Success Response**: "Task <id> deleted successfully"
- **Error Response**: Appropriate error message for invalid input or non-existent task

### Help Command
**Command**: `help`
- **Purpose**: Display available commands and usage
- **Parameters**: None
- **Success Response**: List of available commands with brief descriptions
- **Error Response**: N/A

### Exit Command
**Command**: `exit`
- **Purpose**: Exit the application
- **Parameters**: None
- **Success Response**: Application terminates
- **Error Response**: N/A