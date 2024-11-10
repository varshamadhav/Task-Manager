import { Task } from '../types/task';
import { useTaskStore } from '../store/useTaskStore';
import toast from 'react-hot-toast';

export const checkTaskTimeouts = () => {
  const { tasks, updateTask } = useTaskStore.getState();
  const now = new Date();

  tasks.forEach((task) => {
    if (
      task.status !== 'done' &&
      task.status !== 'timeout' &&
      task.deadline &&
      new Date(task.deadline) < now
    ) {
      updateTask(task.id, { status: 'timeout' });
      toast.error(`Task "${task.title}" has timed out!`);
    }
  });
};