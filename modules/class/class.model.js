const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    
    classTeacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher',
        required: false,
    }
}, { _id: false });

const classSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    divisions: [divisionSchema],
    institutionId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Institution',
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const Class = mongoose.model('Class', classSchema);
module.exports = Class;