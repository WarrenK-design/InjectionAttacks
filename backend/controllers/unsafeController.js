/// House Keeping ///
// Name: Warren Kavanagh 
// Email: C16463344@MyTUDublin.ie
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
//  products table based upon the query paramter supplied by the user called product 
// Inputs:
//  req  - The Express request object, contains information about the HTTP request 
//  res  - The Express response object, used to send the response to the client 
//  next - Express function used to call next middleware if required  
function sqlInjection(req,res,next){
    // *** BAD CODE ***
    // The SQL query is designed to search products in the products table using a product 
    // query parameter passed within the request. Anywhere where user input is used within 
    // a database query it should always be checked to ensure it does not contain any illegal 
    // or malicious data. Here any string can be injected into the SQL query which will be executed
    // on the database which can cause sensiive data to be leaked or disruption of the database. 
    let query = `SELECT * FROM products WHERE productLine LIKE '%${req.query.product}%';`
    console.log(`Query from /unsafe/sqlinjection ${query}`)
    // Execute the query 
    pool.query(query, (err, rows) => {
        // If there is some database error throw it 
        if(err) {
            throw err;
        }
        // Check if we have any results for the query 
        if(!rows.length){
            res.errormessage = `No results found, query is ${query}`
            return next(new Error(`No results for the search query ${query}`));
        }else if (rows[0].constructor.name == 'Array'){ // If multiple querys executed you will get back an array
            res.json(rows[0]) // Only return first element of array, second element is metadata we dont want
        }else{
            res.json(rows) // Not an array ok to just resturn result in JSON form 
        }
  });
}



/// commandInjection ///
// Description:
//  This function is the controller for /unsafe/commandinjection route 
//  The route accepts a query parameter which is supposed to be a folder name and the contents
//  of this folder will then be returned to the client. It the javascipt exec command to do this which
//  is vulnerable to command inejection as it executes shell commands 
// Inputs:
//  req  - The Express request object, contains information about the HTTP request 
//  res  - The Express response object, used to send the response to the client 
//  next - Express function used to call next middleware if required  
function commandInjection(req,res,next){
    // *** BAD CODE //
    // The query parameter is being parsed here from the http method which should only be a folder name 
    // however as it is user supplied it could be anything the user wants. The query parameter is then used directly in the 
    // shell command executeed, meaning the user can inject any shell command into the query parameter and it will be executed. 
    let folder = req.query.folder;
    exec(`ls ${folder}`, (error, stdout, stderr) => {
        // Check if there is an error executing the command 
        if(error){
            console.log(`Error at commandInjection controller ${error}`)
            res.errormessage = `Could not read data from ${req.query.folder}`
            return next(new Error(`Could not read data from ${req.query.folder}`));
        }else{
            // No Error return the result
            console.log(`\nOutput from /safe/commandinjection?folder=${req.query.folder }\n${stdout}`);
            res.send(stdout);
        }
    })
}


export {sqlInjection,commandInjection};