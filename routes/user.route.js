const router = require('express').Router();

const userController = require('../controllers/user.controller');
const authMiddlewar = require('../middlewares/auth.middlewares');
const userMiddlewar = require('../middlewares/user.middlewar');

router.get("/", userController.getUsers);
router.post("/", 
    userMiddlewar.createUserMiddleware,
    userController.createUser);
router.delete("/", 
    authMiddlewar.chackAccessToken,
    authMiddlewar.deleteUserToken,
    userController.deleteUsers
);

module.exports = router;
