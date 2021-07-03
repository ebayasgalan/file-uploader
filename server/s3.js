const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

const bucketName = process.env.AWS_BUCKET_NAME;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const region = process.env.AWS_BUCKET_REGION;

const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

// upload a file to s3 
function uploadFile(file) {
  const fileStream = fs.createReadStream(file.path)

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename
  }
  const command = new PutObjectCommand(uploadParams);
  return s3.send(command)
}

// download a file from s3 

function getFileStream(Key) {
  const downloadParams = {
    Key,
    Bucket: bucketName
  }
  const command = new GetObjectCommand(downloadParams);
  return s3.send(command);
}

module.exports = {
  uploadFile,
  getFileStream
}