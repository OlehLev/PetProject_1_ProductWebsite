const router = require('express').Router();
const likeController = require('../controllers/like.controller');
const authMiddlewares = require('../middlewares/auth.middlewares');


router.post('/', 
    authMiddlewares.checkAccessToken,
    likeController.createUserLike
);
router.get('/', 
    authMiddlewares.checkAccessToken,
    likeController.getUserLike
);

module.exports = router;
