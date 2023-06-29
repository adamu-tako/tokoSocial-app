import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  slug: String,
  message: String,
  name: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: {
    type: [
      {
        like: String,
        likedBy: String,
      },
    ],
    default: [],
  },
  comments: {
    type: [
      {
        comment: String,
        creator: String,
        createdAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

var PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;