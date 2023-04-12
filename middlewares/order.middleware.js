const orderStatus = require("../configs/orderStatus");
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

            if(req.body.order_status || req.body.payment_status) {
                throw new ErrorHandler(NOT_ALL_DATA.message, NOT_ALL_DATA.status);
            };
            
            next();
        }catch(e) {
            next(e);
        }
    },

    checkOrderIdPresent: (req, res, next) => {
        try{
            req.order_id = req.params.id;

            if(!req.order_id) {
                throw new ErrorHandler(NOT_ALL_DATA.message, NOT_ALL_DATA.status);
            };

            next();
        }catch(e){
            next(e);
        };
    },

    checkOrderStatusParams: (req, res, next) => {
        try{
            if(Object.keys(req.body).length !== 1 || req.body.order_status === undefined) {
                throw new ErrorHandler(NOT_ALL_DATA.message, NOT_ALL_DATA.status);
            };

            if(!Object.values(orderStatus).includes(Object.values(req.body)[0])) {
                throw new ErrorHandler(NOT_ALL_DATA.message, NOT_ALL_DATA.status);
            };

            req.order_status = req.body.order_status;

            next();
        }catch(e){
            next(e);
        };
    },

    checkOrderPaymentParams: (req, res, next) => {
        try{
            if(Object.keys(req.body).length !== 1 || req.body.payment_status === undefined) {
                throw new ErrorHandler(NOT_ALL_DATA.message, NOT_ALL_DATA.status);
            };

            if(typeof req.body.payment_status !== "boolean") {
                throw new ErrorHandler(NOT_ALL_DATA.message, NOT_ALL_DATA.status);
            };

            req.payment_status = req.body.payment_status;

            next();
        }catch(e){
            next(e);
        };
    },

    getOrdersForDiscount: async (req, res, next) => {
        try{
            req.userId = req.result.user_id;

            const userOrders = await U_order.find({user_id: req.userId, payment_status: true});

            req.ordersAmountMoney = 0;

            userOrders.forEach(e => { req.ordersAmountMoney = req.ordersAmountMoney + e.order_amount_discount; });
        
            next();
        }catch(e){
            next(e);
        };
    }
};
