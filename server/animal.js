
var mongoose = require('mongoose');
const uri = "mongodb+srv://dbuser:MangoDeezBees@databaseone.ayfgx0w.mongodb.net/Petstore?retryWrites=true&w=majority";

mongoose.connect(uri);

var animalSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    species: { type: String, required: true },
    breed: String,
    gender: { type: String, enum: ['male', 'female'] },
    traits: [String],
    age: Number
  });

  module.exports = mongoose.model('Animal', animalSchema);