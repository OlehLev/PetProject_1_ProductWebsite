const { Schema, model } = require('mongoose');
const { NEW_ORDER } = require('../configs/orderStatus');

const userOrderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'user'
    },
    user_info: {
        type: Object
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
    },
    delivery_address: {
        city: {
            type: String,
            default: ""
        },
        d_company: {
            type: Schema.Types.ObjectId,
            ref: 'd_companies'
        },
        d_address: {
            type: String,
            default: ""
        }
    }
},{timestamps: true});

module.exports = model('u_order', userOrderSchema);
