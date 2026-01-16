# Data Model: Advanced Todo Features

## Task Entity Extension

### Properties

- **id**: int - Unique identifier for the task
- **title**: str - Title of the task
- **description**: str - Description of the task
- **completed**: bool - Completion status of the task
- **priority**: str | None - Priority level (High/Medium/Low) - from Intermediate level
- **tags**: list[str] | None - Categories/labels for the task - from Intermediate level
- **due_date**: str | None - Due date in "YYYY-MM-DD" format (new for Advanced level)
- **recurrence_frequency**: str | None - Recurrence frequency: "daily", "weekly", "monthly", or None (new for Advanced level)

### Validation Rules

- **due_date**: Must follow "YYYY-MM-DD" format and represent a valid calendar date
- **recurrence_frequency**: Must be one of "daily", "weekly", "monthly", or None
- **id**: Must be unique within the task list
- **priority**: If present, must be one of "High", "Medium", "Low"

### State Transitions

- **Completion**: When a recurring task is marked as complete:
  - The current task's `completed` status changes to True
  - A new task instance is created with the same title, description, priority, and tags
  - The new task has an incremented due date based on the recurrence frequency
  - The new task has the same recurrence settings as the original

### Relationships

- **RecurringTask**: A task with `recurrence_frequency` not equal to None
- **DueDateTask**: A task with `due_date` not equal to None
- **OverdueTask**: A DueDateTask where `due_date` is in the past compared to current date

## Date Utility Functions

### Date Validation
- **validate_date_format(date_str: str) -> bool**: Validates that the input follows "YYYY-MM-DD" format
- **is_valid_date(date_str: str) -> bool**: Validates that the date string represents a real calendar date

### Date Calculations
- **get_next_occurrence(due_date: str, frequency: str) -> str**: Calculates the next occurrence date based on the recurrence frequency
- **is_overdue(due_date: str) -> bool**: Checks if the due date is in the past
- **days_overdue(due_date: str) -> int**: Returns the number of days a task is overdue (negative if in future)

### Date Parsing
- **parse_date(date_str: str) -> datetime.date**: Converts a "YYYY-MM-DD" string to a date object
- **format_date(date_obj: datetime.date) -> str**: Converts a date object to "YYYY-MM-DD" format