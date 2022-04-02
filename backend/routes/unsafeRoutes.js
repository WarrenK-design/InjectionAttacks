/// House Keeping ///
// Name: Warren Kavanagh 
// Email:  C16463344@MyTUDublin.ie
// Description:
//  This file holds the routes which are unsafe and can be attacked 

/// Imports ///
// express - The express module for the server, needed to get router object 
// sqlInjection - Controller function for sqlInjection route 
import express from 'express';
import { sqlInjection, commandInjection } from '../controllers/unsafeController.js';


/// Vars ///
// router - The router object to create routes 
const router = express.Router(); 


/// GET /unsafe/sqlinjection ///
// Description
//  Route for the SQL injection attack where malicous SQL code can be injected 
router.get('/sqlinjection',sqlInjection);


/// GET /unsafe/commandinjection ///
// Description:
//  Route for the command injection attack where malicious commands can be executed on the system
router.get('/commandinjection',commandInjection)




// Export the router object so it can be used to attach to express app
export default router; 