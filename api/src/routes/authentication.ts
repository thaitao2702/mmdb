import express from 'express';
import User from 'entities/User';
import { findEntity } from 'utils/entityHandler';
import { login, signUp } from 'controllers/auth';

const authenticationRouter = express.Router();

authenticationRouter.post('/login', login);
authenticationRouter.post('/signup', signUp);

export default authenticationRouter;
