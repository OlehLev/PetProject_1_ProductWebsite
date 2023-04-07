const { Schema, model } = require('mongoose');

const userDiscount = new Schema({
    discount_name: {
        type: String,
        require: true,
        trim: true
    },

    discount: {
        type: Number,
        require: true,
        trim: true
    },

    order_amounts: {
        type: Number,
        require: true,
        trim: true
    }
}, {timestamps: true});

module.exports = model('u_discount', userDiscount);
