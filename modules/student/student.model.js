const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    admissionNumber: {
        type: String, 
        required: true, 
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    rollNumber: {
        type: String, 
        required: true,
    },
    parentName: {
        type: String,
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Class',
    },
    divisionId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Division',
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Auth',
    },
    institutionId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Institution',
    },
}, { timestamps: true });

const Student = mongoose.model('Student', authSchema);
module.exports = Student;