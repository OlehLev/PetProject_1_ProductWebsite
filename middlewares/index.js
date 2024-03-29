module.exports = {
    authMiddleware: require('./auth.middleware'),
    deliveryMiddleware: require('./delivery.middleware'),
    productMiddleware: require('./product.middleware'),
    userMiddleware: require('./user.middleware'),
    orderMiddleware: require('./order.middleware'),
    discountMiddleware: require('./discount.middleware')
};
