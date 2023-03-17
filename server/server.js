var express = require('express');
var app = express();
const path = require('path')
const bodyPArser = require('body-parser');

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbuser:MangoDeezBees@databaseone.ayfgx0w.mongodb.net/Petstore?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const dbName = "Petstore";
const collectionName = "lists";

const database = client.db(dbName);
const collection = database.collection(collectionName);

var mongoose = require('mongoose');
mongoose.connect(uri);

var Animal = require('./animal.js');

app.use(express.static(path.join(__dirname, '..', 'lists', 'build')));

app.use(bodyPArser.json());

app.use('/adminData', async (req, res) => {
  try {
    var cursor = await collection.find({}, { projection: { _id: 0, list: 1, items: 1 } });
    var index = 0;
    var ray = await cursor.toArray();
    var data = { lists: Array(ray.length), items: Object() };
    ray.forEach(obj => {
      data.lists[index] = obj.list;
      data.items[obj.list] = obj.items;
      index += 1;

    });
  } catch (err) {
    console.log("Sumn is not right");
  }
  res.json(data);
});

app.use('/addItem', async (req, res) => {
  console.log("In AddItem");
  const { listName, itemName } = req.body;
  try {
    var Pip = new Animal({name: itemName, species: listName});
    await Pip.save();
  } catch (err) {
    console.log(err);
    if(err.code === 11000) {
      console.log("Duplicate entry");
    }
    else{
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



