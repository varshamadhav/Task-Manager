import React from 'react';
import { TaskStatus } from '../types/task';

interface TaskSliderProps {
  currentStatus: TaskStatus;
  onStatusChange: (status: TaskStatus) => void;
}

const statuses: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'To Do' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
  { value: 'timeout', label: 'Timeout' },
];

export const TaskSlider: React.FC<TaskSliderProps> = ({
  currentStatus,
  onStatusChange,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex justify-between items-center bg-white rounded-lg p-1 shadow-lg">
        {statuses.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => onStatusChange(value)}
            className={`flex-1 py-3 px-4 rounded-md transition-all duration-200 text-sm font-medium ${
              currentStatus === value
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
};