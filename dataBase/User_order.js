const { Schema, model } = require('mongoose');
const { NEW_ORDER } = require('../configs/orderStatus');

const userOrderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: "undefined"
    },
    phone_number: {
        type: Number,
        unique: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        trim: true
    },
    products: {
        type: Array
    },
    order_number: {
        type: Number,
        require: true
    },
    order_status: {
        type: String,
        default: NEW_ORDER
    },
    payment_status: {
        type: Boolean,
        default: false,
    },
},{timestamps: true});

module.exports = model('u_order', userOrderSchema);
