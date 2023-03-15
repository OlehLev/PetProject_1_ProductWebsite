const Product = require('../dataBase/Products');

module.exports = {
    getProducts: async (req, res, next) => {
        try{
            const allProduct = await Product.find({});
            res.send(allProduct);
        }catch(e){
            next(e);
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
