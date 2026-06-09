const { parseSchema } = require('@redis/search/dist/lib/commands/CREATE');
const { prisma } = require('../../shared/config/connection');
const AppError = require('../../shared/errors/AppError');

const authService = require('../auth/auth.service')
const studentRepository = require('./student.repository');

const createStudent = async (data) => {
    const { name, admissionNumber, rollNumber, phone, email, parentName, institutionId, classId, divisionId } = data
    if ( !name || !admissionNumber || !rollNumber || !phone || !parentName ) throw new AppError('All fields are required.', 400);
    if ( !institutionId ) throw new AppError('InstitutionId is required', 400);
    if ( !classId ) throw new AppError('classId is required.', 400);
    if ( !divisionId ) throw new AppError('divisionId is required.', 400);

    const existingStudent = await studentRepository.findDuplicateStudent({
        institutionId,
        email,
        phone,
        admissionNumber
    });
    
    console.log("DATAS:", institutionId, divisionId, rollNumber)
    if ( existingStudent ) {
        if ( existingStudent.email === email ) {
            throw new AppError('Email already exists for another student.', 400);
        }

        if ( existingStudent.phone === phone ) {
            throw new AppError('Phone number already exists for another student.', 400);
        }

        if ( existingStudent.admissionNumber === admissionNumber ) {
            throw new AppError('Admission number already exists for another student.', 400);
        }
    } 

    const existingRollNumber = await studentRepository.findRollNumber({
        institutionId,
        divisionId,
        rollNumber
    });

    if ( existingRollNumber ) {
        throw new AppError(
            "Roll number already exists for another student in the same division.",
            400
        )
    }

    return await prisma.$transaction(async (tx) => {
        const auth = await authService.createUser({
            name: parentName,
            username: phone,
            phone,
            email,
            password: admissionNumber,
            role: 'USER',
            institutionId,
        }, tx);

        return await studentRepository.createStudent({
            name,
            admissionNumber, 
            rollNumber,
            phone,
            email,
            parentName,
            institutionId,
            classId,
            divisionId,
            userId: auth.id,
        }, tx);
    });

};

const bulkCreateStudents = async ( {institutionId, classId, divisionId, students} ) => {
    return await prisma.$transaction(async (tx) => {
        const results = [];
        
        for (const student of students) {
            const auth = await authService.createUser({
                name: student.name,
                username: student.phone,
                phone: student.phone,
                email: student.email,
                password: student.admissionNumber,
                role: 'USER',
                institutionId
            }, tx);

            const newStudent = await studentRepository.createStudent({
                name: student.name,
                admissionNumber: student.admissionNumber,
                rollNumber: student.rollNumber,
                phone: student.phone,
                email: student.email,
                parentName: student.parentName,
                institutionId,
                classId: student.classId,
                divisionId: student.divisionId,
                userId: auth.id,
            }, tx);
            results.push(newStudent);
        }
        return results;
    });
};

const getAllStudents = async ({ institutionId, classId, divisionId }) => {
    if ( !institutionId ) throw new AppError('institutionId is required.', 400);

    return await studentRepository.getAllStudents({
        institutionId,
        classId,
        divisionId,
    });
}

const getStudentById = async (id, institutionId) => {
    const student = await studentRepository.getStudentById(id, institutionId);
    if ( !student ) throw new AppError('Student not found.', 404);
    return student;
}

const updateStudent = async (id, institutionId, data) => {
    const student = await studentRepository.updateStudent(id, institutionId, data);
    if ( !student ) throw new AppError('Student not found.', 404);
    return student;
}

const deleteStudent = async (id, institutionId) => {
    return await prisma.$transaction(async (tx) => {
        return await studentRepository.deleteStudent(
            id,
            institutionId,
            tx
        );
    });
};

module.exports = {
    createStudent,
    bulkCreateStudents,
    getAllStudents,
    getStudentById,
    updateStudent,
    deleteStudent
}