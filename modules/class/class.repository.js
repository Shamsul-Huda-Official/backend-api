const Class = require('./class.model');

const createClass = async (data) => {
    return await Class.create(data);
};

const getAllClasses = async (query, skipMiddlewareFunction, limit = 10, skip = 0) => {
    const [ classes, total ] = await Promise.all([
        Class.find(query)
            .skip(skip)
            .limit(limit)
            .populate('divisions.classTeacherId', 'name username')
            .lean(),
        Class.countDocuments(query)
    ]);
    
    return { classes, total };
}

const getClassById = async (id) => {
    return await Class.findById(id)
        .populate('divisions.classTeacherId', 'name username')
};

const updateClass = async (id, data) => {
    return await Class.findByIdAndUpdate(id, data, { new: true });
};

const deleteClass = async (id) => {
    return await Class.findByIdAndDelete(id);
};

module.exports = {
    createClass,
    getAllClasses,
    getClassById,
    updateClass,
    deleteClass,
}