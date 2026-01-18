// Mock API implementation for local development
// This simulates API responses when the backend is not available

// Define types
export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface CreateTodoRequest {
  title: string;
  description?: string;
  completed: boolean;
}

export interface UpdateTodoRequest {
  title: string;
  description?: string;
  completed: boolean;
}

// Initialize mock data in localStorage if not present
const initializeMockData = () => {
  if (typeof window !== 'undefined' && !localStorage.getItem('mock_todos')) {
    const initialTodos: Todo[] = [
      {
        id: 1,
        title: 'Setup development environment',
        description: 'Install necessary tools and dependencies',
        completed: true,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        userId: 1,
      },
      {
        id: 2,
        title: 'Design dashboard UI',
        description: 'Create wireframes and mockups for the dashboard',
        completed: true,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        userId: 1,
      },
      {
        id: 3,
        title: 'Implement authentication',
        description: 'Set up login and registration functionality',
        completed: false,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        userId: 1,
      },
      {
        id: 4,
        title: 'Add task filtering',
        description: 'Allow users to filter tasks by status',
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 1,
      },
    ];
    localStorage.setItem('mock_todos', JSON.stringify(initialTodos));
  }
};

// Helper function to get todos from localStorage
const getTodosFromStorage = (): Todo[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem('mock_todos');
  return stored ? JSON.parse(stored) : [];
};

// Helper function to save todos to localStorage
const saveTodosToStorage = (todos: Todo[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('mock_todos', JSON.stringify(todos));
  }
};

// Mock API functions
export const mockGetTodos = (): Promise<Todo[]> => {
  initializeMockData();
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getTodosFromStorage());
    }, 300); // Simulate network delay
  });
};

export const mockCreateTodo = (todoData: CreateTodoRequest): Promise<Todo> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todos = getTodosFromStorage();
      const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
      
      const newTodo: Todo = {
        id: newId,
        title: todoData.title,
        description: todoData.description,
        completed: todoData.completed,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 1, // Mock user ID
      };
      
      todos.push(newTodo);
      saveTodosToStorage(todos);
      
      resolve(newTodo);
    }, 300); // Simulate network delay
  });
};

export const mockUpdateTodo = (id: number, todoData: UpdateTodoRequest): Promise<Todo> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const todos = getTodosFromStorage();
      const index = todos.findIndex(t => t.id === id);
      
      if (index === -1) {
        reject(new Error('Todo not found'));
        return;
      }
      
      todos[index] = {
        ...todos[index],
        title: todoData.title,
        description: todoData.description,
        completed: todoData.completed,
        updatedAt: new Date().toISOString(),
      };
      
      saveTodosToStorage(todos);
      resolve(todos[index]);
    }, 300); // Simulate network delay
  });
};

export const mockDeleteTodo = (id: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const todos = getTodosFromStorage();
      const filteredTodos = todos.filter(t => t.id !== id);
      saveTodosToStorage(filteredTodos);
      resolve();
    }, 300); // Simulate network delay
  });
};

export const mockToggleTodoComplete = (id: number, completed: boolean): Promise<Todo> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const todos = getTodosFromStorage();
      const index = todos.findIndex(t => t.id === id);
      
      if (index === -1) {
        reject(new Error('Todo not found'));
        return;
      }
      
      todos[index] = {
        ...todos[index],
        completed,
        updatedAt: new Date().toISOString(),
      };
      
      saveTodosToStorage(todos);
      resolve(todos[index]);
    }, 300); // Simulate network delay
  });
};