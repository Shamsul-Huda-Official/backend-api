const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }, 
    profileImage: {
        url: String, 
        publicId: String,
    },
    userId: {
        typr: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
    }, 
    institutionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Institution',
    },
}, { timestamps: true });

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;