const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String }, // Store phone numbers as strings
  image: { type: String }, // Assuming it's a URL or file path to an image
});

// Create the Users model
const userModel = mongoose.model('users1', userSchema);

// Export the model
module.exports = { userModel };