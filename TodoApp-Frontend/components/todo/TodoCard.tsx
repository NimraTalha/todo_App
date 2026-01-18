'use client';

import * as React from 'react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Todo } from '@/lib/types';
import { CheckCircle2, Trash2, Edit3, Calendar, Clock } from 'lucide-react';

export interface TodoCardProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (todo: Todo) => void;
  index?: number;
}

const TodoCard = ({ todo, onToggle, onDelete, onEdit, index = 0 }: TodoCardProps) => {
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 300);
  };

  const handleEdit = () => {
    onEdit(todo);
  };

  return (
    <div
      className={cn(
        'group relative bg-white rounded-2xl p-5 border transition-all duration-500 hover:-translate-y-1 shadow-md hover:shadow-lg overflow-hidden',
        todo.completed
          ? 'border-green-200 bg-green-50'
          : 'border-purple-100 bg-gradient-to-br from-purple-50 to-indigo-50',
        isDeleting && 'opacity-0 scale-95'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Status Indicator & Title */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-start gap-3 flex-1">
            <button
              onClick={handleToggle}
              className={cn(
                'mt-0.5 w-5 h-5 rounded flex items-center justify-center transition-all duration-300 flex-shrink-0',
                todo.completed
                  ? 'bg-green-500 text-white shadow-md'
                  : 'border border-purple-300 hover:border-purple-500 group-hover:scale-110'
              )}
            >
              {todo.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
            </button>
            <div className="min-w-0">
              <h3 className={cn(
                'text-base font-semibold transition-all duration-300',
                todo.completed
                  ? 'line-through opacity-70 text-green-700'
                  : 'text-gray-800'
              )}>
                {todo.title}
              </h3>
            </div>
          </div>

          <div className="flex gap-1.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleEdit}
              className="w-7 h-7 p-0 rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              className="w-7 h-7 p-0 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Description */}
        {todo.description && (
          <p className={cn(
            'text-sm mb-4 mt-1.5 line-clamp-2 opacity-80',
            todo.completed
              ? 'line-through opacity-50 text-green-600'
              : 'text-gray-600'
          )}>
            {todo.description}
          </p>
        )}

        {/* Footer info */}
        <div className="mt-auto pt-3 border-t border-purple-100 flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {new Date(todo.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {new Date(todo.createdAt).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
          </div>
        </div>
      </div>
    </div>
  );
};

export { TodoCard };
