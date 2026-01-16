# Research Findings: Advanced Todo Features

## Key Decisions Made

### 1. Due Date Storage & Parsing
- **Decision**: Store as str in "YYYY-MM-DD" format, parse to datetime.date only when needed for calculations
- **Rationale**: Simplicity and easy display; matches spec requirement of storing in "YYYY-MM-DD" format
- **Alternatives considered**: 
  - Using datetime.date object directly (rejected due to complexity in serialization/display)
  - Using integer timestamp (rejected due to readability concerns)

### 2. Recurrence Frequency Model
- **Decision**: String ("daily"/"weekly"/"monthly"/None) 
- **Rationale**: Readability and easy input; matches spec requirement
- **Alternatives considered**:
  - Enum class (rejected for simplicity reasons)
  - Integer codes (rejected for readability concerns)

### 3. Next Instance Generation
- **Decision**: Create entirely new task with incremented due date
- **Rationale**: Preserves history of completed instances; matches spec requirement to "generate a new task instance"
- **Alternatives considered**:
  - Update existing task (rejected as it would lose completion history)

### 4. Overdue Sorting
- **Decision**: Always push overdue tasks to top in default view
- **Rationale**: Provides immediate visibility for overdue items; matches spec requirement for "overdue tasks first"
- **Alternatives considered**:
  - Optional flag to sort (rejected as spec requires default sorting)

### 5. Recurrence Handling on Mark Complete
- **Decision**: Silent creation with confirmation message
- **Rationale**: Smooth flow for users; matches spec requirement for "automatically generate the next instance"
- **Alternatives considered**:
  - Auto-prompt before creation (rejected for disrupting workflow)

### 6. Validation Strictness
- **Decision**: Re-prompt with example for user-friendliness
- **Rationale**: Better UX; matches spec requirement for "friendly input prompts with examples and re-prompt on invalid date"
- **Alternatives considered**:
  - Reject invalid dates outright (rejected for poor UX)

## Technology Considerations

### Python Standard Library Modules for Date Operations
- **datetime**: For date parsing, comparison, and timedelta operations
- **re**: For date format validation
- **typing**: For type hints

### Date Calculation Logic
- **Daily recurrence**: Add 1 day using timedelta
- **Weekly recurrence**: Add 7 days using timedelta  
- **Monthly recurrence**: Add approximately 30 days or use calendar module for exact month boundaries

## Edge Cases Identified
- Invalid date inputs like "2025-02-30"
- Monthly recurrence from dates that don't exist in next month (e.g., Jan 31 to Feb)
- Tasks with recurrence but no due date
- Tasks with due date but no recurrence
- Recurring tasks marked complete on their due date