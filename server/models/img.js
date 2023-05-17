const mongoose = require('mongoose');

// Define the schema for the image table
const imageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageFileName: {
    type: String,
    required: true
  },
  cloudinaryUrl: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Image model using the imageSchema
const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
