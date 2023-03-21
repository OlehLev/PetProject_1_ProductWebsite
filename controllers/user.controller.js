const { hash } = require('../services/password.service');
const User = require('../dataBase/User');
const userUtil = require('../util/user.util');
const mailer = require('../services/nodemailer');

module.exports = {
    getUsers: async (req, res, next) => {
        try{
            const userInfo = await User.find({});
            res.json(userInfo);
        }catch(e){
            next(e);
        }
    },
    creatConfirmEmail: async (req, res, next) => {
        try{
            const confirmEmail = await hash(req.body.email);
            req.confirm = confirmEmail.replace(/\//mg,"");

            const message = {
                to: `${req.body.email}`,
                subject: "Confirm email", // Subject line
                html: `<b>Please go ahead http://localhost:5000/auth/confirm/${req.confirm}</b>`, // html body
            };
            mailer(message);
            next();
        } catch(e) {
            next(e);
        };
    },
    createUser: async (req, res, next) => {
        try{
            const hashedPassword = await hash(req.body.password);

            await User.create({...req.body, password: hashedPassword, confirm_url: req.confirm});

            const normalizatorUser = userUtil.userNormalizator(req.body);
            
            res.json(normalizatorUser);
        }catch(e){
            next(e);
        };
    },
    confirmEmail: async (req, res, next) => {
        try{
            const checkConfirm = await User.findOneAndUpdate(
                {confirm_url: req.confirm}, 
                {check_confirm: true}, 
                {new: true}
            );
            if(!checkConfirm){
                throw new Error();
            }
            res.send(checkConfirm.check_confirm);
            next();
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
