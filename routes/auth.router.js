const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');
const userMiddlewar = require('../middlewares/user.middlewar');

router.post('/', 
    userMiddlewar.isUserPresent,
    authMiddlewares.isPasswordMatche,
    authController.loginUser
);

router.post('/logout', 
    authMiddlewares.logoutToken,
    authController.logout
);
    
router.post('/refresh', 
    authMiddlewares.checkRefreshToken,
    authController.loginUser
);

module.exports = router;
