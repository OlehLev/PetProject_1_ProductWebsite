const router = require('express').Router();

const orderController = require('../controllers/order.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');

router.post('/', 
    authMiddlewares.chackAccessToken,
    orderController.createUserOrder
);

module.exports = router;
