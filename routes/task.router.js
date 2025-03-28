const {Router} = require('express');
const { getAllTasks, createTask, getTasks } = require('../controllers/task.controller');

const taskRouter = new Router();

taskRouter.get("/all",getAllTasks);
taskRouter.get("/:id",getTasks);

taskRouter.post("/create",createTask);