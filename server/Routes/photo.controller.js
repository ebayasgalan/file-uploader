const express = require('express');
const router = express.Router();
const multer = require('multer');
const multers3 = require('multer-s3');
const path = require('path');
const fs = require('fs');

const { Photo } = require('../Models/photo.js')
const {uploadFile, getFileStream, s3} = require('../s3');
const bucket = process.env.AWS_BUCKET_NAME;

// setup multer storage 
const storage = multers3({
  s3,
  bucket,
  metadata: function(req, file, cb) {
    cb(null, {fieldName: file.fieldname});
  },
  key: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
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

// initialize multer with storage and filters

router.get('/', async (req, res, next) => {
  try {
    const photos = await Photo.find();
    res.status(200).send(photos);
    next()
  } catch(err) {
    res.status(400).send(err);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const photo = await Photo.findById(id);
    res.status(200).send(photo)
  } catch (err) {
    console.log('err: ', err);
  }
});

router.patch('/:id', upload.single('image'), async (req, res) => {
  const { id } = req.params;
  // const updateObject = {
  //   url: `uploads/${req.file.filename}`,
  //   name: req.body.name,
  //   description: req.body.description,
  //   favorite: req.body.favorite,
  //   updated_at: Date.now()
  // }
  try {
    // update database 
    const photo = await Photo.findByIdAndUpdate(id, updateObject);
    res.status(200).send('updated!');
  } catch (err) {
    console.log('err: ', err);
  }
});

router.post('/', upload.single('image'), async (req, res) => {
  // const file = req.file;
  console.log('req.file: ', req.file);
  console.log('req.body: ', req.body);
  // setup url for the database 
  // const newPhoto = new Photo({
  //   url: `uploads/${file.filename}`,
  //   name: req.body.name,
  //   description: req.body.description,
  //   favorite: req.body.favorite
  // })
  try {
    // save to database 
    // await newPhoto.save();
    res.status(201).send('from post request');
  } catch(err) {
    console.log('error: ', err);
  }
});

router.delete('/:id', async (req, res) => {
  const {id} = req.params;
  try {
    // delete from database 
    const deleted = await Photo.findByIdAndDelete(id);
    res.status(200).send('deleted!');
  } catch(err) {
    res.status(400).send(err);
  }
})

module.exports = router;