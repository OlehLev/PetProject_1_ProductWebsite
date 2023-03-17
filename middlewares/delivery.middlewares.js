const User = require("../dataBase/User");
const D_companies = require('../dataBase/D_companies');

module.exports = {
    availabilityInUserDelivery: async (req, res, next) => {
        try{
            if(req.user.delivery_address.city === ""){
                req.delivery = await D_companies.findOne({company_name: req.body.delivery.d_company});
                await User.findOneAndUpdate({
                    _id: req.user._id,
                    delivery_address: {
                        ...req.body.delivery, 
                        d_company: req.delivery._id}
                });
            };
            next();
        }catch(e){
            next(e);
        }
    }
};
