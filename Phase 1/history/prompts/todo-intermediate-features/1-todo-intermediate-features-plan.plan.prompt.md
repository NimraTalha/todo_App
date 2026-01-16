---
id: 1
title: todo-intermediate-features-plan
stage: plan
date: 2025-12-26
surface: agent
model: gpt-4o
feature: todo-intermediate-features
branch: 002-todo-intermediate-features
user: dell
command: /sp.plan
labels: [planning, todo-app, intermediate-features, spec-kit-plus]
links:
  spec: specs/002-todo-intermediate-features/spec.md
  ticket: null
  adr: null
  pr: null
files:
 - specs/002-todo-intermediate-features/plan.md
 - specs/002-todo-intermediate-features/research.md
 - specs/002-todo-intermediate-features/data-model.md
 - specs/002-todo-intermediate-features/quickstart.md
 - specs/002-todo-intermediate-features/contracts/cli-contract.md
 - QWEN.md
tests:
 - null
---

## Prompt

Intermediate Level Implementation for The Evolution of Todo - Phase I: Todo In-Memory Python Console App
Create: A precise, actionable, step-by-step implementation roadmap that transforms the approved v2_intermediate.spec.md into fully functional Intermediate Level features (Priorities & Tags/Categories, Search & Filter, Sort Tasks) using Qwen AI and spec-driven workflow. The plan must guide progressive enhancement of the existing Basic Level console app to deliver a significantly more polished and practical productivity tool.
Decisions needing documentation:

Data model extension strategy: Add new optional fields directly to Task dataclass vs. separate extension class (choose direct addition to dataclass with sensible defaults: priority="Medium", tags=[], due_date=None as string for future-proofing).
Priority representation: String enum ("High"/"Medium"/"Low") vs. integer (choose strings for readability and easy console display).
Tags storage: List of strings vs. comma-separated string (choose list[str] for clean filtering and multiple tag support).
Command structure: New dedicated commands vs. sub-commands under existing (choose sub-commands like "update <id> priority" and "update <id> tags" for consistency; add "list --filter" and "list --sort" flags).
Sorting persistence: Mutate task list order vs. view-only sorting (choose view-only: keep original creation order in storage, apply sort only on display for non-destructive behavior).
Filter combination: Sequential filtering vs. single complex query (choose sequential application of multiple filters for clarity and extensibility).

Testing strategy:

Manual console regression: Verify all Basic Level commands still work unchanged after additions.
Feature validation: Test end-to-end flows (e.g., add task with priority/tags → update priority → filter by High + work tag → sort by priority → view shows correct order and indicators).
Edge case testing: Empty tags list, invalid priority input (prompt retry), no tasks matching filter (show friendly "No tasks found" message), sorting with mixed data.
Display quality check: Confirm clear visual indicators (e.g., [H]/[M]/[L] for priority, colored tags if possible via ANSI, proper alignment in list view).
Backward compatibility: Run app with old task data structure (simulate if needed) to ensure no crashes.

Technical details:

Use fully spec-driven, incremental approach: Every step must explicitly reference sections from v2_intermediate.spec.md.
Implement in strict sequential phases to minimize risk and allow early validation.
Maintain Python stdlib only: No external dependencies; use dataclasses, typing, built-in sorted/filter functions.
Prioritize clean code: Type hints everywhere, modular functions, clear separation of concerns (data model, storage, CLI handlers, display logic).
All changes atomic: One feature or sub-feature per step, with manual test point after each.
Preserve existing behavior: Basic commands (add, delete, update title/desc, complete, list) must remain identical in usage.
Console UX polish: Clear prompts, confirmation for priority/tag changes, helpful examples on invalid input.

Phases:

Data Model Extension → Update Task dataclass with priority: str = "Medium", tags: list[str] = field(default_factory=list), due_date: str | None = None; ensure backward compatibility with existing tasks.
Add Task Enhancements → Extend "add" command to optionally prompt for priority, tags, and due_date after title/description.
Update Command Expansion → Add sub-commands/options to update priority and tags independently (e.g., "update <id> priority" and "update <id> tags").
Display Improvements → Enhance View Task List to show priority indicators [H]/[M]/[L], tags as compact badges, and due_date if present; improve formatting/alignment.
Search & Filter Implementation → Add "list --search <keyword>", "list --filter status=pending", "list --filter priority=High", "list --filter tag=work"; support combined filters.
Sort Tasks Implementation → Add "list --sort priority", "list --sort title", "list --sort created" with optional --desc; implement sorting logic without mutating stored list.
CLI Integration & Help → Update main menu/help to reflect new options; add detailed usage examples for filters and sorting.
Final Polish & Validation → Comprehensive manual testing of all scenarios, refine prompts/messages for clarity, ensure no regression in Basic features.

Deliverables:

Fully enhanced console application with complete Intermediate Level functionality.
Updated src/ files (todo.py for model/logic, main.py for CLI) reflecting clean, modular changes.
Updated README.md with new command examples, screenshots/sample outputs for priority/tags/filter/sort, and clear "Intermediate Level Complete" badge.
specs_history/v2_intermediate.spec.md remains as reference; add implementation notes if needed.

Timeline: Complete entire Intermediate Level within 4-6 hours using Qwen-assisted generation – prioritize phases 1-4 for quick usability wins, then 5-8 for full polish.
Guiding mantra: Elevate the simple todo app into a genuinely practical daily tool – organized, searchable, and intuitively sortable – while keeping it lightweight, console-only, and ready for future evolution.

## Response snapshot

Successfully completed the implementation planning for the intermediate level features of the Todo app. The planning included:

1. Created a comprehensive implementation plan (plan.md) with:
   - Technical context including language, dependencies, and constraints
   - Constitution check verification ensuring alignment with project principles
   - Project structure definition

2. Conducted research and documented findings in research.md covering:
   - Data model extension strategy (extending Task dataclass)
   - Priority representation (string enum)
   - Tags storage (list of strings)
   - Command structure (sub-commands)
   - Sorting approach (view-only)
   - Filter combination (sequential application)

3. Designed the extended data model in data-model.md:
   - Updated Task entity with new attributes (priority, tags, due_date)
   - Defined validation rules and state transitions
   - Specified command interface extensions

4. Created API contracts for the CLI interface in contracts/cli-contract.md

5. Developed a quickstart guide in quickstart.md with examples of all new features

6. Updated the agent context (QWEN.md) with new technology details

7. Completed post-design verification ensuring all requirements are met

The plan is now ready for the next phase of implementation.

## Outcome

- ✅ Impact: Comprehensive implementation plan for intermediate features created
- 🧪 Tests: No tests required for planning phase
- 📁 Files: Created/updated plan.md, research.md, data-model.md, quickstart.md, contracts/cli-contract.md, QWEN.md
- 🔁 Next prompts: Ready for task breakdown with /sp.tasks
- 🧠 Reflection: The plan provides clear roadmap for implementing intermediate features while maintaining backward compatibility

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Proceed with task breakdown for implementation