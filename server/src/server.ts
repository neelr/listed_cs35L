// basic express typescript server
import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";
import addTask from "./routes/addTask";
import getTasks from "./routes/getTasks";
import addUser from "./routes/addUser";
import dotenv from "dotenv";
import dynamoDBGetUserById from "./routes/dynamoDBGetUserById";
import dynamoDBCreateUser from "./routes/dynamoDBCreateUser";
import dynamoDBGetUsersByName from "./routes/dynamoDBGetUsersByName";
import dynamoDBCreateTask from "./routes/dynamoDBCreateTask";
import dynamoDBGetTasksByCreatorId from "./routes/dynamoDBGetTasksByCreatorId";
import dynamoDBGetTaskById from "./routes/dynamoDBGetTaskById";
import dynamoDBDeleteTask from "./routes/dynamoDBDeleteTask";
import dynamoDBDeleteUser from "./routes/dynamoDBDeleteUser";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

const dynamoDBPreface = "/dynamodb";

app.use(bodyParser.json());

app.post("/add-task", addTask);
app.post("/add-user", addUser);

app.get("/", (req: Request, res: Response) => {
  res.send("Listed Server is running!");
});

app.get(`${dynamoDBPreface}/user`, dynamoDBGetUserById);
app.post(`${dynamoDBPreface}/user`, dynamoDBCreateUser);
app.delete(`${dynamoDBPreface}/user`, dynamoDBDeleteUser);
app.get(`${dynamoDBPreface}/get-users`, dynamoDBGetUsersByName);
app.post(`${dynamoDBPreface}/task`, dynamoDBCreateTask);
app.get(`${dynamoDBPreface}/task`, dynamoDBGetTaskById);
app.get(`${dynamoDBPreface}/get-tasks`, dynamoDBGetTasksByCreatorId);
app.delete(`${dynamoDBPreface}/task`, dynamoDBDeleteTask);

app.get("/get-tasks", getTasks);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
