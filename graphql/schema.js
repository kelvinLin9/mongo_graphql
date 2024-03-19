const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = require('graphql');
const Story = require('../models/storyModel');
const Brick = require('../models/brickModel');

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    content: { type: GraphQLString }, // 假設 Post 有標題和內容
    image: { type: GraphQLString }, // 假設 Post 包含一個圖片鏈接
  })
});

const BrickType = new GraphQLObjectType({
  name: 'Brick',
  fields: () => ({
    id: { type: GraphQLID },
    brickName: { type: GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLNonNull(GraphQLString) },
    // 假設 PostType 已定義，這裡示範如何關聯 Post
    content: {
      type: new GraphQLList(PostType),
      resolve(parent, args) {
        // 根據 Brick 文檔中的 content ID 陣列查詢關聯的 Post 文檔
        // 需要實現 PostType 和相應的 Mongoose 查詢
      },
    },
  }),
});

const StoryType = new GraphQLObjectType({
  name: 'Story',
  fields: () => ({
    id: { type: GraphQLID },
    storyName: { type: GraphQLNonNull(GraphQLString) },
    title: { type: GraphQLString },
    image: { type: GraphQLString },
    content: {
      type: new GraphQLList(BrickType),
      resolve(parent, args) {
        // 在這裡實現查詢透過 Story 文檔中的 content 關聯的 Brick 文檔
        return Brick.find({_id: { $in: parent.content }});
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    stories: {
      type: new GraphQLList(StoryType),
      args: {
        storyName: { type: GraphQLString } // 允許查詢時使用 storyName 作為過濾條件
      },
      resolve(parent, args) {
        // 如果提供了 storyName，則按照 storyName 過濾；否則，返回所有故事
        if (args.storyName) {
          return Story.find({ storyName: args.storyName });
        } else {
          return Story.find({});
        }
      }
    },
    // 其他查詢...
  }
});


module.exports = new GraphQLSchema({
  query: RootQuery,
});