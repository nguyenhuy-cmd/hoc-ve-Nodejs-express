import mongoose from 'mongoose';
const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String },
    image: { type: String },

    // Bạn đã tự khai báo ở đây rồi: xóa mềm
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }

},
    { timestamps: true } // ngày bắt đầu và kết thúc
);


const Customer = mongoose.model('Customer', customerSchema);

export default Customer;