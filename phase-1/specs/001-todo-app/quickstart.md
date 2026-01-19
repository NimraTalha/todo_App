# Quickstart Guide: Todo In-Memory Python Console App

## Setup

1. Ensure you have Python 3.13+ installed on your system
2. Install UV (Universal Virtual Environment) if you haven't already:
   ```bash
   pip install uv
   ```
3. Create and activate a virtual environment:
   ```bash
   uv venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   ```

## Running the Application

1. Navigate to the project directory:
   ```bash
   cd src
   ```

2. Run the application:
   ```bash
   python main.py
   ```

## Using the Application

Once running, the application will display a prompt where you can enter commands:

- `add "Title" [Description]` - Add a new task with a title and optional description
- `list` - View all tasks with their IDs, titles, descriptions, and completion status
- `complete [ID]` - Toggle the completion status of a task by its ID
- `update [ID] "New Title" [New Description]` - Update the title or description of a task
- `delete [ID]` - Remove a task by its ID
- `help` - Show available commands
- `exit` - Quit the application

## Example Usage

```
> add "Buy groceries" "Milk, eggs, bread"
Task added with ID: 1

> add "Walk the dog"
Task added with ID: 2

> list
ID  Title              Description        Status
--  -----              -----------        ------
1   Buy groceries      Milk, eggs, bread  [ ]
2   Walk the dog                          [ ]

> complete 1
Task 1 marked as complete

> list
ID  Title              Description        Status
--  -----              -----------        ------
1   Buy groceries      Milk, eggs, bread  [x]
2   Walk the dog                          [ ]

> exit
Goodbye!
```

## Development

To run the application directly from the src directory:

```bash
cd src
python main.py
```

To run the tests (after implementing them):
```bash
python -m unittest discover tests
```