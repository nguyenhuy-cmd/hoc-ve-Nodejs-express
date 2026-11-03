import Joi from 'joi';

// 1. Định nghĩa schema kiểm tra dữ liệu cho Customer
const customerSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({
        'string.base': 'Tên phải là một chuỗi ký tự',
        'string.empty': 'Tên khách hàng không được để trống',
        'string.min': 'Tên khách hàng phải có ít nhất {#limit} ký tự',
        'string.max': 'Tên khách hàng không được quá {#limit} ký tự',
        'any.required': 'Tên khách hàng là bắt buộc'
    }),
    address: Joi.string().required().messages({
        'string.empty': 'Địa chỉ không được để trống',
        'any.required': 'Địa chỉ là bắt buộc'
    }),
    phone: Joi.string().pattern(/^[0-9]{10,11}$/).required().messages({
        'string.pattern.base': 'Số điện thoại phải từ 10 - 11 chữ số',
        'string.empty': 'Số điện thoại không được để trống',
        'any.required': 'Số điện thoại là bắt buộc'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email không đúng định dạng',
        'string.empty': 'Email không được để trống',
        'any.required': 'Email là bắt buộc'
    }),
    description: Joi.string().allow('', null),
    image: Joi.string().allow('', null)
});

// 2. Middleware kiểm tra dữ liệu trước khi gửi sang Controller
const validateCustomer = async (req, res, next) => {
    try {
        // abortEarly: false giúp bắt và thông báo tất cả các lỗi cùng một lúc
        await customerSchema.validateAsync(req.body, { abortEarly: false });
        next(); // Nếu hợp lệ thì đi tiếp sang controller
    } catch (error) {
        return res.status(400).json({
            errorCode: 1,
            message: 'Dữ liệu không hợp lệ',
            details: error.details ? error.details.map(err => err.message) : error.message
        });
    }
};

export {
    validateCustomer
};

