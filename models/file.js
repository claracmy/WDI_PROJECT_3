const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
}, {
  timestamps: true
});

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  html: { type: String },
  audio: { type: String },
  comments: [ commentSchema ]
}, {
  timestamps: true
});

module.exports = mongoose.model('File', fileSchema);
