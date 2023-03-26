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


// ######### User Authentication ######### // 
// Check if user is authorized for the pages which require authentication.
app.use("/", (req, res, next) => {
  try {
    if (req.path == "/authorized") {
      jwt.verify(req.headers.token, '__PetStoreKey__', function (err, decoded) {
        if (decoded.User == "admin") {
          res.json({ 
            message: 'User authorized!',
            status: true
          });
          next();
        } else {
          return res.status(401).json({
            errorMessage: 'User unauthorized!',
            status: false
          });
        }
      })
    } else {
      console.log("Path does not require authentication");
      next();
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
})

// ######### Login ######### // 
// Inspration from: https://github.com/fsojitra/Registration-Login-and-CRUD-Action-using-MERN-stack
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
app.use("/login", async (req, res) => {
  try {
    if (req.body && req.body.username && req.body.password) {
      database.collection('users').find({ name: req.body.username }).toArray().then(data => {
        if (data.length > 0) {
          if (bcrypt.compareSync(req.body.password, data[0].password)) {
            checkUserAndGenerateToken(data[0], req, res);
          } else {
            res.status(400).json({
              errorMessage: 'Username or password is incorrect!',
              status: false
            });
          }

        } else {
          res.status(400).json({
            errorMessage: 'Username or password is incorrect!',
            status: false
          });
        }
      })
    } else {
      res.status(400).json({
        errorMessage: 'Add proper parameter first!',
        status: false
      });
    }
  } catch (e) {
    res.status(400).json({
      errorMessage: 'Something went wrong!',
      status: false
    });
  }
});

// If user is authorized, generate a token for the user. Token is valid for 1 hour.
function checkUserAndGenerateToken(data, req, res) {
  jwt.sign({ User: data.name, id: data._id }, '__PetStoreKey__', { expiresIn: '1h' }, (err, token) => {
    if (err) {
      res.status(400).json({
        status: false,
        errorMessage: err,
      });
    } else {
      res.status(200).json({
        message: 'Login Successfully.',
        token: token,
        status: true
      });
    }
  });
}

// ######### Get Animal Data ######### //
app.use('/animalData', async (req, res) => {
  try {
    // Get the species
    var species = await database.collection('species').find({}, { projection: { _id: 0, name: 1 } }).toArray();
    // set our base data object
    var data = { lists: Array(species.length), pets: Object() };
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
      data.pets[species[index].name] = {
        animalNames,
        animalBreeds,
        animalAges,
        animalGenders,
        animalImageURLs,
        animalPrices
      };
    }
  } catch (err) {
    console.log("Error occurred loading admin data");
  }
  res.json(data);
});

// ######### Get Supplies Data ######### //
app.use('/suppliesData', async (req, res) => {
  let data = [];
  try {
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

// ######### Get Catalog Data ######### //
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

// ######### Add Specieses ######### //
app.use('/addList', async (req, res) => {
  console.log("In AddList");
  const { listName } = req.body;
  try {
    var Pip = new Species({ name: listName });
    await Pip.save();
  } catch (err) {
    if (err.code === 11000) {
      console.log("Duplicate entry");
    }
    else {
      console.log("Unknown error");
      console.log(err);
    }
  }
});

// ######### Add Pet Item ######### //
app.use('/addPet', async (req, res) => {
  const { listName, itemName, petName, imageURL, breed, age, gender, price } = req.body;
  try {
    var Pip = new Animal({ name: itemName, species: listName, name: petName, breed: breed, imageURL: imageURL, age: age, gender: gender, price: price });
    await Pip.save();
  } catch (err) {
    if (err.code === 11000) {
      console.log("Duplicate entry");
    }
    else {
      console.log("Unknown error");
      console.log(err);
    }
  }
});

// ######### Add Supplies Item ######### //
app.use('/addSuplies', async (req, res) => {
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

// ######### Delete Pet Item ######### //
app.delete('/api/pets/:name', (req, res) => {
  const name = req.params.name;
  deleteAnimal(name);
});

// ######### Delete Supplies Item ######### //
app.delete('/api/supplies/:name', (req, res) => {
  const name = req.params.name;
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



