const Product = require('../dataBase/Products');
const User = require('../dataBase/User');
const { ErrorHandler } = require('../errors/ErrorHandler');
const { ENTITY_NOT_FOUND } = require('../errors/errors.list');

module.exports = {
    getProducts: async (req, res, next) => {
        try{
            const allProduct = await Product.find();
            
            res.send(allProduct);
        }catch(e){
            next(e);
        }
    },

    getUserProducts: async (req, res, next) => {
        try{
            const allProduct = await Product.find();
            const userId = req.user._id;

            const user = await User.findOne({_id: userId});

            if(!user) {
                throw new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.status);
            };

            const userDiscount = (100 - user.discount)/100;

            allProduct.forEach((e, i) => {
                e._doc.user_price = e.product_price * userDiscount;
                allProduct[i] = e;              
            });
            
            res.send(allProduct);
        }catch(e){
            next(new ErrorHandler(ENTITY_NOT_FOUND.message, ENTITY_NOT_FOUND.status));
        }
    },

    createProduct: async (req, res, next) => {
        try{
            await Product.create({...req.body});

            res.send(req.body);
            
            next();
        }catch(e){
            next(e);
        }
    },
    deleteProduct: () => {},
    updateProduct: () => {}
};
