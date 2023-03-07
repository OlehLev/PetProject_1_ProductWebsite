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
    }
},{timestamps: true});

module.exports = model('user', userSchema);
