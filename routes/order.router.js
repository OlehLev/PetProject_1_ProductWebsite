const router = require('express').Router();

const { orderController } = require('../controllers/index');
const { authMiddleware, deliveryMiddleware, userMiddleware, orderMiddleware } = require('../middlewares/index');

router.get('/', 
    authMiddleware.checkAccessToken,
    orderController.getUserOrders
);

router.post('/', 
    authMiddleware.checkAccessToken,
    deliveryMiddleware.availabilityInUserDelivery,
    orderMiddleware.checkDataAvailability,
    orderController.createUserOrder
);

router.put('/user', 
    authMiddleware.checkAccessToken,
    orderController.cancelOrders
);

router.put('/manager', 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleManager,
    orderController.updateOrder
);

router.get('/manager', 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleManager,
    orderController.getOrders
);

router.get('/manager/:id', 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleManager,
    orderController.getOrdersById
);

module.exports = router;
