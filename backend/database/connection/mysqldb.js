/// House Keeping ///
// Name: Warren Kavanagh 
// Email:  C16463344@MyTUDublin.ie
// Description:
//  This is used to get a connection to the MySQL database 
//  The connection information is specified within the environment variables in the .env file 

/// Imports ///
// mysql - Database library for NodeJS for the MySQL database
// dotenv - Used for reading .env file env vars 
import mysql from 'mysql';
import dotenv from 'dotenv';

// Read .env file into env vars 
dotenv.config()

/// Pool ///
// Description:
//  Connection pool for the MySQL database, the config information is obtained
//  from the .env file 
var pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true
});

// Connect the pool to the database 
pool.getConnection((error,con) => {
    if(error){
        console.log(`Could not connect to the database ${error}`)
    }else{
        console.log("Connected to database");
    }
})

// Export the getCon function so can get connection in other files 
export default pool;