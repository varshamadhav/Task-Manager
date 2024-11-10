import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { TaskSlider } from './components/TaskSlider';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import { useTaskStore } from './store/useTaskStore';
import { TaskStatus } from './types/task';
import { Toaster } from 'react-hot-toast';
import { checkTaskTimeouts } from './utils/timeoutChecker';

function App() {
  const [currentStatus, setCurrentStatus] = useState<TaskStatus>('todo');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const tasks = useTaskStore((state) => 
    state.tasks.filter((task) => task.status === currentStatus)
  );

  // Check for timeouts every minute
  useEffect(() => {
    checkTaskTimeouts();
    const interval = setInterval(checkTaskTimeouts, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 flex items-center gap-2"
            >
              <Plus size={20} />
              Add Task
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskSlider
          currentStatus={currentStatus}
          onStatusChange={setCurrentStatus}
        />
        <TaskList tasks={tasks} />
      </main>

      {isFormOpen && <TaskForm onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}

export default App;