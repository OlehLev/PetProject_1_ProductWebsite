const router = require('express').Router();

const orderController = require('../controllers/order.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const deliveryMiddlewares = require('../middlewares/delivery.middlewares');

router.post('/', 
    authMiddlewares.checkAccessToken,
    deliveryMiddlewares.availabilityInUserDelivery,
    orderController.createUserOrder
);

module.exports = router;
