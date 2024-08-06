import express from 'express';
import { addToFavorite, removeFromFavorite, getFavorite } from '../controllers/favoriteControllers.js';
import bodyParser from 'body-parser';

const favoriteRouter = express.Router();

favoriteRouter.post('/addToFavorite', bodyParser.json(), addToFavorite);
favoriteRouter.post('/removeFromFavorite', bodyParser.json(), removeFromFavorite);
favoriteRouter.post('/getFavorite', bodyParser.json(), getFavorite);

export default favoriteRouter;