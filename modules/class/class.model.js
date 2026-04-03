const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    institutionId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Institution',
    },
}, { timestamps: true });

const Class = mongoose.model('Class', classSchema);
module.exports = Class;