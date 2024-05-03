import express from "express";
import cors from "cors";
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import historyRouter from './routes/historyRoutes.js';
import favoriteRouter from './routes/favoriteRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import pool from './db/db.js';

const app=express();
app.use(cors())

export const connect = await pool.connect()

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/history', historyRouter);
app.use('/favorite', favoriteRouter);
app.use('/cart', cartRouter);

app.listen(8080, ()=>console.log('Server running'))