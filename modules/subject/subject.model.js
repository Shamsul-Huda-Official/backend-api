const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Class',
    },
    institutionId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Institution',
    },
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;