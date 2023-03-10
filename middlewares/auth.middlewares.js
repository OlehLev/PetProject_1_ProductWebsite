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
    }
};

