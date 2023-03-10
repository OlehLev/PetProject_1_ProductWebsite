const bcrypt = require("bcrypt");

module.exports = {

    hash: (password) => bcrypt.hash(password,10),
    compare: async (password, heshPassword) => {

        const isPasswordMatched = await bcrypt.compare(password, heshPassword);
        if(!isPasswordMatched){
            throw new Error ('Wrong email or password', 404);
        }
    }

};
