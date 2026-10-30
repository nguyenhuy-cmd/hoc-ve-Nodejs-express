import express from 'express';
import { postProject, getAllProject, updateProject, deleteProject, deleteArrayProject } from '../controllers/projectController.js';
const routerProject = express.Router();
routerProject.post('/', postProject);
routerProject.get('/', getAllProject);
routerProject.put('/:id', updateProject);
routerProject.delete('/deleteArray', deleteArrayProject);
routerProject.delete('/:id', deleteProject);
export default routerProject;