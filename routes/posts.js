const Post = require('../models/postsModel');
const root = {
  posts: async () => {
    try {
      const posts = await Post.find();
      return posts;
    } catch (err) {
      throw new Error('Fetching posts failed');
    }
  },
  postById: async ({ id }) => {
    try {
      const post = await Post.findById(id);
      return post;
    } catch (err) {
      throw new Error('Fetching post by ID failed');
    }
  },
};






















// const express = require('express');
// const router = express.Router();
// const Post = require('../models/postsModel'); 

// // 创建新帖子
// router.post('/', async (req, res) => {
//   try {
//     const post = new Post(req.body);
//     await post.save();
//     res.status(201).send(post);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // 批量创建帖子
// router.post('/bulk', async (req, res) => {
//   try {
//     const posts = await Post.insertMany(req.body);
//     res.status(201).send(posts);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // 获取所有帖子
// router.get('/', async (req, res) => {
//   try {
//     const posts = await Post.find({});
//     res.status(200).send(posts);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // 根据ID获取单个帖子
// router.get('/:id', async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     if (!post) {
//       return res.status(404).send();
//     }
//     res.status(200).send(post);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// // 根据ID更新帖子
// router.patch('/:id', async (req, res) => {
//   try {
//     const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
//     if (!post) {
//       return res.status(404).send();
//     }
//     res.status(200).send(post);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// });

// // 根据ID删除帖子
// router.delete('/:id', async (req, res) => {
//   try {
//     const post = await Post.findByIdAndDelete(req.params.id);
//     if (!post) {
//       return res.status(404).send();
//     }
//     res.status(200).send({ message: "Post deleted successfully" });
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

// module.exports = router;
