const { authMiddleware, userMiddleware, discountMiddleware } = require('../middlewares/index');
const { discountController } = require('../controllers/index');

const router = require('express').Router();

router.get('/', (req, res) =>{

    res.send("true get");
});
router.get('/user', (req, res) =>{

    res.send("true get User");
});
router.get('/dealer', (req, res) =>{

    res.send("true get Dealer");
});

router.post('/', 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleManager,
    discountMiddleware.isDiscountParamsPresent,
    discountMiddleware.isDiscountNameExists,
    discountController.createDiscount
);

router.put('/:id', (req, res) =>{

    res.send("true update");
});

router.delete('/:id', (req, res) =>{

    res.send("true delete");
});

module.exports = router;
