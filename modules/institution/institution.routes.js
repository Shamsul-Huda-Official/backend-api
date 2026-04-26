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

// router.use(authMiddleware)

router.route('/')
    .get(getInstitutions)
    .post(createInstitution)

router.route('/:id')
    .get(getInstitutionById)
    .put( updateInstitutionById)
    .delete(deleteInstitution)

module.exports = router;
// roleMiddleware('SUPER_ADMIN'),
 