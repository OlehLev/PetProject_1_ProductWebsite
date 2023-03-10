const { hash } = require('../services/password.service');
const User = require('../dataBase/User');
const userUtil = require('../util/user.util');

module.exports = {
    getUsers: async (req, res, next) => {
        try{
            const userInfo = await User.find({});
            res.json(userInfo);
        }catch(e){
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try{
            const hashedPassword = await hash(req.body.password);
            
            await User.create({...req.body, password: hashedPassword});

            const normalizatorUser = userUtil.userNormalizator(req.body);
            
            res.json(normalizatorUser);
        }catch(e){
            next(e);
        };
    },
    deleteUsers: async (req, res, next) => {
        try{
            const userId = req.user._id;

            await User.deleteOne({_id : userId});

            res.json("User delete");
        }catch(e){
            next(e);
        };
    },
};
