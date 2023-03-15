const router = require('express').Router();

const orderController = require('../controllers/order.controller');

router.post('/', orderController.createUserOrder);

module.exports = router;