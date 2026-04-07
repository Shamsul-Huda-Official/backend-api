const express = require('express');
const router = express.Router();
const { 
    getAllInstitutions,
    getInstitutionById,
    createInstitution,
    updateInstitutionById,
    deleteInstitution,
} = require('./institution.repository')

const authMiddleware = require('../../shared/middleware/auth.middleware')
const roleMiddleware = require('../../shared/middleware/role.middleware')

router.route('/')
    .get(getAllInstitutions)
    .post(authMiddleware, roleMiddleware('super_admin'), createInstitution)

router.route('/:id')
    .get(getInstitutionById)
    .put(authMiddleware, roleMiddleware('super_admin'), updateInstitutionById)
    .delete(authMiddleware, roleMiddleware('super_admin'), deleteInstitution)

module.exports = router;