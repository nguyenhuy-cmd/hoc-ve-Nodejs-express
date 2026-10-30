import express from 'express';
const routerCustomer = express.Router();
import { postCustomer, getAllCustomer, postCustomers, updateCustomer, deleteCustomer, deleteArrayCustomer } from '../controllers/customerController.js';

routerCustomer.post('/', postCustomer);
routerCustomer.get('/customers', getAllCustomer);
routerCustomer.post('/array', postCustomers);
routerCustomer.put('/update/:id', updateCustomer)
routerCustomer.delete('/delete/:id', deleteCustomer)
routerCustomer.delete('/deleteArray', deleteArrayCustomer)
routerCustomer.get('/info', (req, res) => {
    console.log(req.query);
    return res.status(200).json({
        data: req.query
    })
});

routerCustomer.get('/info/:name/:address', (req, res) => {
    console.log(req.params);
    return res.status(200).json({
        data: req.params
    })
});
export default routerCustomer;