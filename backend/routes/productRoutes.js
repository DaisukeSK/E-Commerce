import express from 'express';
import { getAllCategories, searchProducts, getAllProducts } from '../controllers/productControllers.js';
import bodyParser from 'body-parser';

const productRouter = express.Router();

productRouter.post('/searchProducts', bodyParser.json(), searchProducts);
productRouter.get('/getAllCategories', getAllCategories);
productRouter.get('/getAllProducts', getAllProducts);

export default productRouter;