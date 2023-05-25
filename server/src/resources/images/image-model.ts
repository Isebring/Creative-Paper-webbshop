import mongoose from 'mongoose';

export let imageBucket: mongoose.mongo.GridFSBucket;

mongoose.connection.on('open', () => {
  imageBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'images',
  });
});
