const router = require('express').Router();
const controller = require('../controllers/auth.controller');
const middlewar = require('../middlewares/user.middlewar');

router.post('/', 
    middlewar.isUserPresent,
    controller.loginUser
);
router.post('/logout', controller.logout);
router.post('/refresh', controller.logout);

module.exports = router;
