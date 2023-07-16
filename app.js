const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const ejs = require('ejs');
const photoController = require('./controllers/photoController')
const pageController = require('./controllers/pageController')

const app = express();

//Connect DB
mongoose
  .connect('mongodb://127.0.0.1:27017/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB Connected Successfuly');
  })
  .catch((err) => console.log(err));

//Template Engine
app.set('view engine', 'ejs');

//Middleware
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods:['POST','GET']
}))

//Routes
app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto)

app.get('/about', pageController.getAboutPage);
app.get('/add',pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage)



  

app.listen(3000, () => {
  console.log('Server is started');
});
