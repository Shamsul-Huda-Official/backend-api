const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    username: {
        type: String, 
        required: true, 
        unique: true,
    },
    phone: {
        type: String, 
        required: true,
        unique: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String, 
        required: true, 
    },
    role: {
        type: String, 
        enum: ['admin', 'user'],
        unique: true,
    },
    institutionId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Institution',
    },
    isActive: {
        type: Boolean, 
        default: true,
    }
}, { timestamps: true });

const Auth = mongoose.model('Auth', authSchema);
module.exports = Auth;