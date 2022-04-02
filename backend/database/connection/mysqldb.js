/// House Keeping ///
// Name: Warren Kavanagh 
// Email: C16463344
// Description:
//  This is used to get a connection to the MySQL database 
//  The connection information is specified within the environment variables 
import mysql from 'mysql';
import dotenv from 'dotenv';

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


pool.getConnection((error,con) => {
    if(error){
        console.log(`Could not connect to the database ${error}`)
    }else{
        console.log("Connected to database");
    }
})

/// getCon ////
// Desctiption:
//  Ths function gets a connection to the database from the connection pool
//  Will return a resolved promise which will be the connection object if succesful 
function getCon () {
    return new Promise((resolve,reject) => {
        pool.getConnection(function (error, con) {
            if (error){
                return reject(error);
            }else{
                resolve(con);
            }
        })
    })
}

// Export the getCon function so can get connection in other files 
export default pool;