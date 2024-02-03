import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  preferences: { type: [String], default: [] }, // Array of genres the user is interested in
  // Add more fields as needed
});

const User = mongoose.model('User', userSchema);

export default User;
