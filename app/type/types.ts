export interface Task {
  _id: string;  // MongoDB _id
  title: string;
  completed: boolean;
  description?: string;
  createdAt: string | Date;
}