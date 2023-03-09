const {Schema, model} = require ('mongoose');

const userSchema = new Schema ({
    name:{
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
    }

},{timestamps: true});

module.exports = model('user', userSchema);
