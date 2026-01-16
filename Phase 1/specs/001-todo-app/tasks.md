---

description: "Task list for Todo In-Memory Python Console App implementation"
---

# Tasks: Todo In-Memory Python Console App

**Input**: Design documents from `/specs/001-todo-app/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests will be included as Python's unittest framework was selected in research.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- Paths shown below assume single project - adjust based on plan.md structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create project structure with src/, tests/ directories
- [x] T002 Create src/__init__.py file
- [x] T003 Create src/todo.py for core functionality
- [x] T004 Create src/main.py for console interface
- [x] T005 Create tests/ directory structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T006 Implement Task data model with id, title, description, completed fields in src/todo.py
- [x] T007 Implement TodoManager class with in-memory storage in src/todo.py
- [x] T008 Implement auto-incrementing ID functionality in TodoManager
- [x] T009 Create base test framework using unittest in tests/
- [x] T010 Set up basic error handling infrastructure in src/todo.py

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Add Tasks (Priority: P1) 🎯 MVP

**Goal**: Enable users to add new tasks with a title and optional description, storing them in memory with a unique identifier

**Independent Test**: Can be fully tested by adding tasks with titles and descriptions and verifying they appear in the task list with unique IDs

### Tests for User Story 1 ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [x] T011 [P] [US1] Unit test for add_task method in tests/test_todo.py
- [x] T012 [P] [US1] Test validation of empty titles in tests/test_todo.py

### Implementation for User Story 1

- [x] T013 [US1] Implement add_task method in TodoManager class in src/todo.py
- [x] T014 [US1] Implement title validation to ensure it's not empty in src/todo.py
- [x] T015 [US1] Add auto-ID assignment for new tasks in src/todo.py
- [x] T016 [US1] Add success/error messaging for add operation in src/todo.py

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - View Task List (Priority: P1)

**Goal**: Display all existing tasks with their ID, title, description, and completion status in a formatted list

**Independent Test**: Can be fully tested by adding tasks and then viewing the list to confirm all tasks are displayed with correct status indicators

### Tests for User Story 2 ⚠️

- [x] T017 [P] [US2] Unit test for list_tasks method in tests/test_todo.py
- [x] T018 [P] [US2] Test formatting of task display in tests/test_todo.py

### Implementation for User Story 2

- [x] T019 [US2] Implement list_tasks method in TodoManager class in src/todo.py
- [x] T020 [US2] Format task display with ID, title, description, and status indicators in src/todo.py
- [x] T021 [US2] Sort tasks by ID for consistent display in src/todo.py
- [x] T022 [US2] Handle empty task list case in src/todo.py

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Mark Tasks as Complete (Priority: P2)

**Goal**: Allow users to toggle the completion status of a task by ID

**Independent Test**: Can be fully tested by adding a task, marking it as complete, and viewing the list to confirm the status changed

### Tests for User Story 3 ⚠️

- [x] T023 [P] [US3] Unit test for toggle_task_status method in tests/test_todo.py
- [x] T024 [P] [US3] Test toggle functionality (complete to incomplete) in tests/test_todo.py

### Implementation for User Story 3

- [x] T025 [US3] Implement toggle_task_status method in TodoManager class in src/todo.py
- [x] T026 [US3] Validate task ID exists before toggling in src/todo.py
- [x] T027 [US3] Update task completion status and return confirmation in src/todo.py

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Update Task Details (Priority: P2)

**Goal**: Allow users to modify the title or description of an existing task using its ID

**Independent Test**: Can be fully tested by adding a task, updating its title/description, and verifying the changes appear when viewing the task list

### Tests for User Story 4 ⚠️

- [x] T028 [P] [US4] Unit test for update_task method in tests/test_todo.py
- [x] T029 [P] [US4] Test partial updates (title only or description only) in tests/test_todo.py

### Implementation for User Story 4

- [x] T030 [US4] Implement update_task method in TodoManager class in src/todo.py
- [x] T031 [US4] Validate task ID exists before updating in src/todo.py
- [x] T032 [US4] Handle partial updates (title or description independently) in src/todo.py
- [x] T033 [US4] Validate updated title is not empty in src/todo.py

**Checkpoint**: All user stories should now be independently functional

---

## Phase 7: User Story 5 - Delete Tasks (Priority: P3)

**Goal**: Allow users to remove tasks that are no longer needed using their ID

**Independent Test**: Can be fully tested by adding tasks, deleting one, and verifying it's no longer in the task list

### Tests for User Story 5 ⚠️

- [x] T034 [P] [US5] Unit test for delete_task method in tests/test_todo.py
- [x] T035 [P] [US5] Test error handling for non-existent task IDs in tests/test_todo.py

### Implementation for User Story 5

- [x] T036 [US5] Implement delete_task method in TodoManager class in src/todo.py
- [x] T037 [US5] Validate task ID exists before deletion in src/todo.py
- [x] T038 [US5] Handle deletion confirmation messaging in src/todo.py

**Checkpoint**: All five core user stories are now complete and functional

---

## Phase 8: Console Interface Implementation

**Goal**: Implement command-line interface to handle user commands and interact with TodoManager functionality

### Tests for Console Interface ⚠️

- [x] T039 [P] Unit test for command parsing in tests/test_main.py
- [x] T040 [P] Integration test for add command in tests/test_main.py

### Implementation for Console Interface

- [x] T041 Implement console command loop in src/main.py
- [x] T042 Parse 'add' command with title and optional description in src/main.py
- [x] T043 Parse 'list' command to display all tasks in src/main.py
- [x] T044 Parse 'complete' command with task ID in src/main.py
- [x] T045 Parse 'update' command with task ID, title, and description in src/main.py
- [x] T046 Parse 'delete' command with task ID in src/main.py
- [x] T047 Implement 'help' and 'exit' commands in src/main.py
- [x] T048 Connect parsed commands to TodoManager methods in src/main.py

**Checkpoint**: Full console interface with all commands is now functional

---

## Phase 9: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T049 [P] Documentation updates in src/todo.py with docstrings
- [x] T050 [P] Input validation improvements across all methods in src/todo.py
- [x] T051 Error handling for edge cases (empty list, invalid IDs, etc.) in src/todo.py
- [x] T052 [P] Additional unit tests for edge cases in tests/
- [x] T053 Run quickstart.md validation to ensure application works as expected
- [x] T054 Code cleanup and refactoring to follow PEP 8 standards
- [x] T055 Type hinting improvements across all modules
- [x] T056 Final integration testing between all components

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Console Interface (Phase 8)**: Depends on all user story implementations
- **Polish (Phase 9)**: Depends on all desired user stories and console interface being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable
- **User Story 5 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together:
Task: "Unit test for add_task method in tests/test_todo.py"
Task: "Test validation of empty titles in tests/test_todo.py"

# Launch implementation tasks for User Story 1:
Task: "Implement add_task method in TodoManager class in src/todo.py"
Task: "Implement title validation to ensure it's not empty in src/todo.py"
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
6. Add User Story 5 → Test independently → Deploy/Demo
7. Add Console Interface → Test full functionality → Deploy/Demo
8. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
   - Developer E: User Story 5
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