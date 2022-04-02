/// House Keeping ///
// Name: Warren Kavanagh 
// Email:  C16463344@MyTUDublin.ie
// Description:
//  This script is used to seed data to the MySQL database
//  The data seeded to the database is a sample database which can be found at https://www.mysqltutorial.org/mysql-sample-database.aspx
//  The SQL code is contained in the file mysqlsampledatabase.sql

/// Imports ///
// pool - MySQL connection pool
// fs  - File reader module, used to read in the SQL file 
// path - Path module for directory traversal 
import pool from '../connection/mysqldb.js'
import fs from 'fs'
import path from 'path';

/// Vars ///
// __dirname - Current directory path, will resolve to backend directory when running script from npm
const __dirname = path.resolve();

/// seedData //
// Description:
//  Reads in the contents of the file mysqlsampledatabase.sql 
//  If a database "classicmodels" exists it deletes it to reset the database 
//  Writes the SQL then to the database 
function seedData(){
    // Read in the contents of the SQL file 
    const sqlFileData = fs.readFileSync(`${__dirname}/database/seeding/mysqlsampledatabase.sql`,{encoding: "utf-8"})
    // Execute the contents of the SQL file 
    pool.query(sqlFileData, (err, rows) => {
        if(err){
            throw err;
        }else{
            console.log("Data sucfully seeded to classicmodels database");
            process.exit(0);
        }
    });
}

// Call seedData function 
seedData()