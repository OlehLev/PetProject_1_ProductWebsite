const U_auth = require('../dataBase/U_auth');
const { ErrorHandler } = require('../errors/ErrorHandler');
const { ACCESS_DENIED } = require('../errors/errors.list');
const jtxService = require('../services/jwt.service');
const { userNormalizator } = require('../util/user.util');

module.exports = {
    loginUser: async (req, res, next) => {
        try{
            const { user } = req;
            const tokenPair = jtxService.generateTokenPair();
            const normalizatorUser = userNormalizator(user);
            const countUserLogin = await U_auth.count({user_id: user._id});

            if(countUserLogin > 4) {
                throw new ErrorHandler (ACCESS_DENIED.message, ACCESS_DENIED.status);
            };

            await U_auth.create({ ...tokenPair, user_id: normalizatorUser._id });

            await res.json({normalizatorUser, ...tokenPair});
        }catch (e){
            next(e);
        };
    },
    logout: async (req, res, next) => {
        try{
            await res.json('Ok');
        }catch (e){
            next(e);
        };
    }
};
