const { prisma } = require("../../shared/config/connection");

const createClass = async (data, tx = prisma) => {
    return await tx.class.create({ data });
};

const getAllClasses = async ({ where, skipMiddlewareFunction, limit = 10, skip = 0 }) => {
    const [ classes, total ] = await Promise.all([
        prisma.class.findMany({
            where,
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                divisions: {
                    include: {
                        classTeacher: {
                            select:  {
                                name: true,
                                userId: true
                            }
                        }
                    }
                }
            }
        }),
        prisma.class.count({ where }),
    ]);
    return { classes, total };
};

const getClassById = async (id) => {
    return await prisma.class.findUnique({ where: { id }, include: {
        divisions: {
            include: {
                classTeacher: {
                    select: {
                        name: true,
                        userId: true
                    }
                }
            }
        }
    }});
};

const updateClass = async (id, data, tx = prisma) => {
    return await tx.class.update({ where: { id }, data });
};

const deleteClass = async (id) => {
    return await prisma.class.delete({ where: { id } });
};

module.exports = {
    createClass,
    getAllClasses,
    getClassById,
    updateClass,
    deleteClass,
}