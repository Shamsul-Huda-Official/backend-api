const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Class',
    },
    subjectId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Subject',
    },
    length: {
        type: Number,
        required: true,
    },
    institutionId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Institution',
        required: true,
    },
}, { timestamps: true });

const Period = mongoose.model('Period', periodSchema);
module.exports = Period;