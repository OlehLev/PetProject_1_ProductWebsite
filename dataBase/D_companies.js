const { Schema, model } = require('mongoose');

const deliveryCompany = new Schema({
    company_name: {
        type:String,
        require: true,
        unique: true
    }
});

module.exports = model("d_companies", deliveryCompany);
