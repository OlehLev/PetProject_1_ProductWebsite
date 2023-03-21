const router = require('express').Router();

const { userController } = require('../controllers/index');
const { authMiddleware, userMiddleware } = require('../middlewares/index');

router.get("/", userController.getUsers);

router.post("/", 
    userMiddleware.createUserMiddleware,
    userController.creatConfirmEmail,
    userController.createUser
);

router.delete("/", 
    authMiddleware.checkAccessToken,
    authMiddleware.deleteUserToken,
    userController.deleteUsers
);

module.exports = router;
