const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const ejs = require('ejs');
const path = require('path');
const fs = require('fs')
const Photo = require('./models/Photo');

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
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos,
  });
});

app.post('/photos', async (req, res) => {
    const uploadDir = 'public/uploads';
    if(!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir)
    }

    let uploadImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadImage.name

    uploadImage.mv(uploadPath, 
        async () => {
            await Photo.create({
                ...req.body,
                image: '/uploads/' + uploadImage.name
            })
            res.redirect('/')
        }
    )
    
});

app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});

app.get('/photos/edit/:id', async(req,res) => {
    const photo = await Photo.findOne({_id: req.params.id})
    res.render('edit', {
        photo
    })
})

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/add', (req, res) => {
  res.render('add');
});

app.put('/photos/:id', async(req, res) => {
    const photo = await Photo.findOne({_id: req.params.id})
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save()

    res.redirect(`/photos/${req.params.id}`)
  });
  
app.delete('/photos/:id', async(req,res) => {
    const photo = await Photo.findOne({_id: req.params.id})
    let deletedImage = __dirname + '/public' + photo.image;
    fs.unlinkSync(deletedImage)
    await Photo.findByIdAndRemove(req.params.id)
    res.redirect('/')
})

app.listen(3000, () => {
  console.log('Server is started');
});
