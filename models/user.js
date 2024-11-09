const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true, 
        select: false 
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user',
        required: true
    }
}, {timestamps: true});

module.exports = model('User', userSchema);