var mongoose = require('mongoose');
const uri = "mongodb+srv://dbuser:MangoDeezBees@databaseone.ayfgx0w.mongodb.net/Petstore?retryWrites=true&w=majority";

mongoose.connect(uri);

// Inspration from: https://github.com/fsojitra/Registration-Login-and-CRUD-Action-using-MERN-stack/blob/master/backend/model/user.js
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
})

module.exports = mongoose.model('User', userSchema);