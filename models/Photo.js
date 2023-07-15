const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
    title: String,
    description: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

const Photo = mongoose.model('Photo', PhotoSchema);

Photo.create({
    title: "Photo title 2",
    description: "Photo desc 2"
})


module.exports = Photo;

