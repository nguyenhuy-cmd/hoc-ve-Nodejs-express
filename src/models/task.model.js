import mongoose from 'mongoose';
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: String,
    status: String,
    startDate: String,
    endData: String,
    personInfo: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Person'
    }],
    productInfo: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Project'
    }],
    // Bạn đã tự khai báo ở đây rồi: xóa mềm
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }

},
    { timestamps: true } // ngày bắt đầu và kết thúc
);


const Task = mongoose.model('Task', taskSchema);

export default Task;