const User_order = require('../dataBase/U_order');
const D_company = require('../dataBase/D_companies');

module.exports= {
    createUserOrder: async (req, res, next) => {
        try{
            const deliveryCompany = await D_company.findOne({company_name: req.body.delivery.d_company});
            const countOrder = await await User_order.find({});
            
            const order = await User_order.create({
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
    }
};
