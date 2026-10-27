import express from 'express';
import { getHomePage, getClean, postCreateUser, getCreatePage, updatePage, deletePage, getEditPage } from "../controllers/home.Controller.js";

const router = express.Router();

router.get('/', getHomePage);

router.get('/clean', getClean);

router.get('/create', getCreatePage);

router.post('/create-user', postCreateUser);

router.get('/update/:id', getEditPage);
router.put('/update/:id', updatePage);

router.delete('/delete/:id', deletePage)

export default router;