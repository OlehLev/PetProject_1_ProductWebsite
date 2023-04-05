const router = require('express').Router();
const { productController } = require('../controllers/index');
const { productMiddleware, authMiddleware } = require('../middlewares/index');

router.get("/user", 
    authMiddleware.checkAccessToken,
    productController.getUserProducts
);
router.get("/", productController.getProducts);
router.post("/", 
    productMiddleware.isProductPresent,
    productController.createProduct
);

module.exports = router;
