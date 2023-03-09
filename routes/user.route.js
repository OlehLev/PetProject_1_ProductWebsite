const router = require('express').Router();

const controller = require('../controllers/user.controller');

router.get("/", controller.getUsers);
router.post("/", controller.createUser);
router.delete("/:user_id", controller.deleteUsers);

module.exports = router;
