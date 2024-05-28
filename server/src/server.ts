// basic express typescript server
import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import addTask from "./routes/addTask";
import getTasks from "./routes/getTasks";
import addUser from "./routes/addUser";
import dotenv from "dotenv";
import ddCreateTask from "./routes/ddCreateTask";
import ddGetTasksByCreatorId from "./routes/ddGetTasksByCreatorId";
import ddGetTaskById from "./routes/ddGetTaskById";
import ddDeleteTask from "./routes/ddDeleteTask";
import ddDeleteUser from "./routes/ddDeleteUser";
import { authenticateJWT } from "./utils/utils";
import ddSignIn from "./routes/ddSignIn";
import ddSignUp from "./routes/ddSignUp";
import ddGetUserById from "./routes/ddGetUserById";
import ddGetTasksByUserIds from "./routes/ddGetTasksByUserIds";
import ddAddFriend from "./routes/ddAddFriend";
import ddSearchUsersByName from "./routes/ddSearchUsersByName";
import rateLimit from "express-rate-limit";

dotenv.config();

export const SECRET_KEY = process.env.AUTH_SECRET || "test-secret";

const PORT = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20, // limit each IP to 20 requests per windowMs
});

const app = express();

const oldRoutesPreface = "/old";

app.use(bodyParser.json());
app.use(limiter);

app.post(`${oldRoutesPreface}/add-task`, addTask);
app.post(`${oldRoutesPreface}/add-user`, addUser);
app.get(`${oldRoutesPreface}/get-tasks`, getTasks);

app.get("/", (req: Request, res: Response) => {
  res.send("Listed Server is running!");
});

app.get(`/auth`, ddSignIn);
app.post(`/auth`, ddSignUp);

// authenticated routes
app.get(`/user`, authenticateJWT, ddGetUserById);
app.delete(`/user`, authenticateJWT, ddDeleteUser);
app.get(`/users`, authenticateJWT, ddSearchUsersByName);
app.post(`/task`, authenticateJWT, ddCreateTask);
app.get(`/task`, authenticateJWT, ddGetTaskById);
app.get(`/tasks`, authenticateJWT, ddGetTasksByCreatorId);
app.get(`/friends/tasks`, authenticateJWT, ddGetTasksByUserIds);
app.post(`/friends`, authenticateJWT, ddAddFriend);
app.delete(`/task`, authenticateJWT, ddDeleteTask);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
