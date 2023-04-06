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
            const userId = req.body.user_id;
            const userOrder = req.body.order_number;

            delete req.body.user_id;
            delete req.body.order_number;

            if(req.body.order_status){
                if(!Object.values(orderStatus).includes(req.body.order_status)){
                    throw new ErrorHandler(WRONG_SEARCH_ORDER.message, WRONG_SEARCH_ORDER.status);
                }
            };
            
            const result = await U_order.findOneAndUpdate(
                { user_id: userId, order_number: userOrder },
                { ...req.body },
                { new: true }
            );

            // if(req.body.payment_status && req.body.payment_status === "true"){
            //     const userOrders = await U_order.find({user_id: userId});
            //     console.log(userOrders[1].products);
            //     console.log("userOrders+++++++++++++++++++++++++++++++++++");
            // };

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
