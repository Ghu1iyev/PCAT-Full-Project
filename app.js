const express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = express();

//Template Engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));

//Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req,res) => {
    res.render('about')
})

app.get('/add', (req,res) => {
    res.render('add')
})

app.listen(3000, () => {
  console.log('Server is started');
});
