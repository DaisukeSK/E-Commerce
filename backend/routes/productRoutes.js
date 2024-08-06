import express from 'express';
import { getAllCategories, getAllProducts } from '../controllers/productControllers.js';

const productRouter = express.Router();

productRouter.get('/getAllCategories', getAllCategories);
productRouter.get('/getAllProducts', getAllProducts);

export default productRouter;