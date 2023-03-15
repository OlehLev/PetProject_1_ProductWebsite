const router = require('express').Router();
const productController = require('../controllers/product.controller');
const productMiddlewares = require('../middlewares/product.middlewares');

router.get("/", productController.getProducts);
router.post("/", 
    productMiddlewares.isProductPresent,
    productController.createProduct
);

module.exports = router;
