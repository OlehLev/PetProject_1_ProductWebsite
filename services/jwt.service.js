const jwt = require('jsonwebtoken');
const tweSecret = require('../configs/config');
require('dotenv').config();

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, tweSecret.JWT_ACCESS_SECRET, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, tweSecret.JWT_REFRESH_SECRET, { expiresIn: '30d' });
        
        return {
            access_token,
            refresh_token
        };
    },
    verifyToken: async (token, tokenType = 'access') => {
        try{
            const secret = tokenType === 'access' ? tweSecret.JWT_ACCESS_SECRET : tweSecret.JWT_REFRESH_SECRET;
            
            await jwt.verify(token, secret);

        }catch(e){
            throw new Error('Token does not valid');
        }
    }
};
