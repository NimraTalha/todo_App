# Todo Python Console App - The Evolution of Todo

A progressive command-line application designed to manage tasks in a console environment. This project follows a tiered roadmap: Basic → Intermediate → Advanced levels. This MVP emphasizes simplicity, usability, and serves as a learning exercise for spec-driven development while preparing for future persistent storage and web UI phases.

## Setup

1. Ensure you have Python 3.13+ installed on your system.
2. Install UV (Universal Virtual Environment) if you haven't already:
   ```bash
   pip install uv
   ```
3. Create and activate a virtual environment:
   ```bash
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

## Usage

To run the application:
```bash
cd src
python main.py
```

The application provides the following commands:
- `add <title> [description] [priority]` - Add a new task with a title, optional description and priority (High/Medium/Low)
- `delete <id>` - Delete a task by its ID
- `update <id> [title] [description] [priority]` - Update a task's title, description and/or priority
- `update <id> priority <value>` - Update only the priority of a task (High/Medium/Low)
- `update <id> tags <tag1> [tag2]...` - Update the tags of a task
- `list` - View all tasks with their completion status
- `list --search <keyword>` - Search tasks by keyword in title or description
- `list --filter status=<pending/completed>` - Filter tasks by completion status
- `list --filter priority=<High/Medium/Low>` - Filter tasks by priority
- `list --filter tag=<tagname>` - Filter tasks by tag
- `list --sort <priority/title/created>` - Sort tasks by specified field
- `list --desc` - Use with --sort for descending order
- `complete <id>` - Mark a task as complete/incomplete
- `help` - Show available commands
- `exit` - Quit the application

## Feature Demonstrations

### Adding a Task
```
> add "Buy groceries" "Milk, eggs, bread"
Task added with ID: 1
```

### Viewing Task List
```
> list
ID  Title             Description         Status
1   Buy groceries     Milk, eggs, bread   [ ]
```

### Marking a Task as Complete
```
> complete 1
Task 1 marked as complete
```

### Updating a Task
```
> update 1 "Buy groceries" "Milk, eggs, bread, fruits"
Task 1 updated successfully
```

### Deleting a Task
```
> delete 1
Task 1 deleted successfully
```

## Intermediate Features Demonstrations

### Adding a Task with Priority
```
> add "Prepare presentation" "Create slides for meeting" High
Task added with ID: 2
```

### Updating Task Priority
```
> update 2 priority Low
Task 2 priority updated successfully
```

### Updating Task Tags
```
> update 2 tags work presentation
Task 2 updated successfully
```

### Viewing Task List with Priority and Tags
```
> list
ID  Prio  Tags              Title                Description        Status
--  ----  ----              -----                -----------        ------
2   [L]   work,presentation Prepare presentation Create slides...   [ ]
```

### Searching Tasks
```
> list --search "presentation"
ID  Prio  Tags              Title                Description        Status
--  ----  ----              -----                -----------        ------
2   [L]   work,presentation Prepare presentation Create slides...   [ ]
```

### Filtering Tasks by Priority
```
> list --filter priority=High
ID  Prio  Tags              Title                Description        Status
--  ----  ----              -----                -----------        ------
(No tasks match the specified criteria)
```

### Sorting Tasks by Priority
```
> list --sort priority
ID  Prio  Tags              Title                Description        Status
--  ----  ----              -----                -----------        ------
2   [L]   work,presentation Prepare presentation Create slides...   [ ]
```

## Development

This project follows a spec-driven development process:
1. Start with the constitution (`.specify/memory/constitution.md`)
2. Generate detailed specifications in the `specs_history` folder
3. Implement code in the `src` directory based on those specs
4. Test all functionality thoroughly
5. Iterate as needed based on feedback and testing results

## Project Structure
- `constitution.md` - Project foundational document
- `specs_history/` - Folder containing versioned specification files
- `src/` - Python source code: `main.py`, `todo.py`
- `README.md` - Setup instructions, usage examples, and feature demonstrations

## Feature Levels

### Basic Level (Core Essentials – MVP Complete)
These form the foundation and are fully implemented:
- Add Task: Create new todo items with title and description, auto-assign incremental ID.
- Delete Task: Remove tasks by ID, with graceful handling of invalid IDs.
- Update Task: Modify title and/or description of existing tasks by ID.
- View Task List: Display all tasks with ID, title, truncated description, and completion status ([ ] or [x]).
- Mark as Complete: Toggle task completion status by ID.

### Intermediate Level (Organization & Usability – Next Priority)
Add these to make the app feel polished and practical:
- Due Dates: Assign optional due dates to tasks (stored as strings or date objects).
- Priorities & Tags/Categories: Assign priority levels (High/Medium/Low) and optional tags/categories (e.g., work, personal, health).
- Search & Filter: Search tasks by keyword in title/description; filter by status (pending/completed), priority, or category.
- Sort Tasks: Sort task list by due date, priority, creation date, or title (ascending/descending).

### Advanced Level (Intelligent Features – Stretch Goals)
Push the console app toward smart productivity:
- Recurring Tasks: Support repeating tasks (daily, weekly, monthly) with auto-generation of new instances after completion.
- Due Date Reminders & Overdue Indicators: Display overdue tasks prominently (e.g., with [!] marker); sort overdue tasks to top.
- Statistics & Insights: Add a "stats" command showing completion rate, tasks due today, streak counter, etc.

## Contributing

All changes must be reflected in updated specifications before implementation. No code changes are permitted without corresponding spec updates. Each feature implementation must be traceable back to specific requirements in the specifications.