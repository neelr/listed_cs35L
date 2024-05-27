// basic express typescript server
import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import addTask from "./routes/addTask";
import getTasks from "./routes/getTasks";
import addUser from "./routes/addUser";
import dotenv from "dotenv";
import ddGetUsersByName from "./routes/ddGetUsersByName";
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

dotenv.config();

export const SECRET_KEY = process.env.AUTH_SECRET || "test-secret";

const PORT = process.env.PORT || 3000;

const app = express();

const dynamoDBPreface = "/dynamodb";

app.use(bodyParser.json());

app.post("/add-task", addTask);
app.post("/add-user", addUser);

app.get("/", (req: Request, res: Response) => {
  res.send("Listed Server is running!");
});

app.get(`${dynamoDBPreface}/auth`, ddSignIn);
app.post(`${dynamoDBPreface}/auth`, ddSignUp);

// authenticated routes
app.get(`${dynamoDBPreface}/user`, authenticateJWT, ddGetUserById);
app.delete(`${dynamoDBPreface}/user`, authenticateJWT, ddDeleteUser);
app.get(`${dynamoDBPreface}/tasks`, authenticateJWT, ddGetTasksByUserIds);
app.get(`${dynamoDBPreface}/users`, authenticateJWT, ddGetUsersByName);
app.post(`${dynamoDBPreface}/task`, authenticateJWT, ddCreateTask);
app.get(`${dynamoDBPreface}/task`, authenticateJWT, ddGetTaskById);
app.get(`${dynamoDBPreface}/tasks`, authenticateJWT, ddGetTasksByCreatorId);
app.get(
  `${dynamoDBPreface}/friends/tasks`,
  authenticateJWT,
  ddGetTasksByUserIds
);
app.post(`${dynamoDBPreface}/friends`, authenticateJWT, ddAddFriend);
app.delete(`${dynamoDBPreface}/task`, authenticateJWT, ddDeleteTask);

app.get("/get-tasks", getTasks);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
