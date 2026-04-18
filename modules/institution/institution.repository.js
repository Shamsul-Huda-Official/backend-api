const Institution = require('./institution.model')

const createInstitution = async (data, session) => {
    return await Institution.create([data], { session });
}

const getAllInstitutions = async ({ skip = 0, limit = 10, name, search }) => {
    const query = {};
    if(name) {
        query.name = name;
    }    
    if(search) {
        query.name = { $regex: search, $option: 'i' };
    }
    const [ institution, total ] = await Promise.all([
        Institution.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 })
            .lean(),
        Institution.countDocuments(query),
    ])
    return { institution, total };
}

const getInstitutionById = async (id) => {
    return await Institution.findById(id);
}

const updateInstitution = async (id, data) => {
    return await Institution.findByIdAndUpdate(id, data, { new: true })
}

const deleteInstitution = async (id) => {
    return item.findByIdAndDelete(id)
}

module.exports = {
    createInstitution,
    getAllInstitutions,
    getInstitutionById,
    updateInstitution,
    deleteInstitution,
}