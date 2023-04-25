const Aws = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const { env, logger } = require('../config');

const s3 = new Aws.S3();

Aws.config.update({
  accessKeyId: env.aws.keyId, // Access key ID
  secretAccesskey: env.aws.secretKey, // Secret access key
  region: env.aws.region // Region
});

module.exports = {
  uploadToS3: async (file, folder) => {
    let uploaded = false;
    try {
      if (!file || Object.keys(file).length === 0) {
        return false;
      }
      // const ext = file.mimetype.split('/').pop();
      // if ((ext !== 'dicom') || (ext !== 'pdf') || (ext !== 'dcm')) {
      //   return uploaded;
      // }

      const fileContent = Buffer.from(file.data, 'binary');

      const params = {
        // ACL: 'public-read',
        Bucket: env.aws.bucket,
        Key: `${folder}/${Date.now()}-${file.name}`, // File name you want to save as in S3
        Body: fileContent
      };

      uploaded = await s3.upload(params).promise();
      return uploaded.Location;
    } catch (err) {
      logger.info(err);
      return uploaded;
    }
  },

  toServer: async (file, folder, previousFile) => {
    try {
      const ext = file.mimetype.split('/').pop();
      if ((ext !== 'jpg') && (ext !== 'jpeg') && (ext !== 'png')) {
        return false;
      }
      // eslint-disable-next-line consistent-return
      file.mv(path.join('./uploads', ext), (err) => {
        if (err) {
          return false;
        }
      });
      if (previousFile != null) {
        fs.unlinkSync(`./uploads/${previousFile}`);
      }
      return `https://solaceradapi.herokuapp.com/${ext}`;
    } catch (err) {
      logger.info(err);
      return false;
    }
  },

  deleteFromS3: async (url) => {
    try {
      let deleted = false;
      const Key = url.replace(env.aws.baseUrl, '');
      const params = {
        Bucket: env.aws.bucket,
        Key
      };

      deleted = await s3.deleteObject(params).promise();

      return deleted;
    } catch (err) {
      logger.info(err);
      return false;
    }
  }
};
