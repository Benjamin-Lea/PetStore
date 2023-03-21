var mongoose = require('mongoose');
const uri = "mongodb+srv://dbuser:MangoDeezBees@databaseone.ayfgx0w.mongodb.net/Petstore?retryWrites=true&w=majority";

mongoose.connect(uri);

var suppliesSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    Price: { type: Number, required: true },
    img: { type: String, required: true }
    });

module.exports = mongoose.model('Supplie', suppliesSchema);