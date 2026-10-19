const express = require('express');

const router = express.Router();
const productController = require('./product.controller')

const prefix = './products'
router.get(prefix, productController.getAllProduct)
router.get(`${prefix}/detail/:id`, productController.getProductById)
router.post(prefix, productController.create)
router.put(prefix, productController.put)
router.delete(prefix, productController.delete)

module.exports = router;