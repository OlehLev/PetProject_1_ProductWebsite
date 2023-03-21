const router = require('express').Router();

const { orderController } = require('../controllers/index');
const { authMiddleware, deliveryMiddleware} = require('../middlewares/index');

router.post('/', 
    authMiddleware.checkAccessToken,
    deliveryMiddleware.availabilityInUserDelivery,
    orderController.createUserOrder
);

module.exports = router;
