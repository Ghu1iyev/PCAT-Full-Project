const express = require('express');
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose')
const Photo = require('./models/Photo')
const app = express();

//Connect DB
mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('DB Connected Successfuly');
}).catch(err => console.log(err))

//Template Engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Routes
app.get('/', async(req, res) => {
    const photos = await Photo.find({})
  res.render('index',{
    photos
  });
});

app.get('/about', (req,res) => {
    res.render('about')
})

app.get('/add', (req,res) => {
    res.render('add')
})

app.post('/photos',async (req,res) => {
   await Photo.create(req.body)
    res.redirect('/')
})

app.listen(3000, () => {
  console.log('Server is started');
});
