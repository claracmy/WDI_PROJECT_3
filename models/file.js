const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
}, {
  timestamps: true
});

fileSchema.methods.belongsTo = function fileBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};


module.exports = mongoose.model('File', fileSchema);
