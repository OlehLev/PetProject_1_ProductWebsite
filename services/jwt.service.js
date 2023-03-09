const jwt = require('jsonwebtoken');

module.exports = {
    generateTokenPair: ()=> {
        const access_token = jwt.sign({}, "access", { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, "refresh", { expiresIn: '30d' });

        return {
            access_token,
            refresh_token
        };
    }
};
