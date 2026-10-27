import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }

},
    { timestamps: true } // ngày bắt đầu và kết thúc
);

const Customer = mongoose.model('Customer', customerSchema);

export default Customer;