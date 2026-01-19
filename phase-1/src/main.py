#!/usr/bin/env python3
"""
Main entry point for the Todo Python Console App.

This application provides a command-line interface for managing tasks.
It follows the specifications outlined in the project constitution and specs.
"""

from todo import TodoManager
from commands.add_command import add_task_with_options
from commands.update_command import update_task_with_options
from commands.list_command import list_tasks_with_options
from commands.complete_command import complete_task_with_recurrence


def main():
    """Main function to run the Todo application."""
    print("\n===========================================")
    print("         Todo Python Console App")
    print("===========================================\n")
    print("Type 'help' for available commands or 'exit' to quit.")

    app = TodoManager()
    
    while True:
        try:
            command = input("\n> ").strip().split()
            
            if not command:
                continue
                
            cmd = command[0].lower()
            
            if cmd == "exit":
                print("Goodbye!")
                break
            elif cmd == "help":
                choice = print_help()
                if not choice:
                    continue
                if choice == "1":
                    interactive_add(app)
                elif choice == "2":
                    # Show list via the advanced list command with no extra args
                    list_tasks_with_options(app, [])
                elif choice == "3":
                    try:
                        task_id = int(input("Enter ID to delete: ").strip())
                        app.delete_task(task_id)
                    except ValueError:
                        print("Invalid ID.")
                elif choice == "6":
                    print("Goodbye!")
                    break
                else:
                    print("Use the text commands (add, list, update, complete) for advanced options.")
            elif cmd == "add":
                # Use the new add command module
                add_task_with_options(app, command[1:])
            elif cmd == "list":
                # Use the improved list command module (supports args)
                list_tasks_with_options(app, command[1:])
            elif cmd == "delete":
                if len(command) != 2:
                    print("Usage: delete <id>")
                else:
                    try:
                        task_id = int(command[1])
                        app.delete_task(task_id)
                    except ValueError:
                        print("Invalid task ID. Please provide a number.")
            elif cmd == "update":
                # Use the new update command module
                update_task_with_options(app, command[1:])
            elif cmd == "complete":
                # Use the new complete command module
                complete_task_with_recurrence(app, command[1:])
            
            else:
                print(f"Unknown command: {cmd}. Type 'help' for available commands.")
                
        except KeyboardInterrupt:
            print("\nGoodbye!")
            break
        except EOFError:
            print("\nGoodbye!")
            break


def print_help():
    """Print available commands and their usage."""
    # Interactive, single-line menu display with numbered choices
    print("\nHelp - choose an option by number (or press Enter to return):")
    print("1) Add   2) List   3) Delete   4) Update   5) Complete   6) Exit")

    choice = input("Select option: ").strip()
    if not choice:
        return

    return choice


def interactive_add(app: TodoManager) -> None:
    """Prompt the user for title and description, then add the task."""
    try:
        while True:
            title = input("Enter title: ").strip()
            if title:
                break
            print("Title cannot be empty. Please enter a title.")

        description = input("Enter description (optional): ").strip()

        app.add_task(title=title, description=description)
    except (KeyboardInterrupt, EOFError):
        print("\nAdd cancelled.")
        return


if __name__ == "__main__":
    main()