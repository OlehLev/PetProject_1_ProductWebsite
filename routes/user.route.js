const router = require('express').Router();

const { userController } = require('../controllers/index');
const { authMiddleware, userMiddleware } = require('../middlewares/index');

router.get("/", userController.getUsers);

router.post("/", 
    userMiddleware.isUserValid,
    userMiddleware.createUserMiddleware,
    userController.creatConfirmEmail,
    userController.createUser
);

router.delete("/", 
    authMiddleware.checkAccessToken,
    authMiddleware.deleteUserToken,
    userController.deleteUsers
);

router.put("/admin", 
    authMiddleware.checkAccessToken,
    userMiddleware.chechUserRoleAdmin,
    userController.adminUpdateUser
);

module.exports = router;
