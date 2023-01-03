import express from 'express';
import cors from 'cors';
import { routes } from './routes/index';

export const app = express()

.use(express.json())

.use((_, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    
    res.header("Access-Control-Allow-Methods", "*");

    app.use(cors);
    
    return next();

})

.use(routes);