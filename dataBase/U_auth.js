const {Schema, model} = require('mongoose');

const uAuthSchema = new Schema({
    access_token: {
        type: String,
        require: true,
        trim: true
    },
    refresh_token:{
        type: String,
        require: true,
        trim: true
    },
    user_id:{
        type: Schema.Types.ObjectId,
        require: true,
        ref: 'user'
    }
}, {timestamps: true});

module.exports = model('u_auth', uAuthSchema);
