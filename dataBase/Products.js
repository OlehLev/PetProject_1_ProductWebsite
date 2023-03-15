const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    product_name: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    product_id: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    product_currency: {
        type: String,
        default: "UAH"
    },
    product_price: {
        type: Number,
        require: true,
    },
    product_price_discount_chek: {
        type: Boolean,
        default: false
    },
    product_price_discount: {
        type: Number,
        default: 0
    },
    product_photos: {
        type: Array,
        require: true
    },
    product_characteristic: {
        type: Object,
        require: true
    },
    product_quantity: {
        type: Number,
        default: 0
    }
},{timestamps: true});

module.exports = model("product", productSchema);
