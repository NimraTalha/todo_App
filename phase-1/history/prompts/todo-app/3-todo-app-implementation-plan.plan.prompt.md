---
id: 3
title: "Todo App Implementation Plan"
stage: "plan"
date_iso: "2025-01-15"
surface: "agent"
model: "unknown"
feature: "todo-app"
branch: "001-todo-app"
user: "user"
command: "/sp.plan"
labels:
  - "plan"
  - "todo-app"
  - "implementation"
links:
  spec: "../specs/001-todo-app/spec.md"
  plan: "./plan.md"
  ticket: null
  adr: null
  pr: null
files_yaml:
  - "specs/001-todo-app/plan.md"
  - "specs/001-todo-app/research.md"
  - "specs/001-todo-app/data-model.md"
  - "specs/001-todo-app/quickstart.md"
  - "specs/001-todo-app/contracts/cli-contract.md"
tests_yaml: []
---

# Implementation Planning

## PROMPT_TEXT

# Spec Implementation Plan (sp.plan.md) - v1.0

**Date:** December 10, 2025  
**Project:** The Evolution of Todo - Phase I: Todo In-Memory Python Console App  
**Purpose:** This document serves as the detailed implementation roadmap for transitioning from approved specifications (constitution.md and v1_core_features.spec.md) to fully functional Python code using Spec-Kit Plus principles and Qwen AI-assisted code generation. It ensures systematic, iterative, and spec-aligned development suitable for hackathon timelines.

## 1. Plan Overview
The goal of Phase I is to deliver a minimal yet complete command-line todo application that stores tasks entirely in memory. All interactions occur via a console interface with no external dependencies beyond the Python standard library. This plan bridges the high-level constitution and detailed v1_core_features.spec.md to actual implementation, leveraging Qwen for code generation while maintaining full developer oversight. The focus remains on simplicity, clean code, and demonstrable core functionality for hackathon judging.

## 2. Dependencies and Prerequisites
- **constitution.md**: Provides project goals, core requirements (5 features), non-functional constraints, technology stack, and guiding principles.
- **v1_core_features.spec.md**: Defines precise Task data model, in-memory storage, exact command syntax, feature behaviors, error handling, and acceptance criteria.
- **Environment**: Python 3.13+, managed via UV (no pip installs of third-party packages allowed).
- **Tools**: Qwen AI for code generation from specs, Spec-Kit Plus for tracking spec history and alignment.

No external libraries are permitted; all functionality must use Python stdlib only.

## 3. Implementation Steps
Follow this sequential order to ensure modular development and easy verification:

1. **Project Setup**
   - Initialize GitHub repository with required structure.
   - Create folders: `/src`, `specs_history` (already containing v1_core_features.spec.md).
   - Add placeholder files: `/src/__init__.py`, `/src/todo.py`, `/src/main.py`.
   - Set up UV virtual environment and add basic `pyproject.toml` if needed.

2. **Implement Task Data Model**
   - Use Qwen to generate the dataclass exactly as described in v1_core_features.spec.md (including id: int, title: str, description: str, completed: bool).
   - Place in `/src/todo.py`.

   **Sample Qwen Prompt**:  
   "Using only Python standard library and type hints, generate a @dataclass for a Todo task exactly matching the model in v1_core_features.spec.md section 'Task Model'. Include auto-incrementing ID handling in a separate TodoManager class."

3. **Implement In-Memory Storage**
   - Create a TodoManager class in `/src/todo.py` that holds a list[Task] and manages auto-incrementing IDs.

4. **Implement Core Features One-by-One**
   - For each feature (in suggested order: View → Add → Mark Complete → Update → Delete):
     - Prompt Qwen with the exact feature description from v1_core_features.spec.md.
     - Generate method in TodoManager.
     - Manually review and adjust for correctness.

   **Sample Qwen Prompt for Add Task**:  
   "Based strictly on 'Add Task' section in v1_core_features.spec.md, generate a clean, type-hinted Python method add_task(title: str, description: str) -> Task for TodoManager class. Include input validation and auto-ID assignment. Follow PEP 8."

   Repeat similar targeted prompts for Delete, Update, View (list_tasks()), and Mark Complete.

5. **Build Console UI**
   - Implement command-loop in `/src/main.py`.
   - Use exact command syntax defined in v1_core_features.spec.md (e.g., 'add', 'list', 'delete <id>', etc.).
   - Display tasks with status indicators [ ] and [x].

6. **Add Error Handling and Validation**
   - Implement graceful handling for invalid IDs, empty inputs, etc., as specified.
   - Provide clear user feedback messages.

7. **Manual Testing and Iteration**
   - Run the application and verify against all acceptance criteria and examples in v1_core_features.spec.md.
   - Fix any deviations manually.

## 4. Qwen Integration Guidelines
- Always include direct references to relevant sections of v1_core_features.spec.md in prompts.
- Enforce in every prompt: "Use only Python stdlib, follow PEP 8, include type hints, keep code modular and simple."
- Generate small, focused pieces (one method/feature at a time).
- Review all generated code for hallucinations or deviations; regenerate or edit manually as needed.

## 5. Risks and Mitigations
- **Risk**: Qwen introduces external imports or over-engineering.  
  **Mitigation**: Explicitly forbid non-stdlib imports in every prompt; review code immediately.
- **Risk**: Spec ambiguity leading to incorrect implementation.  
  **Mitigation**: Cross-reference constitution.md and spec file during review.
- **Risk**: Time overrun in hackathon.  
  **Mitigation**: Prioritize feature order (View first to see progress early).

## 6. Timeline and Milestones (Hackathon-Friendly)
- **Day/Hours 1-4**: Setup + Task model + storage + View + Add features.
- **Day/Hours 5-8**: Mark Complete + Update + Delete features.
- **Day/Hours 9-10**: Console UI + error handling.
- **Final Hours**: README demos, manual testing, polishing.

**Milestones**: Working 'list' and 'add' by end of first session; all 5 features demonstrable by final submission.

## 7. Project Structure Updates
- Root: constitution.md, sp.plan.md, README.md
- specs_history/: v1_core_features.spec.md (and future versions if iterated)
- src/: __init__.py, todo.py (model + manager), main.py (CLI loop)

## 8. Guiding Principles
- Simplicity over complexity.
- Maintainability and readability first.
- No persistence or advanced features.
- Prepare code structure for future phases without implementing them.

## 9. Deliverables and Success Criteria
- Fully working console application runnable via `python -m src.main` (or similar).
- README.md with:
  - UV setup instructions.
  - Run instructions.
  - Sample input/output demonstrations for all 5 features.
- Clean, type-hinted, PEP 8-compliant code.
- All behaviors match v1_core_features.spec.md acceptance criteria exactly.
- Demonstrable spec-driven process via constitution → specs → sp.plan → code.

This plan is now ready to execute. Proceed immediately with Step 1 (project setup) followed by Qwen-assisted code generation.

## RESPONSE_TEXT

Created comprehensive implementation plan with all required artifacts:
- Updated plan.md with technical context, constitution check, and project structure
- Created research.md resolving testing framework decision
- Created data-model.md with Task and TodoManager entities
- Created quickstart.md with setup and usage instructions
- Created CLI contract in contracts/cli-contract.md
- Updated agent context for Qwen with project-specific information
All artifacts align with the constitution requirements and feature specification.

## OUTCOME

The implementation plan is complete with all Phase 0 and Phase 1 artifacts created. The project is ready to move to the task breakdown phase (/sp.tasks) where the implementation will be broken down into specific, testable tasks.