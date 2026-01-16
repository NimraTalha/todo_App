---
id: 2
title: advanced-todo-features-planning
stage: plan
date: 2025-12-26
surface: agent
model: gpt-4
feature: todo-advanced-features
branch: 003-todo-advanced-features
user: dell
command: /sp.plan
labels: ["todo", "planning", "advanced-features", "recurring-tasks", "due-dates"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - C:\\Users\\dell\\Desktop\\spec-project\\TODO\\specs\\003-todo-advanced-features\\plan.md
  - C:\\Users\\dell\\Desktop\\spec-project\\TODO\\specs\\003-todo-advanced-features\\research.md
  - C:\\Users\\dell\\Desktop\\spec-project\\TODO\\specs\\003-todo-advanced-features\\data-model.md
  - C:\\Users\\dell\\Desktop\\spec-project\\TODO\\specs\\003-todo-advanced-features\\contracts\\contracts.md
  - C:\\Users\\dell\\Desktop\\spec-project\\TODO\\specs\\003-todo-advanced-features\\quickstart.md
tests:
  - C:\\Users\\dell\\Desktop\\spec-project\\TODO\\specs\\003-todo-advanced-features\\plan.md
---

## Prompt

Execute the implementation planning workflow using the plan template to generate design artifacts.

## User Input

```
$ARGUMENTS
```

You **MUST** consider the user input before proceeding (if not empty).

## Outline

1. **Setup**: Run `.specify/scripts/powershell/setup-plan.ps1 -Json` from repo root and parse JSON for FEATURE_SPEC, IMPL_PLAN, SPECS_DIR, BRANCH. For single quotes in args like "I'm Groot", use escape syntax: e.g 'I'\''m Groot' (or double-quote if possible: "I'm Groot").

2. **Load context**: Read FEATURE_SPEC and `.specify/memory/constitution.md`. Load IMPL_PLAN template (already copied).

3. **Execute plan workflow**: Follow the structure in IMPL_PLAN template to:
   - Fill Technical Context (mark unknowns as "NEEDS CLARIFICATION")
   - Fill Constitution Check section from constitution
   - Evaluate gates (ERROR if violations unjustified)
   - Phase 0: Generate research.md (resolve all NEEDS CLARIFICATION)
   - Phase 1: Generate data-model.md, contracts/, quickstart.md
   - Phase 1: Update agent context by running the agent script
   - Re-evaluate Constitution Check post-design

4. **Stop and report**: Command ends after Phase 2 planning. Report branch, IMPL_PLAN path, and generated artifacts.

## Phases

### Phase 0: Outline & Research

1. **Extract unknowns from Technical Context** above:
   - For each NEEDS CLARIFICATION → research task
   - For each dependency → best practices task
   - For each integration → patterns task

2. **Generate and dispatch research agents**:

   ```text
   For each unknown in Technical Context:
     Task: "Research {unknown} for {feature context}"
   For each technology choice:
     Task: "Find best practices for {tech} in {domain}"
   ```

3. **Consolidate findings** in `research.md` using format:
   - Decision: [what was chosen]
   - Rationale: [why chosen]
   - Alternatives considered: [what else evaluated]

**Output**: research.md with all NEEDS CLARIFICATION resolved

### Phase 1: Design & Contracts

**Prerequisites:** `research.md` complete

1. **Extract entities from feature spec** → `data-model.md`:
   - Entity name, fields, relationships
   - Validation rules from requirements
   - State transitions if applicable

2. **Generate API contracts** from functional requirements:
   - For each user action → endpoint
   - Use standard REST/GraphQL patterns
   - Output OpenAPI/GraphQL schema to `/contracts/`

3. **Agent context update**:
   - Run `.specify/scripts/powershell/update-agent-context.ps1 -AgentType qwen`
   - These scripts detect which AI agent is in use
   - Update the appropriate agent-specific context file
   - Add only new technology from current plan
   - Preserve manual additions between markers

**Output**: data-model.md, /contracts/*, quickstart.md, agent-specific file

## Key rules

- Use absolute paths
- ERROR on gate failures or unresolved clarifications

---

/sp.plan Advanced Level Implementation for The Evolution of Todo - Phase I: Todo In-Memory Python Console App
Create: A meticulous, incremental implementation roadmap that transforms the approved v3_advanced.spec.md into fully functional Advanced Level features (Recurring Tasks and Due Dates & Overdue Indicators) using Qwen AI and strict spec-driven workflow. The plan must guide intelligent enhancement of the existing console app (Basic + Intermediate complete) to deliver smart, productivity-boosting behavior while remaining purely in-memory and console-only.
Decisions needing documentation:

Due date storage & parsing: Store as str in "YYYY-MM-DD" vs. datetime.date object (choose str for simplicity and easy display, parse to datetime.date only when needed for calculations).
Recurrence frequency model: String ("daily"/"weekly"/"monthly"/None) vs. enum (choose string for readability and easy input).
Next instance generation: Create entirely new task vs. update existing (choose create new task with incremented due date to preserve history of completed instances).
Overdue sorting: Always push overdue to top vs. optional flag (choose always push overdue tasks to top in default view for immediate visibility).
Recurrence handling on mark complete: Auto-prompt for next instance vs. silent creation (choose silent creation with confirmation message for smooth flow).
Validation strictness: Reject invalid dates outright vs. re-prompt (choose re-prompt with example for user-friendliness).

Testing strategy:

Manual console regression: Confirm all Basic and Intermediate commands/features remain fully functional and unchanged.
Recurring task validation: Add recurring weekly task → mark complete multiple times → verify new instances appear with correct future dates.
Due date & overdue testing: Set past/present/future dates → view list → confirm overdue marker, "Due today", and correct sorting (overdue first).
Edge cases: Invalid date input (re-prompt works), recurring task with no due date (handle gracefully), marking non-recurring complete (no extra instance).
Display clarity check: Ensure overdue/recurring indicators are prominent but not overwhelming (e.g., "[OVERDUE]" prefix, "[RECUR]" suffix).
Backward compatibility: Load tasks without recurrence/due_date fields → app handles defaults without errors.

Technical details:

Use fully spec-driven, safe incremental approach: Every step explicitly references v3_advanced.spec.md sections.
Leverage Python stdlib only: Use datetime module (from stdlib) for date parsing, addition (timedelta), and comparisons.
Implement in strict sequential phases with early validation checkpoints.
Prioritize clean, maintainable code: Separate concerns (date utils, recurrence logic, display formatters), full type hints, defensive programming.
All changes atomic and reversible: One sub-feature per phase, manual test after each.
Console UX excellence: Clear input prompts with examples, informative success messages (e.g., "Next weekly instance created for 2026-01-02"), helpful errors.

Phases:

Data Model Extension → Add recurrence: str | None = None and refine due_date: str | None = None to Task dataclass; add helper methods for date parsing and next-instance calculation.
Date Utilities → Implement safe date parsing (validate "YYYY-MM-DD"), comparison with today, and timedelta addition for recurrence (daily +1, weekly +7, monthly approximate +30 or calendar-aware).
Due Date Integration → Extend Add/Update commands to accept/set due_date with validation and re-prompt; enhance list display with "Due today", days overdue, or future date.
Overdue Logic & Default Sorting → Implement overdue detection; modify default View to sort overdue tasks first, then by due date.
Recurring Tasks Setup → Add recurrence frequency option in Add/Update; store frequency string.
Recurring Completion Handling → Override Mark Complete logic: if task has recurrence, create new instance with advanced due date after marking current complete.
Display Enhancements → Add visual indicators for recurring tasks and refined due date/overdue formatting in list view.
Final Polish & Comprehensive Validation → Full manual testing of combined scenarios (recurring + overdue, filters with recurrence), refine messages/prompts, ensure zero regressions.

Deliverables:

Fully intelligent console application with complete Advanced Level functionality.
Updated src/ files reflecting modular, clean additions (separate utils if needed).
Updated README.md with new command examples, sample outputs for recurring tasks and overdue indicators, and "Advanced Level Complete" highlight.
specs_history/v3_advanced.spec.md as permanent reference.

Timeline: Complete entire Advanced Level within 5-8 hours using Qwen-assisted generation – prioritize phases 1-4 for core date intelligence, then 5-8 for recurring magic and polish.
Guiding mantra: Transform the todo app into a truly smart console companion – one that handles repetition automatically and screams when things are overdue – making users feel "This little app actually thinks for me!"