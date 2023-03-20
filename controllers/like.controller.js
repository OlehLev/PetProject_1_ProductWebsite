const Products = require("../dataBase/Products");

module.exports = {
    createUserLike: async (req, res, next) => {
        try{
            const checkUserLike = await Products.findOne({ _id: req.body.product_id });
            const usersLikeProduct = checkUserLike.users_id;

            if (!usersLikeProduct.includes(req.user._id)) {
                usersLikeProduct.push(req.user._id);
                const userLike = await Products.findOneAndUpdate(
                    {_id: req.body.product_id},
                    {users_id: usersLikeProduct},
                    {new: true}
                );
                res.send(userLike);
                next();
            }else {
                usersLikeProduct.pop(req.user._id);
                await Products.findOneAndUpdate(
                    {_id: req.body.product_id},
                    {users_id: usersLikeProduct}
                );
                res.send("like remove");
            };

            next();
        }catch(e) {
            next(e);
        }
    },
    getUserLike: async (req, res, next) => {
        try{
            const userProduct = await Products.find({users_id: req.user._id});
            res.send(userProduct);
            next();
        }catch(e) {
            next(e);
        };
    }
};
