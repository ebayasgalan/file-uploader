const aws = require('aws-sdk');

const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;
const region = process.env.AWS_BUCKET_REGION;

const s3 = new aws.S3({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey
  }
})

const deleteFile = async (key, bucket) => {
  const params = {
    Key: key,
    Bucket: bucket
  }
  s3.deleteObject(params, (err, data) => {
    if(err) console.log("err: ", err);
    else {
      console.log('data: ', data)
    }
  })
}

module.exports = {
  deleteFile, 
  s3
}