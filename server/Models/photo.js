const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  url: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  name: String,
  description: String,
  favorite: Boolean
})

const Photo = mongoose.model('photos', PhotoSchema);

const url = 'mongodb://localhost/photo';

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, () => {console.log('mongoDB connected!')});

const db = mongoose.connection;

db.on('error', () => { console.log('Error connecting to mongoDB'); });


module.exports = {
  Photo
}