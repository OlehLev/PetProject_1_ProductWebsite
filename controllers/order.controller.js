const U_order = require('../dataBase/U_order');
const D_company = require('../dataBase/D_companies');
const { ErrorHandler } = require('../errors/ErrorHandler');
const { CANCELLED } = require('../configs/orderStatus');
const { WRONG_ORDER_NUMBER } = require('../errors/errors.list');

module.exports= {
    createUserOrder: async (req, res, next) => {
        try{
            const deliveryCompany = await D_company.findOne({company_name: req.body.delivery.d_company});
            const countOrder = await await U_order.find({});
            
            const order = await U_order.create({
                user_id: req.user._id,
                user_info: req.body.user,
                products: req.body.products,
                delivery_address: {...req.body.delivery, d_company: deliveryCompany._id },
                order_number: countOrder.pop().order_number + 1,
            });
  
            res.send(order);
            next();
        }catch(e) {
            next(e);
        }
    },

    getUserOrders: async (req, res, next) => {
        try{
            const userOrders = await U_order.find({user_id: req.user._id});
            res.send(userOrders);
            next();
        }catch(e){
            next(e);
        };
    },

    cancelOrders: async (req, res, next) => {
        try{
            const userOrderNumber = req.body.order_number;
            const userId = req.user._id;
            
            if(!userOrderNumber){
                throw new ErrorHandler(WRONG_ORDER_NUMBER.message, WRONG_ORDER_NUMBER.status);
            }

            const cancelOrder = await U_order.findOneAndUpdate(
                {user_id: userId, order_number: userOrderNumber},
                {order_status: CANCELLED}
            );

            if(!cancelOrder){
                throw new ErrorHandler(WRONG_ORDER_NUMBER.message, WRONG_ORDER_NUMBER.status);
            }

            res.send("The order has been cancelled");

            next();
        }catch(e){
            next(e);
        }
    }
};
