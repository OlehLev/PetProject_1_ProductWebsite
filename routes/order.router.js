const router = require('express').Router();

const { orderController } = require('../controllers/index');
const { authMiddleware, deliveryMiddleware } = require('../middlewares/index');

router.get('/', 
    authMiddleware.checkAccessToken,
    orderController.getUserOrders
);

router.post('/', 
    authMiddleware.checkAccessToken,
    deliveryMiddleware.availabilityInUserDelivery,
    orderController.createUserOrder
);

router.put('/user', 
    authMiddleware.checkAccessToken,
    orderController.cancelOrders
);

module.exports = router;
