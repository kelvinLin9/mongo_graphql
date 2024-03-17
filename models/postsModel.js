const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  kind: String, // 可能需要根據具體需求進行調整，例如使用枚舉
  tags: [String],
  likes: Number,
  content: {
    media: {
      title: String,
      url: String,
    },
    image: {
      _9_16: [String],
      _16_9: [String],
      _1_1: [String],
    },
    host: {
      name: String,
      url: String,
    },
    channel: String,
  },
  createdAt: String,
  updatedAt: String,
});

const Post = mongoose.model('Post', postSchema);
































// const mongoose = require('mongoose');

// const mediaSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   url: String, 
// });

// const imageSchema = new mongoose.Schema({
//   "9_16": [String],
//   "16_9": [String],
//   "1_1": [String],
// });

// const hostSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   url: String,
// });

// const contentSchema = new mongoose.Schema({
//   media: mediaSchema,
//   image: imageSchema,
//   host: hostSchema,
//   channel: String, 
// });

// const postSchema = new mongoose.Schema({
//   kind: {
//     type: String,
//     required: true,
//     enum: ['stream', 'podcast', 'short', 'photos', 'livetv', 'liveview'],
//   },
//   tags: [String],
//   likes: {
//     type: Number,
//     default: 0,
//   },
//   content: contentSchema,
// }, {
//   timestamps: true,
//   versionKey: false,
// });

// const Post = mongoose.model('Post', postSchema);

// module.exports = Post;
