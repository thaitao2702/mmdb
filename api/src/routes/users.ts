import express from 'express';

const usersRouter = express.Router();

usersRouter.get('/', (req,res,next)=>{
    console.log('user router get');
    next();
})

export default usersRouter;
