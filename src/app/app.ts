import express from 'express';
import cors from 'cors';
import { routes } from './routes/routes';

export const app = express().use(express.json()).use((req, res, next) => {

    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    
    res.header("Access-Control-Allow-Methods", "*");

    app.use(cors);
    
    return next();

}).use(routes);