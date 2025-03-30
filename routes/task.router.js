const {Router} = require('express');
const {  createTask, getTasks, updateTask, deleteTask } = require('../controllers/task.controller');

const taskRouter = new Router();

taskRouter.get("/all",getTasks);

taskRouter.post("/create",createTask)

taskRouter.patch("/update/:id",updateTask)

taskRouter.delete("/delete/:id",deleteTask)

taskRouter.post("/create",createTask);


module.exports = taskRouter;