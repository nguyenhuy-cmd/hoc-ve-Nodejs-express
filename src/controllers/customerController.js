import {postCustomerService} from '../services/customerService.js'
const postCustomer = async (req, res) => {
    try {
        let {name, address, phone, email, description, image} = req.body
        if(!name || !address || !phone || !email){
            throw new Error('Bạn không được bỏ trống')
        }
        let customer =  await postCustomerService(req.body)
        return res.status(200).json({
            errorCode: 0,
            message: 'Thêm khách hàng thành công',
            data: customer
        })
    } catch (err) {
        return res.status(500).json({
            errorCode: -1,
                message: "Thất bại",
                    message: `Lỗi server: ${err.message}`
        })
    }
}
export {
    postCustomer
}