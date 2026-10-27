import express from 'express';
import { getAllUserApi, postUserApi, updateUserApi, deleteUserApi, postUploadFile } from '../controllers/apiController.js';

const routerApi = express.Router();

routerApi.get('/', (req, res) => {
    res.status(200).json({
        data: 'Xin chào bạn',
        
    })
});
routerApi.get('/users', getAllUserApi)

routerApi.post('/users', postUserApi)

routerApi.put('/users/:id', updateUserApi)

routerApi.delete('/users/:id', deleteUserApi)

routerApi.post('/files', postUploadFile)


export default routerApi;