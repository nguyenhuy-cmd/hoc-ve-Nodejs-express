import express from 'express';
const routerTask = express.Router();
import { postTask, GetAllTask, updateTask, deleteTask } from '../controllers/taskController.js';

routerTask.post('/', postTask);
routerTask.get('/', GetAllTask);
routerTask.put('/:id', updateTask);
routerTask.delete('/:id', deleteTask);
export default routerTask;
