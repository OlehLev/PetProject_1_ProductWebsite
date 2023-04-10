const U_discount = require("../dataBase/U_discount");
const { ErrorHandler } = require("../errors/ErrorHandler");
const { DISCOUNT_NAME_ALREADY_EXISTS, NOT_ALL_DATA } = require("../errors/errors.list");

module.exports = {
    isDiscountNameExists: async (req, res, next) => {
        try{
            const checkDiscountName = await U_discount.findOne({ discount_name: req.body.discount_name });

            if(checkDiscountName) {
                throw new ErrorHandler(DISCOUNT_NAME_ALREADY_EXISTS.message, DISCOUNT_NAME_ALREADY_EXISTS.status);
            };
            next();
        }catch (e){
            next(e);
        }
    },
    
    isDiscountParamsPresent: (req, res, next) => {
        try{
            if(Object.keys(req.body).length !== 3) {
                throw new ErrorHandler(NOT_ALL_DATA.message, NOT_ALL_DATA.status);
            };

            if(!req.body.hasOwnProperty("discount_name") || 
            !req.body.hasOwnProperty("discount") || 
            !req.body.hasOwnProperty("order_amounts")) {
                throw new ErrorHandler(NOT_ALL_DATA.message, NOT_ALL_DATA.status);
            };

            next();
        }catch(e) {
            next(e);
        }
    },

};
