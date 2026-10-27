import Person from "../models/person.model.js";

const getAllUser = async () => {
    return await Person.find();
};

const getUserById = async (id) => {
    return await Person.findById(id);
};

const update = async (email, name, city, id) => {
    return await Person.findByIdAndUpdate(id, { email, name, city }, { new: true });
};

const deleteUser = async (id) => {
    return await Person.findByIdAndDelete(id);
};

const create = async (email, name, city) => {
    return await Person.create({ email, name, city });
};

export {
    getAllUser,
    getUserById,
    update,
    deleteUser,
    create
};
