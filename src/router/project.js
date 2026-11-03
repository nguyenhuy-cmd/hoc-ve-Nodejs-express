import express from 'express';
import { postProject, getAllProject, updateAllProject, deleteProject } from '../controllers/projectController.js';
const routerProject = express.Router();
routerProject.post('/', postProject);
routerProject.get('/', getAllProject);
routerProject.put('/:id', updateAllProject);
routerProject.delete('/:id', deleteProject);

export default routerProject;
