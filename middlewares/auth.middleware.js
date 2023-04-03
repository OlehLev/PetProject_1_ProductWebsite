const U_auth = require("../dataBase/U_auth");
const { ErrorHandler } = require("../errors/ErrorHandler");
const { INVALID_TOKEN, WRONG_EMAIL_OR_PASSWORD, ENTITY_NOT_FOUND } = require("../errors/errors.list");
const jwtService = require("../services/jwt.service");
const { compare } = require("../services/password.service");

module.exports = {
    isPasswordMatche: async (req, res, next) => {
        try{
            const { password } = req.body;
            const { password: hashPassword } = req.user;
            
            await compare(password, hashPassword);

            next();
        }catch(e) {
            next(new ErrorHandler(WRONG_EMAIL_OR_PASSWORD.message, WRONG_EMAIL_OR_PASSWORD.status));
        }
    },

    checkAccessToken: async (req, res, next) => {
        try{
            
            const token = req.get("Authorization");
            
            if(!token){
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            };

            await jwtService.verifyToken(token);

            const tokenRespons = await U_auth
                .findOne({ access_token: token})
                .populate('user_id');

            if(!tokenRespons) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            };

            req.user = tokenRespons.user_id;

            next();

        }catch(e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try{
            const token = req.get("Authorization");
            if(!token){
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            }

            await jwtService.verifyToken(token, "refresh");

            const tokenRespons = await U_auth
                .findOne({ refresh_token: token})
                .populate('user_id');

            if(!tokenRespons) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            };

            await U_auth.deleteOne({ refresh_token: token});

            req.user = tokenRespons.user_id;

            next();
            
        }catch(e) {
            next(e);
        }
    },

    logoutToken: async (req, res, next) =>{
        try{
            const token = req.get("Authorization");

            if(!token){
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            };

            await jwtService.verifyToken(token);

            const tokenRespons = await U_auth
                .findOne({ access_token: token})
                .populate('user_id');

            if(!tokenRespons) {
                throw new ErrorHandler(INVALID_TOKEN.message, INVALID_TOKEN.status);
            };

            await U_auth.deleteOne({ access_token: token});

            req.user = tokenRespons.user_id;

            next();

        } catch (e){
            next(e);
        }
    },
    
    deleteUserToken: async (req, res, next) => {
        try{
            const userId = req.user._id;

            if(!userId){
                throw new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.status);
            }
            await U_auth.deleteMany({ user_id: userId});

            next();

        }catch(e){
            throw new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.status);
        }
    }
};
