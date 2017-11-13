const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  file: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  html: { type: String }
}, {
  timestamps: true
});

fileSchema.methods.belongsTo = function fileBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};


module.exports = mongoose.model('File', fileSchema);
