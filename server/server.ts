import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dbConnect from './utils/dbConnect';
import postsRouter from './routes/postsRouter';
const path = require('path');

const app = express();
const PORT: string | number = <string>process.env.PORT || 8080;
const NODE_ENV: string = <string>process.env.NODE_ENV;

dbConnect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api/posts', postsRouter);

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
  app.get('*', (req, res) => {
    res.send(
      "<h2 style='color: red;text-align:center;margin-top:2%;font-family:Arial, sans-serif'>ERROR: App is in development mode, please change to production to see UI.<br/><br/>To Run UI and Server run <code>'yarn dev'</code><h2>"
    );
  });
  console.log('!!! App is running in development mode !!!');
}

if (NODE_ENV === 'production') {
  app.use(morgan('tiny'));
  app.use(
    '/',
    express.static(path.join(__dirname, '..', 'client', 'dist', 'client'))
  );
}

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
