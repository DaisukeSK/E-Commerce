import express from 'express';
import { createAccount, signIn, changeUserName, changePassword, deleteAccount } from '../controllers/userControllers.js';
import bodyParser from 'body-parser';

const userRouter = express.Router();

userRouter.post('/createAccount', bodyParser.json(),createAccount);
userRouter.post('/signin', bodyParser.json(), signIn);
userRouter.post('/changeUserName', bodyParser.json(), changeUserName);
userRouter.post('/changePassword', bodyParser.json(), changePassword);
userRouter.post('/deleteAccount', bodyParser.json(), deleteAccount);

export default userRouter;