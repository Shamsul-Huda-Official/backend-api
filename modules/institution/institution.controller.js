const institutionService = require('./institution.service')
const asyncHandler = require('../../shared/middleware/asyncHandler.middleware');


exports.getAllInstitutions = async (req, res) => {
    try {

    }
    catch (error) {
        res.status(500).json({
            success: false, 
            message: error.message,
        })
    }
}