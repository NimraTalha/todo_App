# Tasks: Todo App - Intermediate Level Features

**Input**: Design documents from `/specs/002-todo-intermediate-features/`
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

- [ ] T001 Create project structure per implementation plan in src/ directory
- [ ] T002 Verify Python 3.13+ project setup with standard library only dependencies
- [ ] T003 [P] Configure linting and formatting tools for Python codebase

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Foundational tasks for todo app:

- [x] T004 [P] Extend Task dataclass in src/todo.py with priority, tags, and due_date attributes
- [x] T005 [P] Update Task validation logic to support new attributes per data-model.md
- [x] T006 [P] Update existing CLI handlers in src/main.py to maintain backward compatibility
- [x] T007 Create base filtering and sorting utilities in src/todo.py
- [x] T008 Configure error handling for new feature validation per spec requirements
- [x] T009 Update Task model constructors and methods to handle new attributes

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Assign Priority and Tags to Tasks (Priority: P1) 🎯 MVP

**Goal**: Enable users to assign priority levels (High, Medium, Low) and tags to tasks when creating or updating them

**Independent Test**: Can be fully tested by adding tasks with priority and tags, updating existing tasks with priority and tags, and verifying they are correctly stored and displayed in the task list.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US1] Contract test for add command with priority and tags in src/todo_test.py
- [ ] T011 [P] [US1] Contract test for update command with priority and tags in src/todo_test.py

### Implementation for User Story 1

- [x] T012 [P] [US1] Update Task model validation in src/todo.py to enforce priority values (High/Medium/Low)
- [x] T013 [P] [US1] Implement tags validation in src/todo.py to ensure list of strings
- [x] T014 [US1] Enhance add command in src/main.py to accept optional priority and tags parameters
- [x] T015 [US1] Enhance update command in src/main.py to accept priority and tags updates
- [x] T016 [US1] Add sub-commands for priority and tags updates (update <id> priority <value>)
- [x] T017 [US1] Update display logic to show priority and tags in task list view
- [x] T018 [US1] Add validation for priority input to ensure only "High", "Medium", "Low" values
- [x] T019 [US1] Add validation for tag input to ensure proper format

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Search and Filter Tasks (Priority: P2)

**Goal**: Enable users to search through tasks by keyword and filter them by status, priority, or tag

**Independent Test**: Can be fully tested by searching for keywords in titles/descriptions and applying various filters to see only matching tasks.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T020 [P] [US2] Contract test for search functionality in src/todo_test.py
- [ ] T021 [P] [US2] Contract test for filtering functionality in src/todo_test.py

### Implementation for User Story 2

- [x] T022 [P] [US2] Implement search function in src/todo.py for case-insensitive keyword search
- [x] T023 [P] [US2] Implement status filtering function in src/todo.py
- [x] T024 [P] [US2] Implement priority filtering function in src/todo.py
- [x] T025 [P] [US2] Implement tag filtering function in src/todo.py
- [x] T026 [US2] Implement combined filtering logic with AND logic per research.md
- [x] T027 [US2] Update list command in src/main.py to support --search and --filter flags
- [x] T028 [US2] Add error handling for empty search/filter results
- [x] T029 [US2] Integrate search and filter with display logic for proper output

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Sort Tasks (Priority: P3)

**Goal**: Enable users to sort tasks by different criteria (priority, creation date, title) with ascending/descending options

**Independent Test**: Can be fully tested by applying different sort orders and verifying tasks appear in the correct sequence without affecting the stored order.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T030 [P] [US3] Contract test for priority sorting in src/todo_test.py
- [ ] T031 [P] [US3] Contract test for title sorting in src/todo_test.py
- [ ] T032 [P] [US3] Contract test for creation date sorting in src/todo_test.py

### Implementation for User Story 3

- [x] T033 [P] [US3] Implement priority sorting function in src/todo.py (High → Medium → Low)
- [x] T034 [P] [US3] Implement title sorting function in src/todo.py (alphabetical)
- [x] T035 [P] [US3] Implement creation date sorting function in src/todo.py (chronological)
- [x] T036 [US3] Implement ascending/descending sort options in src/todo.py
- [x] T037 [US3] Update list command in src/main.py to support --sort and --desc flags
- [x] T038 [US3] Ensure sorting is view-only per research.md decision
- [x] T039 [US3] Add proper error handling for sorting empty task lists
- [x] T040 [US3] Integrate sorting with display logic for proper output

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: CLI Integration & Help

**Goal**: Update main menu/help to reflect new options; add detailed usage examples for filters and sorting

**Independent Test**: Help system correctly displays all new features and command options.

- [x] T041 [P] Update help command in src/main.py to include new features
- [x] T042 [P] Add detailed usage examples for search, filter, and sort commands
- [x] T043 Update main menu display to indicate new capabilities
- [x] T044 Add comprehensive error messages for invalid command parameters
- [x] T045 Update README.md with new command examples and feature descriptions

**Checkpoint**: All features are accessible and documented

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T046 [P] Documentation updates in README.md for all new features
- [x] T047 Code cleanup and refactoring to ensure clean separation of concerns
- [x] T048 Performance validation to ensure <1 second response per spec
- [x] T049 [P] Additional unit tests for edge cases in src/todo_test.py
- [x] T050 Error handling validation for all new features
- [x] T051 Run quickstart.md validation to ensure all examples work as documented

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **CLI Integration**: Depends on all user stories being complete
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

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
# Launch all validation tasks for User Story 1 together:
Task: "Update Task model validation in src/todo.py to enforce priority values (High/Medium/Low)"
Task: "Implement tags validation in src/todo.py to ensure list of strings"

# Launch all command enhancement tasks together:
Task: "Enhance add command in src/main.py to accept optional priority and tags parameters"
Task: "Enhance update command in src/main.py to accept priority and tags updates"
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
5. Add CLI Integration → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
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