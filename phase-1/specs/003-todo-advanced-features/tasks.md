# Tasks: Advanced Todo Features - Recurring Tasks & Due Dates

**Input**: Design documents from `/specs/003-todo-advanced-features/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

**Feature Level**: Follow the Basic → Intermediate → Advanced tiered structure defined in the constitution

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure per implementation plan
- [x] T002 Initialize Python 3.13 project with standard library dependencies only
- [x] T003 [P] Create src/utils directory for date and display utilities

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [x] T004 [P] Extend Task model with due_date and recurrence_frequency properties in src/todo.py
- [x] T005 [P] Create date utilities module in src/utils/date_utils.py
- [x] T006 [P] Create display utilities module in src/utils/display_utils.py
- [x] T007 Create command modules structure in src/commands/
- [x] T008 Update existing command modules to handle new Task properties

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Set Due Dates for Tasks (Priority: P1) 🎯 MVP

**Goal**: Enable users to assign due dates to tasks and display them with proper formatting

**Independent Test**: The feature can be fully tested by adding tasks with due dates, viewing them in the list with proper formatting, and confirming that overdue tasks are displayed prominently with indicators.

### Implementation for User Story 1

- [x] T009 [P] [US1] Implement date validation functions in src/utils/date_utils.py
- [x] T010 [P] [US1] Implement date parsing functions in src/utils/date_utils.py
- [x] T011 [P] [US1] Implement is_overdue function in src/utils/date_utils.py
- [x] T012 [US1] Update add command to accept --due-date parameter in src/commands/add_command.py
- [x] T013 [US1] Update add command to validate due date input in src/commands/add_command.py
- [x] T014 [US1] Update list command to display due date information in src/commands/list_command.py
- [x] T015 [US1] Update display formatting to show due date status in src/utils/display_utils.py
- [x] T016 [US1] Test due date assignment and display functionality

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Create Recurring Tasks (Priority: P1)

**Goal**: Enable users to create recurring tasks that automatically generate new instances when completed

**Independent Test**: The feature can be tested by creating a recurring task, marking it as complete, and verifying that a new instance of the task appears with the next appropriate due date.

### Implementation for User Story 2

- [x] T017 [P] [US2] Implement get_next_occurrence function in src/utils/date_utils.py
- [x] T018 [P] [US2] Create complete command module in src/commands/complete_command.py
- [x] T019 [US2] Update Task model to handle recurrence logic in src/todo.py
- [x] T020 [US2] Update add command to accept --recurrence parameter in src/commands/add_command.py
- [x] T021 [US2] Implement recurring task completion logic in src/commands/complete_command.py
- [x] T022 [US2] Test recurring task creation and completion functionality

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Update Existing Tasks with Recurrence or Due Dates (Priority: P2)

**Goal**: Enable users to modify existing tasks to add recurrence or due dates

**Independent Test**: The feature can be tested by selecting an existing task and updating it with recurrence or due date properties, then verifying the changes in the task list.

### Implementation for User Story 3

- [x] T023 [P] [US3] Update update command to accept --due-date parameter in src/commands/update_command.py
- [x] T024 [P] [US3] Update update command to accept --recurrence parameter in src/commands/update_command.py
- [x] T025 [US3] Implement due date validation in update command in src/commands/update_command.py
- [x] T026 [US3] Test updating existing tasks with due dates and recurrence

**Checkpoint**: At this point, User Stories 1, 2 AND 3 should all work independently

---

## Phase 6: User Story 4 - View Enhanced Task Information (Priority: P2)

**Goal**: Display clear visual indicators for overdue tasks and due date information

**Independent Test**: The feature can be tested by creating tasks with various due date statuses and verifying they display with appropriate formatting and sorting.

### Implementation for User Story 4

- [x] T027 [P] [US4] Implement days_overdue calculation function in src/utils/date_utils.py
- [x] T028 [P] [US4] Update task display formatting for overdue indicators in src/utils/display_utils.py
- [x] T029 [US4] Update list command to sort tasks with overdue first in src/commands/list_command.py
- [x] T030 [US4] Implement recurrence indicators in task display in src/utils/display_utils.py
- [x] T031 [US4] Test enhanced task display with various due date statuses

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T032 [P] Update README.md with new command examples
- [x] T033 [P] Add error handling for edge cases identified in research.md
- [x] T034 [P] Validate backward compatibility with existing tasks
- [x] T035 [P] Run comprehensive testing of all features together
- [x] T036 [P] Code cleanup and refactoring
- [x] T037 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2/US3 but should be independently testable

### Within Each User Story

- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all models for User Story 1 together:
Task: "Implement date validation functions in src/utils/date_utils.py"
Task: "Implement date parsing functions in src/utils/date_utils.py"
Task: "Implement is_overdue function in src/utils/date_utils.py"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence