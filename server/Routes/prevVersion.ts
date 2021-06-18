const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
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

  if (mimetype && extname) {
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
  }
}).single('image');

const { Photo } = require('../Models/photo.js')

router.get('/', async (req, res) => {
  try {
    // const photos = await Photo.find();
    res.status(200).send('photos');
  } catch (err) {
    res.status(400).send(err);
  }
});

const { uploadFile } = require('../s3');

router.post('/', (req, res) => {
  upload(req, res, err => {
    if (err instanceof multer.MulterError) {
      res.send(err.message)
      // A Multer error occurred when uploading.
    } else if (err) {
      res.send(err.message)
      // An unknown error occurred when uploading.
    } else {
      const file = req.file;
      console.log('req.body: ', req.body);
      console.log('req.file: ', req.file);
    }
  });
});

module.exports = router;