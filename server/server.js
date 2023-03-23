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
var Supply = require('./supplies.js');
const supplies = require('./supplies.js');

app.use(express.static(path.join(__dirname, '..', 'lists', 'build')));

app.use(bodyPArser.json());

app.use('/animalData', async (req, res) => {
  try {
    console.log("In /animalData");
    // Get the species
    var species = await database.collection('species').find({}, { projection: { _id: 0, name: 1 } }).toArray();
    // set our base data object
    var data = { lists: Array(species.length), items: Object() };
    for (let index = 0; index < species.length; index++) {
      // Set the list name
      data.lists[index] = species[index].name;
      // Get the items for the list

      let animals = await database.collection('animals').find({ species: species[index].name }, { projection: { _id: 0, name: 1 } }).toArray();
      let breeds = await database.collection('animals').find({ species: species[index].name }, { projection: { _id: 0, breed: 1 } }).toArray();
      let ages = await database.collection('animals').find({ species: species[index].name }, { projection: { _id: 0, age: 1 } }).toArray();
      let genders = await database.collection('animals').find({ species: species[index].name }, { projection: { _id: 0, gender: 1 } }).toArray();
      let imageURLs = await database.collection('animals').find({ species: species[index].name }, { projection: { _id: 0, imageURL: 1 } }).toArray();
      let prices = await database.collection('animals').find({ species: species[index].name }, { projection: { _id: 0, price: 1 } }).toArray();
      let animalAges = Array(animals.length);
      let animalNames = Array(animals.length);
      let animalBreeds = Array(animals.length);
      let animalGenders = Array(animals.length);
      let animalImageURLs = Array(animals.length);
      let animalPrices = Array(animals.length);
      for (let i = 0; i < animals.length; i++) {
        animalNames[i] = animals[i].name;
        animalBreeds[i] = breeds[i].breed;
        animalAges[i] = ages[i].age;
        animalGenders[i] = genders[i].gender;
        animalImageURLs[i] = imageURLs[i].imageURL;
        animalPrices[i] = prices[i].price;
      }
      // set the items for the list
      data.items[species[index].name] = {
        animalNames,
        animalBreeds,
        animalAges,
        animalGenders,
        animalImageURLs,
        animalPrices
      };
      // data.items[species[index].name] = {animalNames, animalBreeds};
    }
  } catch (err) {
    console.log("Error occurred loading admin data");
  }
  res.json(data);
});

app.use('/merchandiseData', async (req, res) => {
  let data = []; // array of objects
  try {
    console.log("In /merchandiseData");
    // Get the merchandise
        // Get the animals
        // get the supplies
        var supplies = await database.collection('supplies').find({}).toArray();
        // combine the two
        for (let index = 0; index < supplies.length; index++) { // create our catalog data
          data[index] = {
            name: supplies[index].name,
            price: supplies[index].price ? supplies[index].price : 0,
            type: supplies[index].age ? "animal" : "supply",
            imageURL: supplies[index].imageURL,
          };
        }
      } catch (err) {
        console.log("Error occurred loading catalog data");
      }
      // send the data
      res.json(data);
    });





    app.use('/catalogData', async (req, res) => {
      try {
        console.log("In /catalogData");
        // Get the animals
        var animals = await database.collection('animals').find({}).toArray();
        // get the supplies
        var supplies = await database.collection('supplies').find({}).toArray();
        // combine the two
        var combo = animals.concat(supplies);

        var data = []; // array of objects
        for (let index = 0; index < combo.length; index++) { // create our catalog data
          data[index] = {
            name: combo[index].name,
            price: combo[index].price ? combo[index].price : 0,
            type: combo[index].age ? "animal" : "supply",
            imageURL: combo[index].imageURL,
            species: combo[index].species ? combo[index].species : '-',
            breed: combo[index].breed ? combo[index].breed : '-',
            age: combo[index].age ? combo[index].age : '-',
            gender: combo[index].gender ? combo[index].gender : '-',
          };
        }
      } catch (err) {
        console.log("Error occurred loading catalog data");
      }
      // send the data
      res.json(data);
    });

    app.use('/addItem', async (req, res) => {
      console.log("In /AddItem");
      console.log("##################################################");
      console.log(req.body);
      console.log("##################################################");
      const { listName, itemName, petName, imageURL, breed, age, gender, price } = req.body;
      try {
        var Pip = new Animal({ name: itemName, species: listName, name: petName, breed: breed, imageURL: imageURL, age: age, gender: gender, price: price });
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

    app.use('/addSuplies', async (req, res) => {
      console.log("In /AddSuplies");
      console.log("##################################################");
      console.log(req.body);
      console.log("##################################################");
      const { name, imageURL, price } = req.body;
      try {
        var SuppliesItem = new supplies({ name: name, imageURL: imageURL, price: price });
        await SuppliesItem.save();
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

    app.delete('/api/items/:name', (req, res) => {
      const name = req.params.name;
      console.log("In delete item");
      deleteAnimal(name);
    });

    app.delete('/api/supplies/:name', (req, res) => {
      console.log("In delete supplies 1");
      const name = req.params.name;
      console.log("In delete item");
      deleteSupplies(name);
    });

    async function deleteAnimal(animalName) {
      try {
        const database = client.db(dbName);
        const result = await database.collection('animals').deleteOne({ name: animalName });
        console.log(`${result.deletedCount} document(s) deleted.`);
      } catch (err) {
        console.log("Error occurred while deleting animal", err);
      }
    }

    async function deleteSupplies(suppliesItem) {
      console.log("In delete supplies 2");
      try {
        const database = client.db(dbName);
        const result = await database.collection('supplies').deleteOne({ name: suppliesItem });
        console.log(`${result.deletedCount} document(s) deleted.`);
      } catch (err) {
        console.log("Error occurred while deleting animal", err);
      }
    }


    app.use('*', function (req, res) {
      res.sendFile(path.join(__dirname, '..', 'lists', 'build', 'index.html'));
    });

    app.listen(3000, async () => {
      console.log('Listening on port 3000');
      await client.connect();
    });



