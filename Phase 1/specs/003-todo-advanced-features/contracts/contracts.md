# API Contracts: Advanced Todo Features

## Command Interface Definitions

### Add Command
```
add "task title" -d "task description" -p [priority] -t [tags] --due-date [YYYY-MM-DD] --recurrence [frequency]
```

- **Purpose**: Create a new task with optional due date and recurrence
- **Parameters**:
  - `title` (required): Task title
  - `-d description` (optional): Task description
  - `-p priority` (optional): Priority level (High/Medium/Low)
  - `-t tags` (optional): Comma-separated tags
  - `--due-date` (optional): Due date in "YYYY-MM-DD" format
  - `--recurrence` (optional): Recurrence frequency (daily/weekly/monthly)
- **Success Response**: Task created with ID and confirmation message
- **Error Response**: Error message with validation details if due date invalid

### Update Command
```
update [task_id] -t "new title" -d "new description" -p [priority] -t [tags] --due-date [YYYY-MM-DD] --recurrence [frequency]
```

- **Purpose**: Update an existing task with optional due date and recurrence
- **Parameters**:
  - `task_id` (required): ID of the task to update
  - `-t new_title` (optional): New task title
  - `-d new_description` (optional): New task description
  - `-p priority` (optional): New priority level (High/Medium/Low)
  - `-t tags` (optional): New comma-separated tags
  - `--due-date` (optional): New due date in "YYYY-MM-DD" format
  - `--recurrence` (optional): New recurrence frequency (daily/weekly/monthly)
- **Success Response**: Task updated confirmation with details
- **Error Response**: Error message with validation details if due date invalid

### List Command
```
list [--filter status|priority|due-status] [--sort due-date|priority|id]
```

- **Purpose**: Display all tasks with optional filtering and sorting
- **Parameters**:
  - `--filter` (optional): Filter by status (pending/completed), priority (High/Medium/Low), or due status (overdue/due-today/upcoming)
  - `--sort` (optional): Sort by due date, priority, or ID
- **Success Response**: Formatted list of tasks with due date and recurrence indicators
- **Display Format**: 
  - Overdue tasks: `[OVERDUE] [ID] [Title] (due [X days ago]) [RECUR]`
  - Due today tasks: `[ID] [Title] (Due today) [RECUR]`
  - Future due tasks: `[ID] [Title] (due in [X days]) [RECUR]`
  - Non-due tasks: `[ID] [Title] [RECUR]`
- Default sort: Overdue tasks first, then by due date ascending

### Complete Command
```
complete [task_id]
```

- **Purpose**: Mark a task as complete, with special handling for recurring tasks
- **Parameters**:
  - `task_id` (required): ID of the task to mark complete
- **Success Response**: 
  - For non-recurring tasks: Confirmation that task is marked complete
  - For recurring tasks: Confirmation plus message about next instance creation
- **Special Logic**: If the task has recurrence, automatically create a new instance with updated due date

## Internal API (Python Functions)

### Task Management
```
create_task(title: str, description: str = "", priority: str = None, tags: list[str] = None, due_date: str = None, recurrence_frequency: str = None) -> Task
```
- Creates a new task with all specified properties

```
update_task(task_id: int, title: str = None, description: str = None, priority: str = None, tags: list[str] = None, due_date: str = None, recurrence_frequency: str = None) -> Task
```
- Updates an existing task with specified properties

```
get_all_tasks(sort_overdue_first: bool = True) -> list[Task]
```
- Retrieves all tasks, sorted with overdue tasks first by default

```
mark_task_complete(task_id: int) -> dict
```
- Marks a task as complete and handles recurring task logic
- Returns dict with completion status and any new task created

### Date Utilities
```
validate_date_format(date_str: str) -> bool
```
- Validates that date string follows "YYYY-MM-DD" format

```
is_valid_date(date_str: str) -> bool
```
- Validates that date string represents a real calendar date

```
is_overdue(due_date: str) -> bool
```
- Checks if the due date is in the past

```
get_next_occurrence(due_date: str, frequency: str) -> str
```
- Calculates the next occurrence date based on recurrence frequency

### Display Formatting
```
format_task_display(task: Task) -> str
```
- Formats a task for display in the console with appropriate indicators

```
calculate_days_overdue(due_date: str) -> int
```
- Returns number of days a task is overdue (negative if in future)