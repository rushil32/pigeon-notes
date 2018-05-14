const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
  points: [String],
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Note', noteSchema);
