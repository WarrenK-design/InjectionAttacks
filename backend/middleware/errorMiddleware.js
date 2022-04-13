/// House Keeping ///
// Name: Warren Kavanagh 
// Email:  C16463344@MyTUDublin.ie
// Description:
//  This file holds the error middleware, used to give more meangingful errors 


/// errorHandler ///
// Description:
//  Express default error handler returns HTML format for error messages 
//  Custom error handler gives more control and can implment custom messages in JSON format 
function errorHandler(err,req,res,next){
    let statusCode = null; 
    // Set the status code 
    if(res.statusCode === 200){//Sometimes you get a 200 even though you shouldnt
        statusCode = 500;
    }else{ // Correct status code must have been set in the route 
        statusCode = res.statusCode;
    }
    // Set the status code for the response 
    res.status(statusCode);
    // If we are in production just return message 
    if(process.env.NODE_ENV === 'production'){
        res.json({
            errormessage: res.errormessage
    })
    }else{
        res.json({
            errormessage: res.errormessage,
            tracemessage: err.message,
            trace: err.stack
    })
    }  
}

/// notFoundHandler ///
// Description:
//  This is used to catch any requests to URL's which do not exit
//  A status code for an unkown route should be a 404 status code 
function notFoundHandler(req,res,next){
    // Set the status code and a message  
    res.status(404);
    res.errormessage = "Could not find the requested route";
    return next(new Error("A request was made to an unknown URL"));
}


export {errorHandler,notFoundHandler};