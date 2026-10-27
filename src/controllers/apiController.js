
import { getAllUser, postUser, updateUser, deleteUser, uploadFileServer } from '../services/apiService.js';
const getAllUserApi = async (req, res) => {
    try {
        let result = await getAllUser(req.query);
        return res.status(200).json({
            errorCode: 0,
            message: 'Thành công',
            data: result
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: "Thất bại",
            message: `Lỗi server: ${err.message}`
        })
    }
}

const postUserApi = async (req, res) => {
    try {
        let { email, name, city } = req.body;
        if (!email || !name) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Vui lòng nhập đủ thông tin'
            })
        }
        let user = await postUser(req.body);
        return res.status(201).json({
            errorCode: 0,
            message: 'Thành công',
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: "Thất bại",
            message: `Lỗi server: ${err.message}`
        })
    }
}

const updateUserApi = async (req, res) => {
    try {
        let { id } = req.params;
        let { email, name, city } = req.body;
        if (!id) {
            return res.status(404).json({
                errorCode: 1,
                message: 'Id không đúng, vui lòng thử lại'
            })
        }
        let user = await updateUser(id, req.body);
        return res.status(200).json({
            errorCode: 0,
            message: 'Cập nhập thành công',
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: "Thất bại",
            message: `Lỗi server: ${err.message}`
        })
    }
}
const deleteUserApi = async (req, res) => {
    try {
        let { id } = req.params;
        if (!id) {
            return res.status(404).json({
                errorCode: 1,
                message: 'Id không đúng, vui lòng thử lại'
            })
        }
        let user = await deleteUser(id);
        return res.status(200).json({
            errorCode: 0,
            message: 'Xóa thành công',
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: "Thất bại",
            message: `Lỗi server: ${err.message}`
        })
    }
}

const postUploadFile = async (req, res) => {
    try {
        const result = await uploadFileServer(req.files)

        return res.status(200).json({
            errorCode: 0,
            message: `Upload thành công ${result.length} file`,
            count: result.length,
            data: result
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: "Upload thất bại",
            message: `Lỗi server: ${err.message}`
        })
    }

}

export {
    getAllUserApi,
    postUserApi,
    updateUserApi,
    deleteUserApi,
    postUploadFile
}