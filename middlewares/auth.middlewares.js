const U_auth = require("../dataBase/U_auth");
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
            next(e);
        }
    },

    chackAccessToken: async (req, res, next) => {
        try{
            
            const token = req.get("Authorization");
            
            if(!token){
                throw new Error("error token");
            };

            await jwtService.verifyToken(token);

            const tokenRespons = await U_auth
                .findOne({ access_token: token})
                .populate('user_id');

            if(!tokenRespons) {
                throw new Error("error token");
            };

            req.user = tokenRespons.user_id;

            next();

        }catch(e) {
            next(e);
        }
    },

    chackRefreshToken: async (req, res, next) => {
        try{
            const token = req.get("Authorization");
            if(!token){
                throw new Error("error token");
            }

            await jwtService.verifyToken(token, "refresh");

            const tokenRespons = await U_auth
                .findOne({ refresh_token: token})
                .populate('user_id');

            if(!tokenRespons) {
                throw new Error("error token");
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
                throw new Error("token error");
            };

            await jwtService.verifyToken(token);

            const tokenRespons = await U_auth
                .findOne({ access_token: token})
                .populate('user_id');

            if(!tokenRespons) {
                throw new Error("error token");
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
                throw new Error("Email is invalid");
            }
            await U_auth.deleteMany({ user_id: userId});

            next();

        }catch(e){
            next(e);
        }
    }
};
