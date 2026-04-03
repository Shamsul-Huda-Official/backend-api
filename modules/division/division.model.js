const mongoose = require('mongoose');

const divisionSchema = new mongoose.Schema({
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

const Division = mongoose.model('Division', divisionSchema);
module.exports = Division;