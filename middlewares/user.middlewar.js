const User = require('../dataBase/User');

module.exports = {
    createUserMiddleware: {},
    isUserPresent:  async (req, res, next) => {
        try{

            const userUniqueEmail = await User.findOne({ email: req.body.email });
            
            req.user = userUniqueEmail;

            next();

        }catch (e){
            next(e);
        }
    }    
};
