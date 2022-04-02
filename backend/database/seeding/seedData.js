/// House Keeping ///
// Name: Warren Kavanagh 
// Email: C16463344
// Description:
//  This script is used to seed data to the MySQL database
//  The data seeded to the database is a sample database which can be found at https://www.mysqltutorial.org/mysql-sample-database.aspx
//  The SQL code is contained in the file mysqlsampledatabase.sql

/// Imports ///
// getCon - Function to get a connectin from the connection pool 
// fs  - File reader module, used to read in the SQL file 
// path - Path module for directory traversal 
import getCon from '../connection/mysqldb.js'
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
async function seedData(){
    try{
        // Read in the contents of the SQL file 
        const sqlFileData = fs.readFileSync(`${__dirname}/database/seeding/mysqlsampledatabase.sql`,{encoding: "utf-8"})
        // Get a database connection from the connection pool 
        let con = await getCon();
        // Execute the contents of the SQL file 
        let result = await con.query(sqlFileData);
        console.log("Data sucfully seeded to classicmodels database");
        process.exit();
    }catch(error){
        console.log(`Error in seeding the data ${error}`);
        process.exit(1);
    }
}

// Call seedData function 
seedData()