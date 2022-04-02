/// House Keeping ///
// Name: Warren Kavanagh 
// Email:  C16463344@MyTUDublin.ie
// Description:
//  This file holds the express app and attaches all routes and middleware used to it 


/// Imports ///
// express      - Backend framework
// path         - Directory handling module
// cors         - Allows HTTP requests from different sources 
// unsafeRoutes - API routes for unsafe routes which can be attacked  
import express from 'express';
import path from 'path';
import cors from 'cors';
import unsafeRoutes from './routes/unsafeRoutes.js';
import saferoutes from './routes/safeRoutes.js';
import {errorHandler,notFoundHandler} from './middleware/errorMiddleware.js'

// Vars //
// app - Instance of an express application 
// __dirname - Current directory 
const app       = express();
const __dirname = path.resolve();

/// Cors ///
// Cross origin resource sharing, will get a cors error if the frontend makes request from backend 
// if this is not done
app.use(cors());

/// Middleware ///
// express.json - This is a body parser for JSON used to parse HTTP requests 
app.use(express.json());

/// Routes ///
app.use('/unsafe',unsafeRoutes);
app.use('/safe',saferoutes)

/// Middleware ///
app.use(notFoundHandler);
app.use(errorHandler)


export default app;

