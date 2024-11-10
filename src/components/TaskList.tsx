import React from 'react';
import { Task } from '../types/task';
import { Clock, Trash2, AlertTriangle } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  const deleteTask = useTaskStore((state) => state.deleteTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const handleStatusChange = (task: Task, newStatus: Task['status']) => {
    updateTask(task.id, { status: newStatus });
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'done':
        return 'bg-green-100 text-green-800';
      case 'timeout':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg ${
            task.status === 'timeout' ? 'border-l-4 border-red-500' : ''
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
              {task.status === 'timeout' && (
                <div className="flex items-center text-red-500 text-sm mt-1">
                  <AlertTriangle size={16} className="mr-1" />
                  Task has timed out
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {task.deadline && (
                <div className={`flex items-center text-sm ${
                  task.status === 'timeout' ? 'text-red-500' : 'text-gray-500'
                }`}>
                  <Clock size={16} className="mr-1" />
                  {new Date(task.deadline).toLocaleDateString()}
                </div>
              )}
              <button
                onClick={() => deleteTask(task.id)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{task.description}</p>
          
          {task.status !== 'timeout' && (
            <div className="flex gap-2">
              {(['todo', 'in-progress', 'done'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(task, status)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    task.status === status
                      ? getStatusColor(status)
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status === 'todo'
                    ? 'To Do'
                    : status === 'in-progress'
                    ? 'In Progress'
                    : 'Done'}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
      
      {tasks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No tasks in this category</p>
        </div>
      )}
    </div>
  );
};