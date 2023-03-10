const U_auth = require('../dataBase/U_auth');
const jtxService = require('../services/jwt.service');
const { userNormalizator } = require('../util/user.util');

module.exports = {
    loginUser: async (req, res, next) => {
        try{
            const { user } = req;
            const tokenPair = jtxService.generateTokenPair();
            const normalizatorUser = userNormalizator(user);
            const countUserLogin = await U_auth.count({user_id: user.id});

            if(countUserLogin > 4) {
                throw new Error ("Limit login 4 devices");
            };

            await U_auth.create({ ...tokenPair, user_id: normalizatorUser.id });

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
