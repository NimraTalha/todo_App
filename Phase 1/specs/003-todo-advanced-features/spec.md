# Feature Specification: Advanced Todo Features - Recurring Tasks & Due Dates

**Feature Branch**: `003-todo-advanced-features`
**Created**: December 26, 2025
**Status**: Draft
**Input**: User description: "Advanced Level Features for The Evolution of Todo - Phase I: Todo In-Memory Python Console App Target audience: Hackathon judges evaluating advanced spec-driven development, and developers pushing a console-based todo app toward intelligent productivity features using Spec-Kit Plus and Qwen AI. Focus: Define precise, implementable specifications for the Advanced Level features only, building directly on the completed Basic and Intermediate Levels. These intelligent enhancements are: Recurring Tasks (auto-rescheduling repeating tasks) and Due Dates & Time Reminders (with overdue indicators and prominent display). The app remains a pure in-memory Python console application with no external dependencies, no GUI, and no browser notifications (adapt to console-only environment). Success criteria: Extends the existing Task model to support recurrence rules and due_date with basic parsing/validation. Implements recurring task logic: upon marking a recurring task as complete, automatically generate the next instance (e.g., daily → next day, weekly → +7 days). Handles due dates: store as string in "YYYY-MM-DD" format, display overdue tasks prominently (e.g., with "[OVERDUE]" marker), and sort overdue to top by default. Provides new console commands/sub-commands for setting recurrence and due dates, with clear feedback. Generates a Markdown file (v3_advanced.spec.md) placed in specs_history/ – fully ready for immediate code generation via Qwen. All features are modular, backward-compatible with existing non-recurring tasks, and testable manually via console. Reader (e.g., Qwen code generator) can implement intelligent behavior solely from this spec while maintaining console-only constraints. Constraints: Format: Markdown with structured sections (Metadata, Data Model Extensions, Recurrence Rules, Due Date Handling, New/Updated Commands, Feature Details with User Stories & Acceptance Criteria, Console Interaction Examples, Overdue Logic, Error Handling, Backward Compatibility, Acceptance Tests). Version: v3.0 (Advanced Level), include current date (December 26, 2025). Dependencies strictly limited to Python standard library only (use datetime from stdlib for date calculations; no external packages). Keep specs detailed yet focused (under 2200 words). Reference the existing constitution.md (latest version) and previous specs (Basic + Intermediate) without modifying them. Timeline: Generate immediately to enable rapid Advanced Level completion within hours via AI-assisted coding. Console-only limitations: No browser notifications or GUI pickers – use text input for dates (format "YYYY-MM-DD"), simple prompts for recurrence frequency (daily/weekly/monthly), and console output for reminders/overdue alerts. Recurrence frequencies supported: daily, weekly, monthly only (keep simple and reliable). Due dates optional; no time component (date only for simplicity). Specific Feature Requirements: Recurring Tasks Support recurrence frequency: "daily", "weekly", "monthly", or None. When marking a recurring task complete, automatically create a new task instance with the next due date (e.g., weekly → add 7 days). Preserve title, description, priority, tags across instances. Allow setting recurrence during Add or via Update sub-command. Due Dates & Overdue Indicators Due date format: "YYYY-MM-DD" (validated on input). Display overdue tasks with prominent marker (e.g., "[OVERDUE]" in red if ANSI supported, else bold). Default sort: overdue tasks first, then by due date ascending. Show days overdue or "Due today" indicators in list view. Friendly input prompts with examples and re-prompt on invalid date. Not building: Actual Python code implementation (reserved for Qwen code generation). Browser notifications, desktop alerts, or sound reminders (impossible in pure console). Complex recurrence (e.g., "every 2 weeks", custom RRULE, end dates). Time-based reminders (hours/minutes) or calendar integration. Persistent storage across sessions or file export. Statistics dashboard or streak tracking (keep scope focused on these two features only)."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Set Due Dates for Tasks (Priority: P1)

As a user of the todo console app, I want to be able to assign due dates to my tasks so that I can track what needs to be done by when and get clear visibility on overdue items.

**Why this priority**: This is fundamental to the advanced productivity features, allowing users to manage time-sensitive tasks and prioritize their work effectively.

**Independent Test**: The feature can be fully tested by adding tasks with due dates, viewing them in the list with proper formatting, and confirming that overdue tasks are displayed prominently with indicators.

**Acceptance Scenarios**:

1. **Given** I have a task in the system, **When** I assign a due date to it, **Then** the due date is stored and displayed with the task
2. **Given** I have tasks with various due dates including past dates, **When** I list tasks, **Then** overdue tasks appear at the top with "[OVERDUE]" markers
3. **Given** I have a task with an invalid date format, **When** I try to assign it, **Then** I receive an error message with a prompt for the correct format

---

### User Story 2 - Create Recurring Tasks (Priority: P1)

As a user of the todo console app, I want to create recurring tasks that automatically generate new instances when completed, so that I don't have to manually re-create routine tasks.

**Why this priority**: This provides significant productivity value by automating repetitive task management for daily, weekly, or monthly activities.

**Independent Test**: The feature can be tested by creating a recurring task, marking it as complete, and verifying that a new instance of the task appears with the next appropriate due date.

