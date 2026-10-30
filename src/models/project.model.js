import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startDate: String,
    endDate: String,
    description: String,
    customerInfo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        require: true
    }],
    personInfo: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Person',
        required: true
    }],
    leader: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Person',
        require: true
    }],
    task: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Task',
        require: true
    }],
    // Bạn đã tự khai báo ở đây rồi: xóa mềm
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }

},
    { timestamps: true } // ngày bắt đầu và kết thúc
);


const Project = mongoose.model('Project', projectSchema);

export default Project;