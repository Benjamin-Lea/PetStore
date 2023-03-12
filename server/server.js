var express = require('express');
var app = express();
const path = require('path')

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://dbuser:MangoDeezBees@databaseone.ayfgx0w.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const dbName = "Petstore";
const collectionName = "lists";

const database = client.db(dbName);
const collection = database.collection(collectionName);

app.use(express.static(path.join(__dirname, '..', 'lists', 'build')));

app.use('/adminData', async (req, res) => {
  try {
    await client.connect();
    var cursor = await collection.find({}, { projection: { _id: 0, list: 1, items: 1 } });
    var index = 0;
    var ray = await cursor.toArray();
    var data = {lists: Array(ray.length), items: Object()};
    ray.forEach(obj => {
      data.lists[index] = obj.list;
      data.items[obj.list] = obj.items;
      index += 1;
    });
  } catch (err) {
    console.log("Sumn is not right");
  } finally {
    await client.close();
  }
  res.json(data);
});


app.use('*', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'lists', 'build', 'index.html'));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});


