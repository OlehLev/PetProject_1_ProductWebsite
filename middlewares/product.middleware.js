const Product = require('../dataBase/Products');
const { ErrorHandler } = require('../errors/ErrorHandler');
const { PRODUCT_NAME_ALREADY_EXISTS, PRODUCT_ID_ALREADY_EXISTS } = require('../errors/errors.list');

module.exports = {
    isProductPresent: async (req, res, next) => {
        try{
            const { product_name, product_id } = req.body;
            const findProductName = await Product.findOne({ product_name });
            const findProductId = await Product.findOne({ product_id });

            if(findProductName){
                throw new ErrorHandler(PRODUCT_NAME_ALREADY_EXISTS.message, PRODUCT_NAME_ALREADY_EXISTS.status);
            }
            if(findProductId){
                throw new ErrorHandler(PRODUCT_ID_ALREADY_EXISTS.message, PRODUCT_ID_ALREADY_EXISTS.status);
            }
            next();
        }catch(e) {
            next(e);
        };
    }
};
