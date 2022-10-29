import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dbConnect from './utils/dbConnect';
import postsRouter from './routes/postsRouter';

const app = express();
const PORT = 8080;

dbConnect();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use('/api/posts', postsRouter);

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
