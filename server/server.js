var express = require('express');
var app = express();
const path = require('path')

app.use(express.static(path.join(__dirname, '..', 'lists', 'build')));

app.use('/adminData', (req, res) => {
    console.log('admin');
    const data = {
      lists: ['Cats', 'Dogs', 'Birds'],
      items: { 
        Cats: [{name: "Felidae"}, {name: "Garfiled"}, {name: "Cat in theHat"}],
        Dogs: [{name: "Snoopy"}, {name: "Lola"}, {name: "Sprinkles"}],
        Birds: [{name: "Tweety"}, {name: "Squawk"}, {name: "Chirp"}]}
    };
    res.json(data);
  });


app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, '..', 'lists', 'build', 'index.html'));
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
