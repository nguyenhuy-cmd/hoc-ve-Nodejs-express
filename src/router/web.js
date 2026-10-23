import express from 'express';
import { getHomePage, getClean, postCreateUser, getCreatePage, getUpdatePage, postHandleUpdateUser } from "../controllers/home.Controller.js";

const router = express.Router();

router.get('/', getHomePage);

router.get('/clean', getClean);

router.get('/create', getCreatePage);

router.post('/create-user', postCreateUser);

router.get('/update/:id', getUpdatePage);

router.post('/update-user', postHandleUpdateUser);

export default router;