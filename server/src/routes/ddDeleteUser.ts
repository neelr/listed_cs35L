import { Request, Response } from "express";
import { DeleteUserRequest } from "../types";
import { deleteUser, getUserById, removeFriend } from "../utils/dynamoDBUsers";
import {
  deleteTask,
  editTask,
  getTasksByUserIds,
} from "../utils/dynamoDBTasks";

export default async (req: Request, res: Response) => {
  try {
    const userInfo: DeleteUserRequest = req.body;

    const user = await getUserById({ userId: userInfo.userId });
    if (!user) {
      res.status(404).send({ message: "User not found" });
      return;
    }
    for (const friendId of user.friends) {
      await removeFriend({ userId: userInfo.userId, friendId });
    }
    const tasks = await getTasksByUserIds({ userIds: [userInfo.userId] });
    for (const task of tasks) {
      if (task.userId === userInfo.userId) {
        await deleteTask(task.taskId);
      } else {
        const newUsers = task.userIds.filter(
          (userId: string) => userId !== userInfo.userId
        );
        const newOwner = newUsers[0];
        await editTask(task.taskId, { userId: newOwner, userIds: newUsers });
      }
    }

    const userToBeDeleted = await deleteUser(userInfo);
    res.send(userToBeDeleted);
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).send({ message: "Error deleting user", error: error });
  }
};
