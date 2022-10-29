import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb://0.0.0.0:27017/mean-stack_app_test-DB';

/***
 * Connects server to MongoDB database.
 */
const dbConnect = () => {
  mongoose.connect(MONGODB_URI, {}, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connected to database');
    }
  });
};

export default dbConnect;
