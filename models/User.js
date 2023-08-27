import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  approved: {type: Boolean},
  role: {type: Boolean, default: false},
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
