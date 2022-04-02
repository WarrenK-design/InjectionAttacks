/// House Keeping ///
// Name: Warren Kavanagh 
// Email: C16463344
// Description:
//  This file holds the functions which are called when a http request comes in for the unsafe routes
//  The functions within this file are unsafe to use and can be exploited 

/// Imports ///
// con - Used to get a connection to the database 
import pool from '../database/connection/mysqldb.js'
import {exec} from 'child_process'; 

/// sqlInjection ///
// Description:
//  This function makes a database call to an SQL database and is intended to look up data from the 
//  products table based upon the 
function sqlInjection(req,res){
    // *** BAD CODE ***
    // The SQL query is designed to search products in the products table using a product 
    // query parameter passed within the request. Anywhere where user input is used within 
    // a database query it should always be checked to ensure it does not contain any illegal 
    // or malicious data. Here any string can be injected into the SQL query which will be executed
    // on the database which can cause sensiive data to be leaked or disruption of the database. 
    let query = `SELECT * FROM products WHERE productLine LIKE '%${req.query.product}%';`
    console.log(query)
    // Execute the query 
    pool.query(query, (err, rows) => {
        if(err) throw err;
        // Return the results as a JSON object// 
        if (rows[0].constructor.name == 'Array'){
            res.json(rows[0])
        }else{
            res.json(rows)
        }
  });
}


/// commandInjection ///
// Description:
//  ***************
function commandInjection(req,res){
    exec('ls -l', (error, stdout, stderr) => {
        if(error){
            console.log(`Error at commandInjection controller ${error}`)
        }else{
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            res.send("Hello from commsndInjection");
        }
    })
}


export {sqlInjection,commandInjection};