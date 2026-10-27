import Person from "../models/person.model.js";
import { fileURLToPath } from 'url';
import path from 'path';// cung cấp đường link tới thư mục, file

const getAllUser = async (queryParams = {}) => {
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
            { email: { $regex: keyword, $options: 'i' } }
        ];
    }

    // 3. Truy vấn database
    const [users, totalUsers] = await Promise.all([
        Person.find(query).skip(skip).limit(limit).lean(),
        Person.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalUsers / limit);

    // 4. Trả về kết quả cho Controller
    return {
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalUsers,
            totalPages: totalPages
        },
        data: users
    };
}
const postUser = async (data) => {
    const user = await Person.create(data)
    return user;
}
const updateUser = async (id, data) => {
    const user = await Person.findByIdAndUpdate(id, data, { new: true });
    return user;
}
const deleteUser = async (id) => {
    const user = await Person.findByIdAndDelete(id)
    return user;
}

// Lấy __dirname trong ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadFileServer = async (files) => {
    try {
        // 1. Kiểm tra xem có file nào được gửi lên không
        if (!files || Object.keys(files).length === 0) {
            throw new Error('Vui lòng chọn file cần upload!');
        }
        // 2. Lấy file từ trường 'image'
        let uploadedFiles = files.image || files.images;
        if (!uploadedFiles) {
            throw new Error("Không tìm thấy file trong trường 'image'!");
        }

        // 3.Ép kiểu về Mảng để code xử lý chung cho cả 1 lẫn nhiều ảnh
        if (!Array.isArray(uploadedFiles)) {
            uploadedFiles = [uploadedFiles];
        }
        const uploadResults = [];

        // 4. Vòng lặp duyệt qua từng file
        for (const file of uploadedFiles) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);// Chuỗi định danh 
            const extName = path.extname(file.name);// Tên ảnh
            const fileName = uniqueSuffix + extName;// Nối chuỗi: chuỗi định danh + tên ảnh

            const uploadPath = path.join(__dirname, '../public/imgs/', fileName);


            // 5. Lưu file bằng mv()
            await file.mv(uploadPath);

            // 6. Push kết quả vào mảng
            uploadResults.push({
                fileUrl: `/imgs/${fileName}`,
                fileName: file.name
            });
        }
        // Trả về mảng kết quả sau khi upload xong hết
        return uploadResults;
    } catch (err) {
        // Ném lỗi để tầng Controller bắt lại
        throw err;
    }
}

export {
    getAllUser,
    postUser,
    updateUser,
    deleteUser,
    uploadFileServer
}