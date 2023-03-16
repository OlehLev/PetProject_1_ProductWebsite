const { Schema, model } = require('mongoose');
const { NEW_ORDER } = require('../configs/orderStatus');

const userOrderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'user'
    },
    products: {
        type: Array
    },
    order_number: {
        type: Number,
        require: true,
        unique: true
    },
    order_status: {
        type: String,
        default: NEW_ORDER
    },
    payment_status: {
        type: Boolean,
        default: false,
    }
},{timestamps: true});

module.exports = model('u_order', userOrderSchema);
