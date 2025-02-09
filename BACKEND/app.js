import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors'

import userRouter from './src/routes/user.router.js'
import newsRouter from './src/routes/news.router.js'

const app = express();
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



app.use("/user",userRouter)
app.use("/news",newsRouter)

export default app;