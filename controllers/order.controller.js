const User_order = require('../dataBase/User_order');

module.exports= {
    createUserOrder: async (req, res, next) => {
        try{
            const order = await User_order.create({
                user_id: req.user._id,
                products: req.body.products,
                order_number: 10003,
            });
  
            res.send(order);
            next();
        }catch(e) {
            next(e);
        }
    }
};
