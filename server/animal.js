
var mongoose = require('mongoose');
const uri = "mongodb+srv://dbuser:MangoDeezBees@databaseone.ayfgx0w.mongodb.net/Petstore?retryWrites=true&w=majority";

mongoose.connect(uri);

var animalSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    species: { type: String, required: true },
    price: { type: Number, required: true, default: 0, min: 0},
    breed: String,
    gender: { type: String, enum: ['male', 'female'] },
    traits: [String],
    age: Number,
    imageURL: String
  });

  module.exports = mongoose.model('Animal', animalSchema);