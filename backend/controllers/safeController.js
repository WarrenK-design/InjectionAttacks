/// House Keeping ///
// Name: Warren Kavanagh 
// Email:  C16463344@MyTUDublin.ie
// Description:
//  This file holds the functions which are called when a http request comes in for the safe routes 

/// Imports ///
// pool - Used to get a connection to the database 
import pool from '../database/connection/mysqldb.js'
import fs from 'fs';
import path from 'path';

const __dirname = path.resolve();

/// sqlInjection ///
// Description:
//  This is the controller for the route /safe/sqlinjection
//  It performs the SQL query safely by escaping special characthers in the search string and 
//  does not execute any injected SQL commands on the database 
function sqlInjection(req,res,next){
    // *** GOOD CODE ***
    // The method "escape" is used now when preparing the query to be executed on the database
    // What this does is escape special characthers which are part of the SQL lanaguage 
    // This means that they will not be treated as SQL but instead as string literals 
    let query = "SELECT * FROM products WHERE productLine LIKE "+pool.escape('%'+req.query.product+'%')
    console.log(`Query from /safe/sqlinjection ${query}`)
    // Execute the query 
    pool.query(query,(err, rows) => {
        if(err) {
            console.log(err)
            throw err;
        }
        // Check if there is a result if not return an error message
        if(!rows.length){
            res.errormessage = `No results found, query is ${query}`
            return next(new Error(`No results for the search query ${query}`));
        }else{
            // Return the rows from the database 
            res.json(rows)
        }
  });
}

/// commandInjection ///
// Description:
//  This function is the controller for /safe/commandinjection
//  It safely reads the contents of a supplied directory in the request parameters 
//  without executing shell code. Instead a built in javascript library is used to read the contents of the directory
function commandInjection(req,res,next){
    // *** GOOD CODE *** //
    // The query parameter is being parsed here from the http request the same way 
    // A shell command is no longer used however to search the directory instead a native javascript 
    // function is used which will not execute the shell code directly. This means shell commands can now longer be injected in 
    // as they would have no meaning using the built in function. In javascript the function used is exec.readir however most programming 
    // langusges have some form of this function and others which do not require shell commands to be executed directly
    let folder = `${__dirname}/${req.query.folder}`;
    // Read the contents of folder
    fs.readdir(folder,(err,files) =>{
        if(err){
            // If error return error to client 
            console.log(`Error reading directory ${err}`);
            res.errormessage = `Could not read data from ${req.query.folder}`
            return next(new Error(`Could not read data from ${req.query.folder}`));
        }else{
            // Join with space looks nicer and return result to client 
            let result = files.join(" ")
            console.log(`\nOutput from /safe/sqlinjection?folder=${req.query.folder}\n${result}`);
            res.send(result);
        }
    })
} 

export {sqlInjection,commandInjection};