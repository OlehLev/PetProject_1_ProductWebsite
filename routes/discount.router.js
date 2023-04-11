const { authMiddleware, userMiddleware, discountMiddleware } = require('../middlewares/index');
const { discountController } = require('../controllers/index');

const router = require('express').Router();

router.get('/', 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleManager,    
    discountController.getDiscount
);
router.get('/user', 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleManager, 
    discountController.getUsertDiscount
);
router.get('/dealer', 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleManager, 
    discountController.getDealerDiscount
);

router.post('/', 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleManager,
    discountMiddleware.isDiscountParamsPresent,
    discountMiddleware.isDiscountNameExists,
    discountController.createDiscount
);

router.put('/:id', 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleManager,
    discountMiddleware.isDiscountParamsPresent,
    discountMiddleware.checkDiscountIdPresent,
    discountController.updateDiscount
);

router.delete('/:id',
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleManager,
    discountMiddleware.checkDiscountIdPresent,
    discountController.deleteDiscount
);

module.exports = router;
