import Project from "../models/project.model.js";
import Task from "../models/task.model.js";
import Person from "../models/person.model.js";
import Customer from "../models/customers.model.js";
const postProjectService = async (data) => {
    const project = await Project.create(data);
    return project;
}

const getAllProjectService = async (queryParams = {}) => {
    // 1. Lấy tham số từ query
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const keyword = queryParams.keyword || '';

    const skip = (page - 1) * limit;

    // 2. Xây dựng điều kiện tìm kiếm
    let query = {};
    if (keyword) {
        query.$or = [
            { name: { $regex: keyword, $options: 'i' } },
        ];
    }

    // 3. Truy vấn database
    const [project, totalProjects] = await Promise.all([
        Project.find(query).skip(skip).limit(limit).lean().skip(skip)
            .limit(limit)
            .lean()
            .populate('customerInfo')   // điền object Customer
            .populate('personInfo')     // điền object Person
            .populate('leader')         // điền object Person
            .populate('task'),
        Project.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalProjects / limit);

    // 4. Trả về kết quả cho Controller
    return {
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalProjects,
            totalPages: totalPages
        },
        data: project
    };
}
const updateProjectService = async (id, data) => {
    const project = await Project.findByIdAndUpdate(id, data, { new: true });
    return project;
}
const deleteProjectService = async (id) => {
    const project = await Project.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() }, { new: true });
    return project;
}
const deleteProjectArrayService = async (ids) => {
    const project = await Project.updateMany({ _id: { $in: ids } },
        { isDeleted: true, deletedAt: new Date() });
    return project;
}
export {
    postProjectService,
    getAllProjectService,
    updateProjectService,
    deleteProjectService,
    deleteProjectArrayService
}
