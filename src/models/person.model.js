import mongoose from 'mongoose';

const personSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String },
});

const Person = mongoose.model('Person', personSchema);

export default Person;
