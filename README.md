# PetStore
Modern Pet Store Website

## Setting up the server 
'cd server
npm install 
npm install mongo
node server.js'

## Rebuilding the server 
' cd server
node server.js'

## Building the react apps
' cd <desired app (list)> 
npm run build
'
## probably need to run this
'npm install react-router-dom --save'

# MONGOSH -- this is for database manipulation in the terminal outside of the app and is not necessary for app function.
Can use this to conenct and view the data in the db
From an elivated powershell - (choco is an admin tool that comes with node js but must be run with admin privledges)
'choco install mongodb-atlas'
https://www.mongodb.com/docs/mongodb-shell/install/#procedure
go to this link and get mongodbshell
connect to the db
'mongosh "mongodb+srv://databaseone.ayfgx0w.mongodb.net/myFirstDatabase" --apiVersion 1 --username dbuser'
password is: MangoDeezBees
## Once in the mongosh shell
'show dbs' shows the available databases
'use Petstore' selects the petstore db as the current db
'show collections' shows the collections of data in the petstore
'exit' ends the mongoshell connection
## Your current database is db
'db' you can use this command to see your working db
## to insert a document into the lists collection in the petstore we simply
db.lists.insertOne({name: "Snowy", type: "dog"})
## to view a collection 
db.lists.find()
## can query with the find and select based on type for example
db.lists.find().sort({type: -1})

# TODO
when add item add the item to the database
when add list add list to the database

# Key
bz9JPLHmSFPaG149a5m45f6fQ6zfQG6kwcIWpl0K6I7sXr8Jq3CjPhpAhylci1Cs
# Example
var axios = require('axios');
var data = JSON.stringify({
    "collection": "lists",
    "database": "Petstore",
    "dataSource": "DatabaseOne",
    "projection": {
        "_id": 1
    }
});
            
var config = {
    method: 'post',
    url: 'https://us-east-2.aws.data.mongodb-api.com/app/data-olmhn/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'bz9JPLHmSFPaG149a5m45f6fQ6zfQG6kwcIWpl0K6I7sXr8Jq3CjPhpAhylci1Cs',
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });

# URL endpoint
https://us-east-2.aws.data.mongodb-api.com/app/data-olmhn/endpoint/data/v1
