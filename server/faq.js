var mongoose = require('mongoose');
const uri = "mongodb+srv://dbuser:MangoDeezBees@databaseone.ayfgx0w.mongodb.net/Petstore?retryWrites=true&w=majority";

mongoose.connect(uri);

var faqSchema = new mongoose.Schema({
    question: { type: String, required: true, unique: true },
    answer: { type: String, required: false, default: "No answer provided"}
    });

module.exports = mongoose.model('faq', faqSchema);