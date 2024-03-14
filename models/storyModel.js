const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  storyName: { 
    type: String,
    required: [true, 'storyName 未填寫']
  },
  title: { 
    type: String,
  },
  image: { 
    type: String,
  },
  content: [{ 
    type: mongoose.Schema.ObjectId,
    ref: "Brick",
    required: [true, 'ID 未填寫']
  }]
}, 
{ 
  timestamps: true,
  versionKey: false
});



const Story = mongoose.model('Story', storySchema);

module.exports = Story;


