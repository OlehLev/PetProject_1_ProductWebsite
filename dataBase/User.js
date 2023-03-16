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
        type: String,
        unique: true,
        require: true,
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
        city: {
            type: String,
            default: ""
        },
        deliv_company: {
            type: String,
            default: ""
        },
        delivery_address: {
            type: String,
            default: ""
        }
    }

},{timestamps: true});

module.exports = model('user', userSchema);
