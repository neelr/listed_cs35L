// basic express typescript server
import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import dotenv from "dotenv";
import ddCreateTask from "./routes/ddCreateTask";
import ddGetUserTasks from "./routes/ddGetUserTasks";
import ddGetTaskById from "./routes/ddGetTaskById";
import ddDeleteTask from "./routes/ddDeleteTask";
import ddDeleteUser from "./routes/ddDeleteUser";
import { authenticateJWT } from "./utils/utils";
import ddSignIn from "./routes/ddSignIn";
import ddSignUp from "./routes/ddSignUp";
import ddGetUserById from "./routes/ddGetUserById";
import ddAddFriend from "./routes/ddAddFriend";
import ddSearchUsersByName from "./routes/ddSearchUsersByName";
import rateLimit from "express-rate-limit";
import ddEditTask from "./routes/ddEditTask";
import {
  AUTH_ROUTE,
  FRIEND_ROUTE,
  TASK_ROUTE,
  USER_ROUTE,
} from "./utils/constants";
import ddGetFriendTasks from "./routes/ddGetFriendTasks";
import ddGetPublicTasksByUserIds from "./routes/ddGetPublicTasksByUserIds";
import ddGetFriendDetails from "./routes/ddGetFriendDetails";
import ddGetFriendsDetails from "./routes/ddGetFriendsDetails";
import ddRemoveFriend from "./routes/ddRemoveFriend";

dotenv.config();

export const SECRET_KEY = process.env.AUTH_SECRET || "test-secret";

const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 15 * 1000, // 15 seconds
  max: 200, // limit each IP to 200 requests per windowMs
});

const app = express();

app.use(bodyParser.json());
app.use(limiter);

app.get("/", (req: Request, res: Response) => {
  res.send("Listed Server is running!");
});

app.post(`/${AUTH_ROUTE}/sign-in`, ddSignIn);
app.post(`/${AUTH_ROUTE}/sign-up`, ddSignUp);

// authenticated routes
app.get(`/${USER_ROUTE}`, authenticateJWT, ddGetUserById);
app.delete(`/${USER_ROUTE}`, authenticateJWT, ddDeleteUser);
app.get(`/${USER_ROUTE}/search`, authenticateJWT, ddSearchUsersByName);
app.post(`/${TASK_ROUTE}`, authenticateJWT, ddCreateTask);
app.get(`/${TASK_ROUTE}/:taskId`, authenticateJWT, ddGetTaskById);
app.put(`/${TASK_ROUTE}/:taskId`, authenticateJWT, ddEditTask);
app.delete(`/${TASK_ROUTE}/:taskId`, authenticateJWT, ddDeleteTask);
app.get(`/${USER_ROUTE}/${TASK_ROUTE}`, authenticateJWT, ddGetUserTasks);
app.post(
  `/${USER_ROUTE}/${TASK_ROUTE}`,
  authenticateJWT,
  ddGetPublicTasksByUserIds
);
app.get(`/${FRIEND_ROUTE}/:userId`, authenticateJWT, ddGetFriendDetails);
app.get(
  `/${FRIEND_ROUTE}/${TASK_ROUTE}/:userId`,
  authenticateJWT,
  ddGetFriendTasks
);
app.post(`/${FRIEND_ROUTE}/batch`, authenticateJWT, ddGetFriendsDetails);
app.post(`/${FRIEND_ROUTE}`, authenticateJWT, ddAddFriend);
app.put(`/${FRIEND_ROUTE}`, authenticateJWT, ddRemoveFriend);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
