const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  email: String,
  firstName: String,
  lastName: String,
  image: String,
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note',
    default: [],
  }],
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
