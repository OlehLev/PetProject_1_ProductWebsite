const U_order = require("../dataBase/U_order");

const { ErrorHandler } = require("../errors/ErrorHandler");
const { NOT_ALL_DATA } = require("../errors/errors.list");

module.exports = {
    getUserOrders: async (req, res, next) => {
        try{
            const userOrders = await U_order.find({user_id: req.user._id});
            res.send(userOrders);
            next();
        }catch(e){
            next(e);
        };
    },

    checkDataAvailability: (req, res, next) => {
        try{
            if(!req.body.user || !req.body.order_amount || !req.body.products || !req.body.delivery){
                throw new ErrorHandler(NOT_ALL_DATA.message, NOT_ALL_DATA.status);
            };
            
            req.body.products.forEach(e => {
                if(!e.price || !e.user_price) {
                    throw new ErrorHandler(NOT_ALL_DATA.message, NOT_ALL_DATA.status);
                }
            });
            
            next();
        }catch(e) {
            next(e);
        }
    }
};
