import { postTaskService, getAllTaskService, updateTaskService, deleteTaskService } from '../services/taskService.js'

const postTask = async (req, res) => {
    try {
        let result = await postTaskService(req.body);
        return res.status(200).json({
            errorCode: 0,
            message: 'Thành công',
            data: result
        })
    }
    catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Lỗi server: ${err.message}`
        })
    }
}

const GetAllTask = async (req, res) => {
    try {
        let result = await getAllTaskService(req.query);
        return res.status(200).json({
            errorCode: 0,
            message: 'Thành công',
            data: result
        })
    }
    catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Lỗi server: ${err.message}`
        })
    }
};

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        let result = await updateTaskService(id, req.body);
        return res.status(200).json({
            errorCode: 0,
            message: 'Thành công',
            data: result
        })
    }
    catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Lỗi server: ${err.message}`
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        let result = await deleteTaskService(id);
        return res.status(200).json({
            errorCode: 0,
            message: 'Thành công',
            data: result
        })
    }
    catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Lỗi server: ${err.message}`
        })
    }
}

export {
    postTask,
    GetAllTask,
    updateTask,
    deleteTask
}
