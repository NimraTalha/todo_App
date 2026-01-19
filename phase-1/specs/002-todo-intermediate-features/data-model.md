# Data Model: Todo App - Intermediate Level Features

## Overview
Extended data model for implementing Intermediate Level features (Priorities & Tags/Categories, Search & Filter, Sort Tasks) for the Todo Python Console App.

## Task Entity

### Attributes
```python
from dataclasses import dataclass, field
from typing import List

@dataclass
class Task:
    id: int
    title: str
    description: str
    completed: bool = False
    priority: str = "Medium"  # "High", "Medium", or "Low"
    tags: List[str] = field(default_factory=list)  # List of string tags
    due_date: str | None = None  # Optional due date as string (for future-proofing)
```

### Validation Rules
- `priority` must be one of: "High", "Medium", "Low" (case-insensitive)
- `tags` must be a list of strings (can be empty)
- `due_date` is optional and stored as string (YYYY-MM-DD format or any string format)

### Relationships
- No relationships with other entities (standalone entity)

### State Transitions
- `completed` field toggles between `True` and `False` via the complete command
- `priority` field can be updated via the update command
- `tags` field can be updated via the update command
- `due_date` field can be updated via the update command

## Command Interface Extensions

### Add Command
- Extended to accept optional priority and tags parameters
- Format: `add <title> [description] [priority] [tag1] [tag2]...`

### Update Command
- Extended to support sub-commands for priority and tags
- Format: `update <id> [title] [description] [priority] [tags]`
- Alternative: `update <id> priority <value>` and `update <id> tags <tag1> <tag2>...`

### List Command
- Extended with filtering and sorting options
- Format: `list [--filter status=<value>] [--filter priority=<value>] [--filter tag=<value>] [--search <keyword>] [--sort <field>] [--desc]`

## Search and Filter Specifications

### Search Functionality
- Case-insensitive keyword search across title and description fields
- Returns tasks containing the keyword in either field

### Filter Functionality
- Status filter: pending/completed
- Priority filter: High/Medium/Low
- Tag filter: exact match of tag value
- Combined filters: AND logic (all filters must match)

### Sort Functionality
- Sort by: priority, title, creation date
- Direction: ascending (default) or descending (--desc flag)
- View-only: does not modify stored order of tasks