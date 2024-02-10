import express from 'express';
import { order, removeFromCart, addToCart, getCart } from '../controllers/cartControllers.js';
import bodyParser from 'body-parser';

const cartRouter = express.Router();

cartRouter.post('/addToCart', bodyParser.json(), addToCart);
cartRouter.post('/removeFromCart', bodyParser.json(), removeFromCart);
cartRouter.post('/order', bodyParser.json(), order);
cartRouter.post('/getCart', bodyParser.json(), getCart);

export default cartRouter;