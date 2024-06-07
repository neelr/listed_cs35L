import { Task, TaskWithFriendInfo } from "../types/taskTypes";
import { User } from "../types/userTypes";

export const getTasksWithFriendInfo = (
  currentUser: User | undefined,
  friends: User[] | undefined,
  tasks: Task[] | undefined,
  allowCompleted = false
): TaskWithFriendInfo[] => {
  let friendTasks: { task: Task; friendNames: string[] }[] = [];
  for (const task of tasks || []) {
    if (task.completed && !allowCompleted) continue;
    let friendNames: string[] = [];
    for (const userId of task.userIds) {
      if (currentUser?.userId === userId)
        friendNames.push(currentUser?.username);
      else {
        const friendName = friends?.find((x) => x.userId === userId)?.username;
        if (friendName) friendNames.push(friendName);
      }
    }
    friendTasks.push({ task, friendNames });
  }

  return friendTasks;
};
export const getUserIdsFromTasks = (
  tasksData: Task[] | undefined
): string[] => {
  let friendsData: string[] = [];
  for (const task of tasksData || []) {
    for (const userId of task.userIds) {
      if (!friendsData.includes(userId)) {
        friendsData.push(userId);
      }
    }
  }
  return friendsData;
};

export const sortByDate = (
  tasks: TaskWithFriendInfo[]
): TaskWithFriendInfo[] => {
  return tasks.slice().sort((a, b) => {
    const dateA = new Date(a.task.completeBy).getTime();
    const dateB = new Date(b.task.completeBy).getTime();
    if (isNaN(dateA) || isNaN(dateB)) {
      return 0;
    }
    return dateA - dateB;
  });
};

export const sortByDateAndCompleted = (
  tasks: TaskWithFriendInfo[]
): TaskWithFriendInfo[] => {
  const incompleteTasks = tasks.filter((task) => !task.task.completed);
  const completeTasks = tasks.filter((task) => task.task.completed);
  return sortByDate(incompleteTasks).concat(sortByDate(completeTasks));
};
