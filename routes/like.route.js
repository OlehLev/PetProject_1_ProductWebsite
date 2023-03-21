const router = require('express').Router();
const { likeController } = require('../controllers/index');
const { authMiddleware } = require('../middlewares/index');


router.put('/', 
    authMiddleware.checkAccessToken,
    likeController.createUserLike
);
router.get('/', 
    authMiddleware.checkAccessToken,
    likeController.getUserLike
);

module.exports = router;
