const {Schema, model} = require ('mongoose');

const userSchema = new Schema ({
    first_name:{
        type: String,
        require: true,
        trim: true
    },
    family_name: {
        type: String,
        require: true,
        trim: true
    },
    email:{
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    phone_number: {
        type: Number,
        unique: true,
        require: true,
        minlength: 10,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trim: true,
        minlength: 8,
        select: false
    },
    roles:{
        type: String,
        default: "user"
    },
    discount: {
        type: Number,
        default: 0
    },
    ordersAmountMoney: {
        type: Number,
        default: 0
    },
    subscription: {
        type: Boolean,
        default: true
    },
    delivery_address: {
        type: String,
        trim: true,
        default: "undefined"
    }

},{timestamps: true});

module.exports = model('user', userSchema);
