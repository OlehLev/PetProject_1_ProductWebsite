const U_discount = require("../dataBase/U_discount");
const { ErrorHandler } = require("../errors/ErrorHandler");

module.exports = {
    createDiscount: async (req, res, next) => {
        try{
            const newDiscount = await U_discount.create({ ...req.body });

            if(!newDiscount){
                throw new ErrorHandler("Errror", 401);
            };

            res.send(newDiscount);

            next();
        }catch(e){
            next(e);
        }
    },

    getDiscount: (req, res, next) => {
        try{
            next();
        }catch(e) {
            next(e);
        }
    },

    getUsertDiscount: (req, res, next) => {
        try{
            next();
        }catch(e) {
            next(e);
        }
    },

    getDealerDiscount: (req, res, next) => {
        try{
            next();
        }catch(e) {
            next(e);
        }
    },
    
    updeteDiscount: (req, res, next) => {
        try{
            next();
        }catch(e) {
            next(e);
        }
    },

    deleteDiscount: (req, res, next) => {
        try{
            next();
        }catch(e) {
            next(e);
        }
    }
};
