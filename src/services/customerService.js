import Customer from '../models/customers.model.js'

const postCustomerService = async (customerData) => {
    try {
        const customer = await Customer.create(customerData);
        return customer;
    } catch (err) {
        throw err;
    }
}
const getAllCustomerService = async (queryParams = {}) => {
    // 1. Lấy tham số từ query
    const page = parseInt(queryParams.page) || 1;
    const limit = parseInt(queryParams.limit) || 10;
    const keyword = queryParams.keyword || '';

    const skip = (page - 1) * limit;

    // 2. Xây dựng điều kiện tìm kiếm
    let query = { isDeleted: false };// Luôn luôn không tìm kiếm đc những cái đã xóa mềm
    if (keyword) { 
        query.$or = [
            { name: { $regex: keyword, $options: 'i' } },
            { phone: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } }
        ];
    }

    // 3. Truy vấn database
    const [customers, totalCustomers] = await Promise.all([
        Customer.find(query).skip(skip).limit(limit).lean(),
        Customer.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalCustomers / limit);

    // 4. Trả về kết quả cho Controller
    return {
        pagination: {
            currentPage: page,
            limit: limit,
            totalItems: totalCustomers,
            totalPages: totalPages
        },
        data: customers
    };
}

const postCustomersService = async (customers) => {
    try {
        let result = await Customer.insertMany(customers)
        return result;
    } catch (err) {
        throw err;
    }
}
const updateCustomerService = async (id, data) => {
    try {
        const update = await Customer.findByIdAndUpdate(id, data)
        return update
    } catch (err) {
        throw err
    }
}
const deleteCustomerService = async (id) => {
    try {
        const deletedCustomer = await Customer.findByIdAndUpdate(id, { isDeleted: true, deletedAt: new Date() }, { new: true });
        return deletedCustomer;
    } catch (err) {
        throw err
    }
}
const deleteCustomerArrayService = async (id) => {
    try {
        const deletedCustomer = await Customer.updateMany({ _id: { $in: id } },
            { $set: { isDeleted: true, deletedAt: new Date() } }, { new: true });
        return deletedCustomer;
    } catch (err) {
        throw err
    }
}
export {
    postCustomerService,
    getAllCustomerService,
    postCustomersService,
    updateCustomerService,
    deleteCustomerService,
    deleteCustomerArrayService
}