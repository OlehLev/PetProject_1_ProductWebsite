const U_discount = require("../dataBase/U_discount");
const { WRONG_UPDATE } = require("../errors/errors.list");

module.exports = {
    createDiscount: async (req, res, next) => {
        try{
            const newDiscount = await U_discount.create({ ...req.body });

            res.send(newDiscount);

            next();
        }catch(e){
            next(e);
        }
    },

    getDiscount: async (req, res, next) => {
        try{
            const allDiscount = await U_discount.find();
            
            res.send(allDiscount);

            next();
        }catch(e) {
            next(e);
        }
    },

    getUsertDiscount: async (req, res, next) => {
        try{
            const userDiscount = await U_discount.find({ discount_name: { $regex: /user/ } });

            res.send(userDiscount);

            next();
        }catch(e) {
            next(e);
        }
    },

    getDealerDiscount: async (req, res, next) => {
        try{
            const dealerDiscount = await U_discount.find({ discount_name: { $regex: /dealer/ } });

            res.send(dealerDiscount);

            next();
        }catch(e) {
            next(e);
        }
    },
    
    updateDiscount: async (req, res, next) => {
        try{
            const upDate = await U_discount.findOneAndUpdate(
                {_id: req.discountId},
                {...req.body},
                {new: true}
            );

            if(!upDate) {
                throw new ErrorHandler(WRONG_UPDATE.message, WRONG_UPDATE.status);
            };
            
            res.send(upDate);

            next();
        }catch(e) {
            next(e);
        }
    },

    deleteDiscount: async (req, res, next) => {
        try{
            await U_discount.findOneAndDelete({ _id: req.discountId });
            
            res.send("discount_delete: true");
            
            next();
        }catch(e) {
            next(e);
        }
    }
};
