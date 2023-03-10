const router = require('express').Router();
const controller = require('../controllers/auth.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const userMiddlewar = require('../middlewares/user.middlewar');

router.post('/', 
    userMiddlewar.isUserPresent,
    authMiddlewares.isPasswordMatche,
    controller.loginUser
);
router.post('/logout', controller.logout);
router.post('/refresh', controller.logout);

module.exports = router;
