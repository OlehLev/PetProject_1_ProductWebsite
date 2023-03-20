const router = require('express').Router();

const userController = require('../controllers/user.controller');
const authMiddlewar = require('../middlewares/auth.middlewares');
const userMiddlewar = require('../middlewares/user.middlewar');

router.get("/", userController.getUsers);
router.post("/", 
    userMiddlewar.createUserMiddleware,
    userController.confirmUserEmail
);
router.post("/:confirm", 
    userMiddlewar.checkConfirmUserEmail,
    // userController.createUser
);
router.delete("/", 
    authMiddlewar.checkAccessToken,
    authMiddlewar.deleteUserToken,
    userController.deleteUsers
);

module.exports = router;
