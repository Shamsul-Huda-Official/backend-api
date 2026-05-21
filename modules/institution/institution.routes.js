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

router.use(authMiddleware)

router.route('/')
    .get(roleMiddleware('SUPER_ADMIN'), getInstitutions)
    .post(roleMiddleware('SUPER_ADMIN'), createInstitution)

router.route('/:id')
    .get(roleMiddleware('SUPER_ADMIN'), getInstitutionById)
    .put(roleMiddleware('SUPER_ADMIN'), updateInstitutionById)
    .delete(roleMiddleware('SUPER_ADMIN'), deleteInstitution)

module.exports = router;
// roleMiddleware('SUPER_ADMIN'),
 