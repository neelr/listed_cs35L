// basic express typescript server
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import addTask from './routes/addTask';
import getTasks from './routes/getTasks';
import addUser from './routes/addUser';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(bodyParser.json());

app.post('/add-task', addTask);
app.post('/add-user', addUser);

app.get('/', (req: Request, res: Response) => {
  res.send('Listed Server is running!');
});

app.get('/get-tasks', getTasks);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});