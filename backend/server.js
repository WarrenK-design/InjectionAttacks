/// House Keeping ///
// Name: Warren Kavanagh 
// Email:  C16463344@MyTUDublin.ie
// Description:
//  Starts the express application running on the server port so HTTP messages can be recieved 
//  Also sets up the database connection for the application 

/// Imports ///
// app - This is the express app for the backend 
// dotenv - Used for reading in enviroment variables
// pool - Database connection pool used to get database connection, not used but called to establish initial connection here  
import app from './app.js'
import dotenv from 'dotenv';
import pool from './database/connection/mysqldb.js'

/// Setup ///
// Read in the .env file 
dotenv.config()
const PORT = process.env.PORT || 5000;


// Start the application running 
app.listen(PORT,() => console.log(`Server listening on port ${PORT}`));