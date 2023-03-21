var mongoose = require('mongoose');
const uri = "mongodb+srv://dbuser:MangoDeezBees@databaseone.ayfgx0w.mongodb.net/Petstore?retryWrites=true&w=majority";

mongoose.connect(uri);

var speciesSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true }
    });

module.exports = mongoose.model('Specie', speciesSchema);