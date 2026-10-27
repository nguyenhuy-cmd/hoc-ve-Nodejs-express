import express from 'express';
const routerCustomer = express.Router();
import { postCustomer } from '../controllers/customerController.js';

routerCustomer.post('/', postCustomer)

export  default routerCustomer;