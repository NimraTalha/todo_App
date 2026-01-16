# Quickstart Guide: Todo App - Intermediate Level Features

## Overview
This guide provides a quick walkthrough of the Intermediate Level features for the Todo Python Console App, including priorities, tags, search, filter, and sort capabilities.

## Prerequisites
- Python 3.13 or newer
- UV package manager (for environment setup)

## Setup
1. Ensure Python 3.13+ is installed on your system
2. Install UV if not already installed: `pip install uv`
3. Create and activate a virtual environment:
   ```bash
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```
4. Navigate to the src directory: `cd src`
5. Run the application: `python main.py`

## New Features Overview

### 1. Priorities & Tags
- Assign priority levels (High, Medium, Low) to tasks
- Add multiple tags to organize tasks by category
- View priority and tags when listing tasks

### 2. Search & Filter
- Search tasks by keyword in title/description
- Filter tasks by status, priority, or tags
- Combine multiple filters for precise results

### 3. Sort Tasks
- Sort task list by priority, title, or creation date
- Choose ascending or descending order
- Sorting applies only to current view (non-destructive)

## Command Examples

### Adding Tasks with Priority and Tags
```
> add "Prepare presentation" "Create slides for meeting" High work presentation
Task added with ID: 1

> add "Buy groceries" "Milk, eggs, bread" Medium personal
Task added with ID: 2

> add "Fix bug #123" "Login issue on mobile" High work urgent
Task added with ID: 3
```

### Updating Task Priority and Tags
```
> update 2 priority Low
Task 2 priority updated to Low

> update 3 tags work urgent critical
Task 3 tags updated successfully
```

### Viewing Tasks with Priority and Tags
```
> list
ID  Priority  Tags              Title                Description              Status
1   [H]       work,presentation Prepare presentation Create slides for meeting [ ]
2   [M]       personal          Buy groceries        Milk, eggs, bread        [ ]
3   [H]       work,urgent,...   Fix bug #123         Login issue on mobile    [ ]
```

### Searching Tasks
```
> list --search "bug"
ID  Priority  Tags        Title        Description        Status
3   [H]       work,urgent Fix bug #123 Login issue on mobile [ ]
```

### Filtering Tasks
```
> list --filter priority=High
ID  Priority  Tags        Title        Description        Status
1   [H]       work,presentation Prepare presentation Create slides for meeting [ ]
3   [H]       work,urgent,...   Fix bug #123         Login issue on mobile    [ ]

> list --filter tag=work
ID  Priority  Tags              Title        Description        Status
1   [H]       work,presentation Prepare presentation Create slides for meeting [ ]
3   [H]       work,urgent,...   Fix bug #123         Login issue on mobile    [ ]

> list --filter status=pending
ID  Priority  Tags              Title        Description        Status
(all pending tasks listed)
```

### Combining Filters
```
> list --filter priority=High --filter tag=work
ID  Priority  Tags              Title        Description        Status
1   [H]       work,presentation Prepare presentation Create slides for meeting [ ]
3   [H]       work,urgent,...   Fix bug #123         Login issue on mobile    [ ]
```

### Sorting Tasks
```
> list --sort priority
ID  Priority  Tags              Title        Description        Status
1   [H]       work,presentation Prepare presentation Create slides for meeting [ ]
3   [H]       work,urgent,...   Fix bug #123         Login issue on mobile    [ ]
2   [M]       personal          Buy groceries        Milk, eggs, bread        [ ]

> list --sort title --desc
ID  Priority  Tags              Title        Description        Status
3   [H]       work,urgent,...   Fix bug #123         Login issue on mobile    [ ]
2   [M]       personal          Buy groceries        Milk, eggs, bread        [ ]
1   [H]       work,presentation Prepare presentation Create slides for meeting [ ]
```

## Best Practices

1. Use consistent tag names across tasks for better organization
2. Assign appropriate priorities to help with sorting and focus
3. Combine search and filter for efficient task location
4. Use descending sort for most recent or highest priority tasks first
5. Remember that sorting is view-only and doesn't change stored order

## Troubleshooting

- If a command fails, check that all required parameters are provided
- Ensure priority values are exactly "High", "Medium", or "Low" (case-sensitive)
- For tag filtering, use exact tag matches
- If search/filter results are empty, verify your criteria match existing task data