const router = require('express').Router();
const { productController } = require('../controllers/index');
const { productMiddleware, authMiddleware, userMiddleware } = require('../middlewares/index');

router.get("/user", 
    authMiddleware.checkAccessToken,
    productController.getUserProducts
);
router.get("/", productController.getProducts);
router.post("/", 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleAdmin,
    productMiddleware.isProductPresent,
    productController.createProduct
);
router.put("/:id", 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleAdmin,
    productMiddleware.isProductIdPresent,
    productController.updateProduct
);

module.exports = router;
