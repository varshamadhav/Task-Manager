export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'timeout';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  deadline?: Date;
}