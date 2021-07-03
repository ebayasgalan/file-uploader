const express = require('express');
const router = express.Router();
const multer = require('multer');
const multers3 = require('multer');
const path = require('path');

const { Photo } = require('../Models/photo.js')
const {uploadFile, getFileStream} = require('../s3');

const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const checkFileType = (file, cb) => {
  // allowed extensions 
  const filetypes = /jpeg|jpg|png|gif/;
  // check ext 
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // check mime 
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error('Images only!'));
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }});

router.get('/', async (req, res, next) => {
  const samplePhotos = ['https://hack-reactor-images.s3.us-west-1.amazonaws.com/people/person-0.jpg', '../uploads/image-1625338950195.png'];
  try {
    const photos = await Photo.find();
    res.status(200).send(photos);
    next()
  } catch(err) {
    res.status(400).send(err);
  }
});

router.get('/:key', async (req, res) => {
  const { key } = req.params;
  const readStream = getFileStream(key);
  console.log('key: ', readStream);
  // readStream.pipe(key);
  try {
    res.send(readStream)
  } catch (err) {
    console.log('err: ', err);
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  const file = req.file;
  const newPhoto = new Photo({
    url: `uploads/${file.filename}`,
    name: req.body.name,
    description: req.body.description,
    favorite: req.body.favorite
  })
  try {
    await newPhoto.save();
    // const result = await uploadFile(file);
    // console.log('result from upload request: ', result);
    res.send('file saved to MongoDB');
  } catch(err) {
    console.log('error: ', err);
  }
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const deleted = await Photo.findByIdAndDelete(id);
    res.status(200).send('deleted!');
  } catch(err) {
    console.log('err: ', err);
  }
})

module.exports = router;