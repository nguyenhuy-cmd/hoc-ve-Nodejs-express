import mongoose from "mongoose";
import Project from "../models/project.model.js";
import Person from "../models/person.model.js";
import { postProjectService, getAllProjectService, updateProjectService, deleteProjectService } from "../services/projectService.js";
const postProject = async (req, res) => {
    try {
        let result = await postProjectService(req.body);
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

const getAllProject = async (req, res) => {
    try {
        let result = await getAllProjectService(req.query);
        return res.status(200).json({
            errorCode: 0,
            message: 'Thành công',
            data: result
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Lỗi server: ${err.message}`
        })
    }
}

const updateAllProject = async (req, res) => {
    try {
        const { id } = req.params;
        let result = await updateProjectService(id, req.body);
        return res.status(200).json({
            errorCode: 0,
            message: 'Thành công',
            data: result
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Lỗi server: ${err.message}`
        })
    }
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;
        let result = await deleteProjectService(id);
        return res.status(200).json({
            errorCode: 0,
            message: 'Thành công',
            data: result
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
    updateAllProject,
    deleteProject
}
