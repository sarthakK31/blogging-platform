import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  genre: { type: String, required: true },//this is so that blogs can be displayed acoording to preferences
  // Add more fields as needed
});

const Post = mongoose.model('Post', postSchema);

export default Post;