const router = require('express').Router();
const { authController, userController } = require('../controllers/index');
const { authMiddleware, userMiddleware } = require('../middlewares/index');

router.post('/', 
    userMiddleware.isUserPresent,
    userMiddleware.checkConfirmUserEmail,
    authMiddleware.isPasswordMatche,
    authController.loginUser
);

router.post('/logout', 
    authMiddleware.logoutToken,
    authController.logout
);
    
router.post('/refresh', 
    authMiddleware.checkRefreshToken,
    authController.loginUser
);

router.get("/confirm/:confirm", 
    userMiddleware.isConfirmPresent,
    userController.confirmEmail
);

module.exports = router;
