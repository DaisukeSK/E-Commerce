import express from 'express';
import { add, get } from '../controllers/historyControllers.js';
import bodyParser from 'body-parser';

const historyRouter = express.Router();

historyRouter.post('/add', bodyParser.json(), add);
historyRouter.post('/get', bodyParser.json(), get);

export default historyRouter;