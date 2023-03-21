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
      var animals = await database.collection('animals').find({ species: species[index].name }, { projection: { _id: 0, name: 1 } }).toArray();
      // create an object with all the names
      var animalNames = Array(animals.length);
      var animalIndex = 0;
      animals.forEach(animal => {
        animalNames[animalIndex] = animal.name;
        animalIndex = animalIndex + 1;
      });
      // set the items for the list
      data.items[species[index].name] = animalNames;
    }
  } catch (err) {
    console.log("Sumn is not right");
  }
  res.json(data);
});

app.use('/addItem', async (req, res) => {
  console.log("In /AddItem");
  const { listName, itemName } = req.body;
  try {
    var Pip = new Animal({ name: itemName, species: listName });
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



