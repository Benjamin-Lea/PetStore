var express = require('express');
var app = express();
const path = require('path')
const bodyPArser = require('body-parser');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbuser:MangoDeezBees@databaseone.ayfgx0w.mongodb.net/Petstore?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const dbName = "Petstore";
const database = client.db(dbName);

var mongoose = require('mongoose');
mongoose.connect(uri);

var Animal = require('./animal.js');
var Species = require('./species.js');

app.use(express.static(path.join(__dirname, '..', 'lists', 'build')));

app.use(bodyPArser.json());

app.use('/adminData', async (req, res) => {
  try {
    console.log("In /adminData");
    // Get the species
    var species = await database.collection('species').find({}, { projection: { _id: 0, name: 1 } }).toArray();
    // set our base data object
    var data = { lists: Array(species.length), items: Object() };
    for(let index = 0; index < species.length; index++) {
      // Set the list name
      data.lists[index] = species[index].name;
      // Get the items for the list

      let animals = await database.collection('animals').find({ species: species[index].name}, { projection: { _id: 0, name: 1 } }).toArray();
      let breeds = await database.collection('animals').find({ species: species[index].name}, { projection: { _id: 0, breed: 1 } }).toArray();  
      let ages = await database.collection('animals').find({ species: species[index].name}, { projection: { _id: 0, age: 1 } }).toArray();
      let genders = await database.collection('animals').find({ species: species[index].name}, { projection: { _id: 0, gender: 1 } }).toArray();
      let imageURLs = await database.collection('animals').find({ species: species[index].name}, { projection: { _id: 0, imageURL: 1 } }).toArray();
      let animalAges = Array(animals.length);
      let animalNames = Array(animals.length);
      let animalBreeds = Array(animals.length);
      let animalGenders = Array(animals.length);
      let animalImageURLs = Array(animals.length);
      for(let i = 0; i < animals.length; i++) {
        animalNames[i] = animals[i].name;
        animalBreeds[i] = breeds[i].breed;
        animalAges[i] = ages[i].age;
        animalGenders[i] = genders[i].gender;
        animalImageURLs[i] = imageURLs[i].imageURL;
      }
      // set the items for the list
      data.items[species[index].name] = {animalNames, animalBreeds, animalAges, animalGenders, animalImageURLs};
      // data.items[species[index].name] = {animalNames, animalBreeds};
    } 
  } catch (err) {
    console.log("Error occurred loading admin data");
  }
  res.json(data);
});

app.use('/addItem', async (req, res) => {
  console.log("In /AddItem");
  console.log(req.body);
  const { listName, itemName, petName, imageURL, breed, age } = req.body;
  try {
    var Pip = new Animal({ name: itemName, species: listName, name : petName, breed: breed, imageURL: imageURL, age: age});
    await Pip.save();
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      console.log("Duplicate entry");
    }
    else {
      console.log("Unknown error");
    }
  }
});

app.use('/addList', async (req, res) => {
  console.log("In AddList");
  const { listName } = req.body;
  try {
    var Pip = new Species({ name: listName });
    await Pip.save();
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      console.log("Duplicate entry");
    }
    else {
      console.log("Unknown error");
    }
  }
});


app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'lists', 'build', 'index.html'));
});

app.listen(3000, async () => {
  console.log('Listening on port 3000');
  await client.connect();
});



