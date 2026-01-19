"use client";

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { TodoCard } from '@/components/todo/TodoCard';
import type { Todo } from '@/lib/types';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { useToast } from '@/components/ui/Toast';
import { cn } from '@/lib/utils';
import { getTodos, createTodo, updateTodo, deleteTodo, toggleTodoComplete } from '@/lib/api';
import { mockGetTodos, mockCreateTodo, mockUpdateTodo, mockDeleteTodo, mockToggleTodoComplete } from '@/lib/mockApi';
import { Plus, Sparkles, Layout, CheckCircle2, ListTodo, Calendar, Clock, ArrowRight, X, Search, Filter, SortAsc } from 'lucide-react';

export default function DashboardPage() {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [editingTodo, setEditingTodo] = React.useState<Todo | null>(null);
  const [formData, setFormData] = React.useState({ title: '', description: '' });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filter, setFilter] = React.useState<'all' | 'active' | 'completed'>('all');
  const [sortBy, setSortBy] = React.useState<'date' | 'priority'>('date');
  const [userName, setUserName] = React.useState('');
  const router = useRouter();
  const { addToast } = useToast();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('user_name');
      if (name) setUserName(name);
    }

    const fetchTodos = async () => {
      try {
        setLoading(true);
        let data;

        // Try the real API first, fall back to mock API if it fails
        try {
          data = await getTodos();
        } catch (realApiError) {
          console.warn('Real API failed, falling back to mock API:', realApiError);
          data = await mockGetTodos();
        }

        setTodos(data);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
        addToast({
          type: 'error',
          message: 'Failed to load tasks',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [addToast]);

  // Filter and sort todos based on search term, filter, and sort criteria
  const filteredTodos = React.useMemo(() => {
    let result = [...todos];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (todo.description && todo.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (filter === 'active') {
      result = result.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      result = result.filter(todo => todo.completed);
    }

    // Apply sorting
    if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'priority') {
      // Assuming priority is based on completion status for now
      result.sort((a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1);
    }

    return result;
  }, [todos, searchTerm, filter, sortBy]);

  const handleAddTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    try {
      let newTodo;

      // Try the real API first, fall back to mock API if it fails
      try {
        newTodo = await createTodo({
          title: formData.title,
          description: formData.description,
          completed: false,
        });
      } catch (realApiError) {
        console.warn('Real API failed, falling back to mock API:', realApiError);
        newTodo = await mockCreateTodo({
          title: formData.title,
          description: formData.description,
          completed: false,
        });
      }

      setTodos([newTodo, ...todos]);
      setShowAddModal(false);
      setFormData({ title: '', description: '' });
      addToast({
        type: 'success',
        message: 'Task created successfully!',
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to create todo:', error);
      addToast({
        type: 'error',
        message: 'Failed to create task',
      });
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setFormData({ title: todo.title, description: todo.description || '' });
  };

  const handleUpdateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTodo || !formData.title.trim()) return;

    try {
      let updated;

      // Try the real API first, fall back to mock API if it fails
      try {
        updated = await updateTodo(editingTodo.id, {
          title: formData.title,
          description: formData.description,
          completed: editingTodo.completed,
        });
      } catch (realApiError) {
        console.warn('Real API failed, falling back to mock API:', realApiError);
        updated = await mockUpdateTodo(editingTodo.id, {
          title: formData.title,
          description: formData.description,
          completed: editingTodo.completed,
        });
      }

      setTodos(todos.map((todo) => (todo.id === updated.id ? updated : todo)));
      setEditingTodo(null);
      setFormData({ title: '', description: '' });
      addToast({
        type: 'success',
        message: 'Task updated successfully',
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to update todo:', error);
      addToast({
        type: 'error',
        message: 'Failed to update task',
      });
    }
  };

  const handleToggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    try {
      let updated;

      // Try the real API first, fall back to mock API if it fails
      try {
        updated = await toggleTodoComplete(id, !todo.completed);
      } catch (realApiError) {
        console.warn('Real API failed, falling back to mock API:', realApiError);
        updated = await mockToggleTodoComplete(id, !todo.completed);
      }

      setTodos(todos.map((t) => (t.id === id ? updated : t)));

      if (updated.completed) {
        addToast({
          type: 'success',
          message: '🎉 Task completed! Great job!',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Failed to toggle todo:', error);
      addToast({
        type: 'error',
        message: 'Failed to update task',
      });
    }
  };

  const handleDeleteTodo = async (id: number) => {
    try {
      // Try the real API first, fall back to mock API if it fails
      try {
        await deleteTodo(id);
      } catch (realApiError) {
        console.warn('Real API failed, falling back to mock API:', realApiError);
        await mockDeleteTodo(id);
      }

      setTodos(todos.filter((todo) => todo.id !== id));
      addToast({
        type: 'info',
        message: 'Task deleted',
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to delete todo:', error);
      addToast({
        type: 'error',
        message: 'Failed to delete task',
      });
    }
  };

  const completedCount = todos.filter((t) => t.completed).length;
  const totalCount = todos.length;
  const progress = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-[calc(100vh-80px)] bg-background">
      <div className="section-horizontal py-8 max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-2">Welcome back, {userName || 'User'}. Here's what you need to focus on today.</p>
            </div>

            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <Button
                variant="outline"
                size="md"
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-green-500 text-white hover:from-purple-600 hover:to-green-600 border-0"
              >
                <Plus className="w-4 h-4" />
                Add Task
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Tasks</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                  <ListTodo className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{completedCount}</p>
                </div>
                <div className="p-3 rounded-lg bg-green-100 text-green-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{totalCount - completedCount}</p>
                </div>
                <div className="p-3 rounded-lg bg-yellow-100 text-yellow-600">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{progress}%</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm mb-8">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">Overall Progress</h3>
              <span className="text-sm font-medium text-purple-600">{progress}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-green-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Your Tasks</h2>

            <div className="flex gap-3">
              <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'completed')}
                  className="outline-none bg-transparent text-sm"
                >
                  <option value="all">All Tasks</option>
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2">
                <SortAsc className="w-4 h-4 text-gray-500" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'priority')}
                  className="outline-none bg-transparent text-sm"
                >
                  <option value="date">Newest First</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredTodos.length === 0 && (
            <EmptyState
              type="no-todos"
              title="No tasks found"
              description={searchTerm ? "No tasks match your search. Try different keywords." : "Get started by creating your first task."}
              cta={{
                text: 'Create Task',
                action: () => setShowAddModal(true),
              }}
            />
          )}

          {/* Todo List Grid */}
          {!loading && filteredTodos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredTodos.map((todo, index) => (
                <TodoCard
                  key={todo.id}
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                  onEdit={handleEditTodo}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal - Common Style for Add and Edit */}
      {(showAddModal || editingTodo) && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-300">
          <div className="relative bg-white w-full max-w-md rounded-xl p-6 border border-gray-200 shadow-lg animate-in zoom-in-90 duration-300">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {editingTodo ? 'Edit Task' : 'Create New Task'}
                </h3>
                <p className="text-xs text-gray-500">Fill in the details below</p>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingTodo(null);
                  setFormData({ title: '', description: '' });
                }}
                className="w-8 h-8 rounded-full hover:bg-gray-100 transition-all flex items-center justify-center"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={editingTodo ? handleUpdateTodo : handleAddTodo} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">Task Title *</label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="What needs to be done?"
                  autoFocus
                  required
                  className="rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Add details (optional)"
                  rows={3}
                  className="w-full rounded-lg px-3 py-2 text-sm border border-gray-300 focus:border-purple-500 focus:ring-purple-500 resize-none outline-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Button
                  type="button"
                  variant="ghost"
                  fullWidth
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingTodo(null);
                    setFormData({ title: '', description: '' });
                  }}
                  className="rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  className="rounded-lg bg-gradient-to-r from-purple-500 to-green-500 hover:from-purple-600 hover:to-green-600 text-white"
                >
                  {editingTodo ? 'Update Task' : 'Create Task'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
