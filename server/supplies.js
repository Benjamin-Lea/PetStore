var mongoose = require('mongoose');
const uri = "mongodb+srv://dbuser:MangoDeezBees@databaseone.ayfgx0w.mongodb.net/Petstore?retryWrites=true&w=majority";

mongoose.connect(uri);

var suppliesSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true, default: 0, min: 0},
    imageURL: { type: String, required: true, default: "https://static.wikia.nocookie.net/bindingofisaac/images/e/ee/Breakfast_%28item%29.png/revision/latest?cb=20200916132229&path-prefix=it" }
    });

module.exports = mongoose.model('Supplie', suppliesSchema);