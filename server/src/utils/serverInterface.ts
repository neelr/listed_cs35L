import { User, Task } from "../types";
import { v4 as uuidv4 } from "uuid";

const userTable = new Map<string, User>();
const taskTable = new Map<string, Task>();

export const createUser = (user: User): User => {
  userTable.set(user.id.toString(), user);

  return user;
};

export const getUser = (id: string): User | undefined => {
  return userTable.get(id);
};

export const createTask = (task: Task): Task => {
  task.id = uuidv4();
  taskTable.set(task.id.toString(), task);

  return task;
};

export const getTasks = (id: string): Task[] => {
  let tasks: Task[] = [];
  console.log(taskTable);
  for (const task of taskTable.values()) {
    if (task.userId === id) {
      tasks.push(task);
    }
  }

  return tasks;
};
