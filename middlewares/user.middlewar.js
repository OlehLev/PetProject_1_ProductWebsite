const User = require('../dataBase/User');
const { ErrorHandler } = require('../errors/ErrorHandler');
const { 
    EMAIL_ALREADY_EXISTS, 
    WRONG_EMAIL_OR_PASSWORD, 
    PHONE_NUMBER_ALREADY_EXISTS, 
    WRONG_EMAIL_OR_PHONE_NUMBER 
} = require('../errors/errors.list');

module.exports = {
    createUserMiddleware: async (req, res, next) => {
        try{

            if(!req.body.email || !req.body.phone_number){
                throw new ErrorHandler(WRONG_EMAIL_OR_PHONE_NUMBER.message, WRONG_EMAIL_OR_PHONE_NUMBER.status);
            }
            const { email, phone_number } = req.body;

            const checkUserEmail = await User.findOne({ email });
            const checkUserPhoneNumber = await User.findOne({ phone_number });
            
            if (checkUserEmail) {
                throw new ErrorHandler(EMAIL_ALREADY_EXISTS.message, EMAIL_ALREADY_EXISTS.status);
            };
            if (checkUserPhoneNumber) {
                throw new ErrorHandler(PHONE_NUMBER_ALREADY_EXISTS.message, PHONE_NUMBER_ALREADY_EXISTS.status);
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
    },
    checkConfirmUserEmail: (req, res, next) => {
        try{
            res.send(req.params);
            next();
        }catch(e) {
            next(e);
        };
    } 
};
