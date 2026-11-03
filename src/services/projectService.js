import Project from "../models/project.model.js";
import Person from "../models/person.model.js";
const postProjectService = async (data) => {
    if (data.type === "EMPTY-PROJECT") {
        let result = await Project.create(data)
        return result
    }

    // Thêm user vào project
    if (data.type === "ADD-USERS") {
        let myProject = await Project.findById(data.projectId);
        for (let i = 0; i < data.usersArr.length; i++) {

            // Kiểm tra Person có tồn tại không
            const personExists = await Person.findById(data.usersArr[i]);
            if (!personExists) {
                throw new Error(`Person ID ${data.usersArr[i]} không tồn tại`);
            }
            myProject.personInfo.push(data.usersArr[i]);
        }
        await myProject.save();
    }
    return null;
}
    


const getAllProjectService = async (data) => {
    
    // 1. Lấy tham số từ query
    const page = parseInt(data.page) || 1;
    const limit = parseInt(data.limit) || 10;
    const keyword = data.keyword || '';

    const skip = (page - 1) * limit;

    // 2. Xây dựng điều kiện tìm kiếm
    let query = { isDeleted: false };// Luôn luôn không tìm kiếm đc những cái đã xóa mềm
    if (keyword) {
        query.$or = [
            { name: { $regex: keyword, $options: 'i' } },
        ];
    }

    // 3. Truy vấn database
    const [projects, totalProject] = await Promise.all([
        Project.find(query).skip(skip).limit(limit)
            .populate('personInfo')   // lấy đủ thông tin người dùng
            .populate('customerInfo') // lấy đủ thông tin khách hàng
            .populate('task')         // lấy đủ thông tin task
            .lean(),
        Project.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalProject / limit);

    // 4. Trả về kết quả cho Controller
    return {
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalProject,
            totalPages: totalPages
        },
        data: projects
    };
}
 const updateProjectService = async (id, data)=> {
    const update = await Project.findByIdAndUpdate(id, data);
    return update;
 }

const deleteProjectService = async (id) => {
    const deleteProject = await Project.findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true }
    );
    return deleteProject;
}
export {
    postProjectService,
    getAllProjectService,
    updateProjectService,
    deleteProjectService
}
