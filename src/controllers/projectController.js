import Project from "../models/project.model.js";
import { postProjectService, getAllProjectService, updateProjectService, deleteProjectService, deleteProjectArrayService } from "../services/projectService.js";
const postProject = async (req, res) => {
    try {
        const { name, startDate, endDate, description, customerInfo, personInfo, leader, task } = req.body;
        if (!name || !personInfo || personInfo.length === 0) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Hãy điền đầy đủ thông tin'
            })
        }

        // Check xem personid có rỗng không
        const objectIds = personInfo.map(id => {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return null;
            }
            return id;
        });
        
        if (objectIds.includes(null)) {
            return res.status(400).json({
                errorCode: 1,
                message: 'personInfo có ID không hợp lệ'
            });
        }

        const existingPersons = await Person.find({ _id: { $in: objectIds } });
        if (existingPersons.length !== objectIds.length) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Có ID person không tồn tại trong hệ thống'
            });
        }
        const project = await postProjectService(req.body);
        return res.status(200).json({
            errorCode: 0,
            message: 'Tạo project thành công',
            data: project
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Thất bại: lỗi server: ${err.message}`
        })
    }
}

const getAllProject = async (req, res) => {
    try {
        const projects = await getAllProjectService(req.query);
        return res.status(200).json({
            errorCode: 0,
            message: 'Thành công',
            data: projects
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Thất bại: lỗi server: ${err.message}`
        })
    }
}
const updateProject = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, startDate, endDate, description, customerInfo, personInfo, leader, task } = req.body;
        if (!id) {
            return res.status(404).json({
                errorCode: 1,
                message: 'Không tìm thấy id'
            })
        }
        const project = await updateProjectService(id, req.body);
        return res.status(200).json({
            errorCode: 0,
            message: 'Thành công',
            data: project
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Thất bại: lỗi server: ${err.message}`
        })
    }
}
const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                errorCode: 1,
                message: 'Không tìm thấy id'
            })
        }
        const project = await deleteProjectService(id);
        return res.status(200).json({
            errorCode: 0,
            message: 'Thành công',
            data: project
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Thất bại: lỗi server: ${err.message}`
        })
    }
}

const deleteArrayProject = async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Vui lòng gửi mảng ids khách hàng cần xóa'
            });
        }
        const customer = await deleteProjectArrayService(ids);
        return res.status(200).json({
            errorCode: 0,
            message: 'Đã xóa mềm nhiều dự án thành công',
            data: customer
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Lỗi server: ${err.message}`
        })
    }
}
export {
    postProject,
    getAllProject,
    updateProject,
    deleteProject,
    deleteArrayProject
}
