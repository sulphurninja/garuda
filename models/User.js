import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  root: {
    type: Boolean,
    default: false
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  approved: { type: Boolean, default: false },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
