/// House Keeping ///
// Name: Warren Kavanagh 
// Email:  C16463344@MyTUDublin.ie
// Description:
//  This file holds the routes which are safe and not suceptible to attacks

/// Imports ///
// express - The express module for the server, needed to get router object 
// sqlInjection - Controller function for sqlInjection route 
import express from 'express';
import {sqlInjection,commandInjection} from '../controllers/safeController.js'

/// Vars ///
// router - The router object to create routes 
const router = express.Router(); 


/// GET /safe/sqlinjection ///
// Description
//  Route for the fixed SQL injection code 
router.get('/sqlinjection',sqlInjection);

/// GET /safe/commandinjection ///
// Description:
//  Route for the fixed command injection code 
router.get('/commandinjection',commandInjection);

export default router; 
