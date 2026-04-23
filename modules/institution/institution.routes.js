const express = require('express');
const router = express.Router();
const {
    createInstitution,
    getInstitutions,
    getInstitutionById,
    updateInstitution: updateInstitutionById,
    deleteInstitution
} = require('./institution.controller');
const authMiddleware = require('../../shared/middleware/auth.middleware')
const roleMiddleware = require('../../shared/middleware/role.middleware')

router.route('/')
    .get(getInstitutions)
    .post(createInstitution)

router.route('/:id')
    .get(getInstitutionById)
    .put(updateInstitutionById)
    .delete(deleteInstitution)

module.exports = router;

// roleMiddleware('super_admin'), 