const User = require('../dataBase/User');
const { ErrorHandler } = require('../errors/ErrorHandler');
const { 
    EMAIL_ALREADY_EXISTS, 
    WRONG_EMAIL_OR_PASSWORD, 
    PHONE_NUMBER_ALREADY_EXISTS, 
    WRONG_EMAIL_OR_PHONE_NUMBER,
    EMAIL_IS_NOT_CONFIRMED,
    WRONG_CONFIRM
} = require('../errors/errors.list');
const userValidator = require('../validators/user.validator');

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
    isUserValid: (req, res, next) => {
        try{
            const { error, value } = userValidator.createUserValidator.validate(req.body);
            if(error){
                throw new Error(error.details[0].message);
            };

            req.body = value;

            next();
        }catch(e) {
            next(e);
        }
    },
    isConfirmPresent: (req, res, next) => {
        try{
            if(!req.params.confirm){
                throw new ErrorHandler(WRONG_CONFIRM.message, WRONG_CONFIRM.status);
            };

            req.confirm = req.params.confirm;
            
            next();
        }catch(e) {
            next(e);
        };
    },
    checkConfirmUserEmail:  (req, res, next) => {
        try{

            if(req.user.check_confirm === false){
                throw new ErrorHandler(EMAIL_IS_NOT_CONFIRMED.message, EMAIL_IS_NOT_CONFIRMED.status);
            };

            req.confirm = req.params.confirm;
            
            next();
        }catch(e) {
            next(e);
        };
    } 
};
