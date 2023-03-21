const router = require('express').Router();
const { productController } = require('../controllers/index');
const { productMiddleware } = require('../middlewares/index');

router.get("/", productController.getProducts);
router.post("/", 
    productMiddleware.isProductPresent,
    productController.createProduct
);

module.exports = router;
