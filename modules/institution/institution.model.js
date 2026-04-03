const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    plan: {
        type: String, 
        enum: ['basic', 'growth', 'pro'],
        default: 'basic',
    },
    isActive: {
        type: Boolean, 
        default: true,
    }
}, { timestamps: true });

const Institution = mongoose.model('Institution', authSchema);
module.exports = Institution;