**Acceptance Scenarios**:

1. **Given** I have created a recurring task with a daily frequency, **When** I mark it as complete, **Then** a new instance appears with tomorrow's date
2. **Given** I have created a recurring task with a weekly frequency, **When** I mark it as complete, **Then** a new instance appears with the same day next week
3. **Given** I have created a recurring task with a monthly frequency, **When** I mark it as complete, **Then** a new instance appears with the same day next month

---

### User Story 3 - Update Existing Tasks with Recurrence or Due Dates (Priority: P2)

As a user of the todo console app, I want to be able to modify existing tasks to add recurrence or due dates, so that I can enhance my current tasks without recreating them.

**Why this priority**: This allows users to enhance their existing task management without having to recreate tasks, improving flexibility and user experience.

**Independent Test**: The feature can be tested by selecting an existing task and updating it with recurrence or due date properties, then verifying the changes in the task list.

**Acceptance Scenarios**:

1. **Given** I have an existing task without a due date, **When** I update it with a due date, **Then** the task now displays with the due date in the list
2. **Given** I have an existing non-recurring task, **When** I update it to be recurring, **Then** the task is marked as recurring and generates a new instance when completed

---

### User Story 4 - View Enhanced Task Information (Priority: P2)

As a user of the todo console app, I want to see clear visual indicators for overdue tasks and due date information, so that I can quickly identify priority items.

**Why this priority**: This enhances the user experience by providing clear visual cues for task urgency and deadlines, improving task management efficiency.

**Independent Test**: The feature can be tested by creating tasks with various due date statuses and verifying they display with appropriate formatting and sorting.

**Acceptance Scenarios**:

1. **Given** I have tasks with various due dates, **When** I list tasks, **Then** they are sorted with overdue tasks first, followed by upcoming tasks in chronological order
2. **Given** I have an overdue task, **When** I view the task list, **Then** it displays with a prominent "[OVERDUE]" indicator
3. **Given** I have a task due today, **When** I view the task list, **Then** it displays with a "Due today" indicator

---

### Edge Cases

- What happens when a recurring task is marked complete on the due date itself?
- How does the system handle invalid date inputs like "2025-02-30"?
- What happens when recurrence is set to monthly and the current date doesn't exist in the next month (e.g., January 31st to February)?
- How does the system handle tasks with both recurrence and due dates?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST extend the existing Task model to include recurrence_frequency property with values: "daily", "weekly", "monthly", or None
- **FR-002**: System MUST extend the existing Task model to include due_date property in "YYYY-MM-DD" format
- **FR-003**: System MUST validate due dates to ensure they follow the "YYYY-MM-DD" format and represent valid calendar dates
- **FR-004**: System MUST automatically generate a new task instance when a recurring task is marked as complete
- **FR-005**: System MUST preserve title, description, priority, and tags when generating new instances of recurring tasks
- **FR-006**: System MUST calculate the next due date for recurring tasks: daily → next day, weekly → same day next week, monthly → same day next month
- **FR-007**: System MUST display overdue tasks with a prominent "[OVERDUE]" marker in the task list
- **FR-008**: System MUST sort tasks with overdue tasks appearing first, followed by tasks ordered by due date ascending
- **FR-009**: System MUST show days overdue or "Due today" indicators for tasks with due dates in the list view
- **FR-010**: System MUST provide new console commands/sub-commands for setting recurrence and due dates during task creation
- **FR-011**: System MUST provide new console commands/sub-commands for updating existing tasks with recurrence and due dates
- **FR-012**: System MUST provide clear feedback when setting recurrence or due dates, including examples and re-prompting on invalid input
- **FR-013**: System MUST handle date calculations using only Python standard library datetime module
- **FR-014**: System MUST be backward compatible with existing non-recurring tasks without due dates
- **FR-015**: System MUST preserve recurrence settings when updating other task properties

### Feature Level Classification

- **Tier**: Advanced
- **Dependencies**: Basic and Intermediate feature levels (existing Task model and console commands)
- **Backward Compatibility**: This feature maintains full compatibility with existing functionality; all new properties are optional and non-recurring tasks without due dates continue to work as before

### Key Entities

- **Task**: Extended model with recurrence_frequency (string: daily/weekly/monthly/None), due_date (string: YYYY-MM-DD format), and all existing properties (title, description, priority, tags, completion status)
- **RecurringTask**: A task with non-None recurrence_frequency that generates new instances when completed
- **DueDate**: A date in "YYYY-MM-DD" format associated with a task to indicate when it should be completed

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create recurring tasks with daily, weekly, or monthly frequencies that automatically generate new instances when completed
- **SC-002**: Users can assign due dates to tasks in "YYYY-MM-DD" format with appropriate validation and error handling
- **SC-003**: Overdue tasks are displayed with "[OVERDUE]" markers and sorted to the top of the task list by default
- **SC-004**: The system handles date calculations correctly for all recurrence frequencies without requiring external libraries
- **SC-005**: All new functionality maintains backward compatibility with existing tasks and features
- **SC-006**: Users can update existing tasks to add recurrence or due date properties without losing other task information
