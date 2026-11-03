import Task from "../models/task.model.js";
import Project from "../models/project.model.js";
import Person from "../models/person.model.js";

const postTaskService = async (data) => {
    // Tạo task mới (rỗng)
    if (data.type === "EMPTY-TASK") {
        let result = await Task.create(data);
        return result;
    }

    // Thêm người phụ trách vào task
    if (data.type === "ADD-USERS") {
        let myTask = await Task.findById(data.taskId);
        if (!myTask) throw new Error(`Task ID ${data.taskId} không tồn tại`);

        for (let i = 0; i < data.usersArr.length; i++) {
            const personExists = await Person.findById(data.usersArr[i]);
            if (!personExists) {
                throw new Error(`Person ID ${data.usersArr[i]} không tồn tại`);
            }
            myTask.personInfo.push(data.usersArr[i]);

        }
        await myTask.save();
        return myTask;
    }

    // Thêm project vào trong task
    if (data.type === "ADD-PROJECT") {
        let myTask = await Task.findById(data.taskId);
        if (!myTask) throw new Error(`Task ID ${data.taskId} không tồn tại`);

        for (let i = 0; i < data.projectId.length; i++) {
            const projectExists = await Project.findById(data.projectId[i]);
            if (!projectExists) {
                throw new Error(`Project ID ${data.projectId[i]} không tồn tại`);
            }
            myTask.projectInfo.push(data.projectId[i]);
            await Project.findByIdAndUpdate(data.projectId[i], {
                $addToSet: { task: data.taskId } // $addToSet giúp tự động chống trùng lặp taskId
            }); // Để project biết về task
        }
        await myTask.save();
        return myTask;
    }

    return null;
}
const getAllTaskService = async (data) => {
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
    const [tasks, totalTasks] = await Promise.all([
        Task.find(query).skip(skip).limit(limit)
            .populate('personInfo')   // lấy đủ thông tin người dùng
            .populate('projectInfo') // lấy đủ thông tin project
            .lean(),
        Task.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalTasks / limit);

    // 4. Trả về kết quả cho Controller
    return {
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalTasks,
            totalPages: totalPages
        },
        data: tasks
    };
}

const updateTaskService = async (id, data) => {
    const updateTask = await Task.findByIdAndUpdate(id, data, { new: true });
    return updateTask;
}
const deleteTaskService = async (id) => {
    const deleteTask = await Task.findByIdAndUpdate(
        id,
        { isDeleted: true, deletedAt: new Date() },
        { new: true }
    );
    return deleteTask;
}

export {
    postTaskService,
    getAllTaskService,
    updateTaskService,
    deleteTaskService
}
