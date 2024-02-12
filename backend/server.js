import express from "express";
import cors from "cors";
import userRouter from './routes/userRoutes.js';
import productRouter from './routes/productRoutes.js';
import historyRouter from './routes/historyRoutes.js';
import favoriteRouter from './routes/favoriteRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import pool from './db/db.js';
import pool2 from './db/db2.js';

import bodyParser from 'body-parser';

const app=express();
app.use(cors())

export const connect = await pool.connect()
  // .then(() => console.log('Connected to DB'))
  // .catch((err) => console.log('Error connecting to database', err));

  // console.log('取得前 totalCount: ', pool.totalCount);
  // console.log('取得前 idleCount: ', pool.idleCount);
  // console.log('取得前 waitingCount: ', pool.waitingCount);

  // pool2.connect()
  // .then(() => console.log('Connected to DB2'))
  // .catch((err) => console.log('Error connecting to database', err));

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/history', historyRouter);
app.use('/favorite', favoriteRouter);
app.use('/cart', cartRouter);

const testQuery = async (req, res) => {
    
  try {
    const cart = await pool.query('select * from products')

    let query=''
    cart.rows.map((product,key)=>{

      let str=''
      product.images.map((img,key2)=>{
        str+=key2==0?`'${img}'`:`,'${img}'`
      })

      query+=`${key==0?'':','}('${product.title.replace("'","''")}','${product.description.replace("'","''")}',${product.price},array[${str}],${product.category_id})`
      
    })
    pool2.query(`insert into products (title,description,price,images,category_id) values ${query}`);
    res.status(200).json(cart.rows)

  } catch (err) {
    res.status(500).send(err.message);
  }
}

const testQuery2 = async (req, res) => {
    
  try {
    const cart = await pool.query('select * from categories')
    console.log("cart.rows:",cart.rows)

    let str=''
    cart.rows.map((category,key)=>{
      str+=`${key==0?'':','}('${category.category_name.replace("'","''")}')`
    })

    const query=`insert into categories (category_name) values ${str}`

    console.log("query:",query)

    // pool2.query(query);

    // pool2.query(`insert into products (title,description,price,images,category_id) values ${query}`);
    res.status(200).json(cart.rows)

  } catch (err) {
    res.status(500).send(err.message);
  }
}

app.post('/testQuery', bodyParser.json(), testQuery2);

app.listen(8080, ()=>console.log('server running'))