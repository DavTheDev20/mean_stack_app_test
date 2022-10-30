import * as dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const MONGODB_URI: string = <string>process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.log(
    '\x1b[31m',
    '   ERROR: No MONGODB_URI specified. Must specify MONGODB_URI to run MongoDB database.'
  );
  process.exit(1);
}

/***
 * Connects server to MongoDB database.
 */
const dbConnect = () => {
  mongoose.connect(MONGODB_URI, {}, (err) => {
    if (err) {
      console.log('\x1b[31m', err);
      process.exit(1);
    } else {
      console.log('Connected to database');
    }
  });
};

export default dbConnect;
