const express = require('express');
const router = express.Router();
const Story = require('../models/storyModel'); // 确保这个路径匹配你的Story模型文件位置

// 创建新的Story
router.post('/', async (req, res) => {
  try {
    const story = new Story(req.body);
    await story.save();
    res.status(201).send(story);
  } catch (error) {
    res.status(400).send(error);
  }
});

// 获取所有Story
router.get('/', async (req, res) => {
  try {
    const stories = await Story.find({}).populate('content'); // 假设你想填充关联的Brick数据
    res.status(200).send(stories);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 获取匹配特定storyName的Story
// 根据storyName获取Story
router.get('/:storyName', async (req, res) => {
  try {
    // 从路由参数中获取storyName
    const { storyName } = req.params;

    // 使用storyName进行查询
    const story = await Story.findOne({ storyName: storyName }).populate('content');
    if (!story) {
      // 如果没有找到匹配的文档，返回404
      return res.status(404).send({ message: "No story found with the given name" });
    }
    res.status(200).send(story);
  } catch (error) {
    res.status(500).send(error);
  }
});


// 根据ID获取单个Story
router.get('/:id', async (req, res) => {
  try {
    const story = await Story.findById(req.params.id).populate('content');
    if (!story) {
      return res.status(404).send();
    }
    res.status(200).send(story);
  } catch (error) {
    res.status(500).send(error);
  }
});

// 根据ID更新Story
router.patch('/:id', async (req, res) => {
  try {
    const story = await Story.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!story) {
      return res.status(404).send();
    }
    res.status(200).send(story);
  } catch (error) {
    res.status(400).send(error);
  }
});

// 根据ID删除Story
router.delete('/:id', async (req, res) => {
  try {
    const story = await Story.findByIdAndDelete(req.params.id);
    if (!story) {
      return res.status(404).send();
    }
    res.status(200).send({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;