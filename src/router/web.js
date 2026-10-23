import express from 'express';
import { getHomePage, getClean, postCreateUser,getCreatePage } from '../controllers/home.controller.js';

const router = express.Router();

router.get('/', getHomePage);

router.get('/clean', getClean)

router.get('/create', getCreatePage)

router.post('/create-user', postCreateUser)
export default router;