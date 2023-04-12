const router = require('express').Router();

const { orderController, userController } = require('../controllers/index');
const { 
    authMiddleware, 
    deliveryMiddleware, 
    userMiddleware, 
    orderMiddleware, 
    discountMiddleware 
} = require('../middlewares/index');

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

router.put('/manager/:id', 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleManager,
    orderMiddleware.checkDataAvailability,
    orderController.updateOrder
);

router.put('/manager/status/:id', 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleManager,
    orderMiddleware.checkOrderIdPresent,
    orderMiddleware.checkOrderStatusParams,
    orderController.updateOrderStatus
);

router.put('/manager/payment/:id', 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleManager,
    orderMiddleware.checkOrderIdPresent,
    orderMiddleware.checkOrderPaymentParams,
    orderController.updateOrderPaymaent,
    orderMiddleware.getOrdersForDiscount,
    discountMiddleware.discountCalculation,
    userController.updateUserDiscount
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
