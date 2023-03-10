const User = require('../dataBase/User');
const { ErrorHandler } = require('../errors/ErrorHandler');
const { EMAIL_ALREADY_EXISTS, WRONG_EMAIL_OR_PASSWORD } = require('../errors/errors.list');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try{
            const { email } = req.body;
            const checkUserEmail = await User.find({email});

            if (checkUserEmail) {
                throw new ErrorHandler(EMAIL_ALREADY_EXISTS.message, EMAIL_ALREADY_EXISTS.status);
            };
            
            next();
        }catch(e) {
            next(e);
        }
    },
    
    isUserPresent:  async (req, res, next) => {
        try{

            const userUniqueEmail = await User
                .findOne({ email: req.body.email })
                .select('+password')
                .lean();

            if (!userUniqueEmail) {
                throw new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.status);
            }

            req.user = userUniqueEmail;

            next();

        }catch (e){
            next(e);
        }
    }    
};
