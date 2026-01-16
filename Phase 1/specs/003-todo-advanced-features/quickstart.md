# Quickstart Guide: Advanced Todo Features Implementation

## Overview
This guide provides a step-by-step approach to implementing the Advanced Level features: Recurring Tasks and Due Dates & Overdue Indicators.

## Prerequisites
- Python 3.13+ installed
- Basic/Intermediate features already implemented
- Understanding of existing codebase structure

## Implementation Steps

### Step 1: Extend the Task Model
1. Open `src/todo.py`
2. Add `due_date` and `recurrence_frequency` properties to the Task class:
   ```python
   due_date: Optional[str] = None  # Format: "YYYY-MM-DD"
   recurrence_frequency: Optional[str] = None  # Values: "daily", "weekly", "monthly", None
   ```
3. Add validation for these new properties
4. Update the Task constructor and dataclass definition

### Step 2: Implement Date Utilities
1. Create `src/utils/date_utils.py`
2. Implement date validation functions:
   - `validate_date_format(date_str: str) -> bool`
   - `is_valid_date(date_str: str) -> bool`
   - `is_overdue(due_date: str) -> bool`
   - `get_next_occurrence(due_date: str, frequency: str) -> str`
3. Use Python's `datetime` module for calculations

### Step 3: Update Add Command
1. Modify the add command to accept `--due-date` and `--recurrence` parameters
2. Validate the date format and recurrence values
3. Create tasks with the new properties
4. Add helpful error messages and re-prompting for invalid dates

### Step 4: Update Update Command
1. Modify the update command to accept `--due-date` and `--recurrence` parameters
2. Validate the date format and recurrence values
3. Update tasks with the new properties
4. Preserve existing functionality for non-advanced properties

### Step 5: Enhance List Display
1. Update the list command to show due date information
2. Implement overdue detection and display indicators
3. Sort tasks with overdue tasks first, then by due date ascending
4. Add visual indicators like "[OVERDUE]" and days overdue

### Step 6: Implement Recurring Task Logic
1. Update the complete command to handle recurring tasks
2. When a recurring task is completed, create a new task with the next occurrence date
3. Preserve all properties from the original task (title, description, priority, tags, recurrence)
4. Show confirmation message when new instance is created

### Step 7: Add Recurrence Indicators
1. Update display functions to show recurrence indicators like "[RECUR]"
2. Make sure to distinguish recurring tasks visually in the list

### Step 8: Test Implementation
1. Test all new commands with valid inputs
2. Test error handling with invalid dates
3. Test recurring task creation when completing tasks
4. Verify sorting with overdue tasks appearing first
5. Confirm backward compatibility with existing tasks

## Key Validation Points
- Date format must be "YYYY-MM-DD"
- Recurrence must be one of "daily", "weekly", "monthly", or None
- Invalid dates should trigger re-prompting with examples
- Recurring tasks should generate new instances upon completion
- Overdue tasks must appear at the top of the list

## Common Pitfalls to Avoid
- Don't forget to validate date inputs on both add and update commands
- Ensure the sorting logic correctly places overdue tasks first
- Remember to preserve all properties when creating new recurring task instances
- Make sure the application remains backward compatible with tasks that don't have due dates or recurrence