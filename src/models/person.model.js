import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String },
  
  // Bạn đã tự khai báo ở đây rồi: xóa mềm
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
});

const Person = mongoose.model('Person', personSchema);

export default Person;
