const U_auth = require('../dataBase/U_auth');
const jtxService = require('../services/jwt.service');
const { userNormalizator } = require('../util/user.util');

module.exports = {
    loginUser: async (req, res, next) => {
        try{
            
            const { user } = req;
            const tokenPair = jtxService.generateTokenPair();

            const normalizatorUser = userNormalizator(user);

            await U_auth.create({
                ...tokenPair,
                user_id: normalizatorUser.id
            });

            await res.json({normalizatorUser, ...tokenPair});
        }catch (e){
            next(e);
        };
    },
    logout: async (req, res, next) => {
        try{
            await res.json('logout'+req.body);
        }catch (e){
            next(e);
        };
    }
};
