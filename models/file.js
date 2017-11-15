const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

const likeSchema = new mongoose.Schema({
  likedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  html: { type: String },
  audio: { type: String },
  comments: [ commentSchema ],
  likes: [ likeSchema ]
}, {
  timestamps: true
});

module.exports = mongoose.model('File', fileSchema);
