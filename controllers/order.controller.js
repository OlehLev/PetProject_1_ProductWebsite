module.exports= {
    createUserOrder: (req, res, next) => {
        try{

            next();
        }catch(e) {
            next(e);
        }
    }
};
