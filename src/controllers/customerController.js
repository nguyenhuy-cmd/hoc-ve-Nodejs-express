import { postCustomerService, getAllCustomerService, postCustomersService, updateCustomerService, deleteCustomerService,deleteCustomerArrayService } from '../services/customerService.js';
import { uploadFileServer } from '../services/apiService.js';

const postCustomer = async (req, res) => {
    try {
        let { name, address, phone, email, description, image } = req.body
        if (!name || !address || !phone || !email) {
            throw new Error('Bạn không được bỏ trống')
        }

        // image:
        // 1. Kiểm tra xem có file nào được gửi lên không
        let imageUrl = "";
        if (!req.files || Object.keys(req.files).length === 0) {

        } else {
            const result = await uploadFileServer(req.files);
            imageUrl = result?.[0]?.fileUrl || '';

        }

        let customerData = { name, address, phone, email, description, image: imageUrl }
        let customer = await postCustomerService(customerData)
        return res.status(200).json({
            errorCode: 0,
            message: 'Thêm khách hàng thành công',
            data: customer
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Lỗi server: ${err.message}`
        })
    }
}

const getAllCustomer = async (req, res) => {
    try {
        let result = await getAllCustomerService(req.query);
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

const postCustomers = async (req, res) => {
    try {
        // 1. Lấy mảng customers từ req.body
        let customers = req.body.customers;

        // 2. Kiểm tra xem có gửi mảng lên không
        if (!customers || !Array.isArray(customers) || customers.length === 0) {
            throw new Error('Vui lòng gửi danh sách khách hàng dạng mảng');
        }


        let result = await postCustomersService(customers)
        return res.status(200).json({
            errorCode: 0,
            message: 'Thêm nhiều khách hàng thành công',
            data: result
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Lỗi server: ${err.message}`
        })
    }
}

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone, email, description, image } = req.body;
        if (!id) {
            return res.status(404).json({
                errorCode: 1,
                message: 'Id không đúng, vui lòng nhập lại sau'
            })
        }
        let result = await updateCustomerService(id, req.body);
        return res.status(200).json({
            errorCode: 0,
            message: 'ĐÃ cập nhập khách hàng thành công',
            data: result
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Lỗi server: ${err.message}`
        })
    }
}
const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                errorCode: 1,
                message: 'Id không đúng, vui lòng nhập lại sau'
            })
        }
        const customer = await deleteCustomerService(id);
        return res.status(200).json({
            errorCode: 0,
            message: 'Đã xóa mềm khách hàng thành công',
            data: customer
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
            message: `Lỗi server: ${err.message}`
        })
    }

}

const deleteArrayCustomer = async (req, res) => {
    try {
        const { ids } = req.body;
         if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                errorCode: 1,
                message: 'Vui lòng gửi mảng ids khách hàng cần xóa'
            });
        }
        const customer = await deleteCustomerArrayService(ids);
        return res.status(200).json({
            errorCode: 0,
            message: 'Đã xóa mềm khách hàng thành công',
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
    postCustomer,
    getAllCustomer,
    postCustomers,
    updateCustomer,
    deleteCustomer,
    deleteArrayCustomer
}