const router = require('express').Router();

const userController = require('../controllers/user.controller');
const authMiddlewar = require('../middlewares/auth.middlewares');

router.get("/", userController.getUsers);
router.post("/", userController.createUser);
router.delete("/", 
    authMiddlewar.chackAccessToken,
    authMiddlewar.deleteUserToken,
    userController.deleteUsers
);

module.exports = router;
