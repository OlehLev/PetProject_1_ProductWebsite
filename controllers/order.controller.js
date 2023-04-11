const U_order = require('../dataBase/U_order');
const D_company = require('../dataBase/D_companies');
const { ErrorHandler } = require('../errors/ErrorHandler');
const orderStatus = require('../configs/orderStatus');

const { 
    WRONG_ORDER_NUMBER, 
    WRONG_SEARCH_ORDER, 
    ENTITY_NOT_FOUND 
} = require('../errors/errors.list');

module.exports= {
    createUserOrder: async (req, res, next) => {
        try{
            const deliveryCompany = await D_company.findOne({company_name: req.body.delivery.d_company});
            const countOrders = await U_order.find();
            let amountOrders = 0;

            req.body.products.forEach(e => {
                amountOrders = amountOrders + (e.price * e.count);
            });
        
            let countOrder = 1;

            if(countOrders.length !== 0){
                countOrder = countOrders.pop().order_number + 1;
            };

            const discountOrder = amountOrders - req.body.order_amount;
            const order = await U_order.create({
                user_id: req.user._id,
                user_info: req.body.user,
                products: req.body.products,
                order_amount: amountOrders,
                order_amount_discount: req.body.order_amount,
                order_discount: discountOrder,
                delivery_address: {...req.body.delivery, d_company: deliveryCompany._id },
                order_number: countOrder,
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
    
    getOrders: async (req, res, next) => {
        try{
            const Orders = await U_order.find();

            res.send(Orders);
            next();
        }catch(e){
            next(e);
        };
    },

    getOrdersById: async (req, res, next) => {
        try{
            const OrderId = await U_order.findOne({_id: req.params.id});

            if(!OrderId) {
                throw new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.status);
            };

            res.send(OrderId);
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
                {order_status: orderStatus.CANCELLED}
            );

            if(!cancelOrder){
                throw new ErrorHandler(WRONG_ORDER_NUMBER.message, WRONG_ORDER_NUMBER.status);
            }

            res.send("The order has been cancelled");

            next();
        }catch(e){
            next(e);
        }
    },

    updateOrder: async (req, res, next) => {
        try{
            const deliveryCompany = await D_company.findOne({company_name: req.body.delivery.d_company});
            const orderId = req.params.id;

            let amountOrders = 0;

            req.body.products.forEach(e => {
                amountOrders = amountOrders + (e.price * e.count);
            });

            const discountOrder = amountOrders - req.body.order_amount;
           
            const result = await U_order.findOneAndUpdate(
                { _id: orderId },
                { 
                    user_info: req.body.user,
                    products: req.body.products,
                    order_amount: amountOrders,
                    order_amount_discount: req.body.order_amount,
                    order_discount: discountOrder,
                    delivery_address: {...req.body.delivery, d_company: deliveryCompany._id },
                },
                { new: true }
            );

            if(!result){
                throw new ErrorHandler(WRONG_SEARCH_ORDER.message, WRONG_SEARCH_ORDER.status);
            };

            res.send(result);
            next();
        }catch(e) {
            next(e);
        }
    }
};
