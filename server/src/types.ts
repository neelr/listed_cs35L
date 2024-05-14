export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Task {
  id: string;
  name: string;
  userId: string;
  description: string;
  completed: boolean;
}
