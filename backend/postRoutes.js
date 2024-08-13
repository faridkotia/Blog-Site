// for connection backend to the frontend HTTP routes are being created
//each route has a name that is appended to thr end of our base HTTP route
// for eg: http://localhost:3000 (BASE ROUTE) http://localhost:3000/users (BASE ROUTE + BACKEND ROUTE)
// every route is associated with exactly one function where it return some response to the front end
const { request, response } = require("express");
const express = require("express");
const { getDb } = require("./connect");
const database = require("./connect")
const jwt = require("jsonwebtoken")
require("dotenv").config({path:'./config.env'});
// the above library helps to provide a user authentication token
const ObjectId = require("mongodb").ObjectId;
// the above funtion helps us to convert regular string to object id
let postRoutes=express.Router();


// Fore each collection in mongo db we should keep the below 5 routes
// #1 Retrieve All
// this line creates a route to the page: http://localhost:8000/posts
postRoutes.route("/posts").get(verifyToken, async (request,response) => 
{
    let db = database.getDb()
    let data =await db.collection("posts").find({}).toArray() // is we leave this {} empty then it will return all the data in the collection and .toArray() will provide this all data in the form of an array of objects
    // the await keyword makes this an asynchronous function which ensures that the data is processed before providing it to us
    if (data.length > 0)
    {
        response.json(data);
    }
    else
    {
        throw new Error("No Data found")
    }
})


// #2 Retrieve One
postRoutes.route("/posts/:id").get(verifyToken, async (request,response) => 
{
    let db = database.getDb()
    let data =await db.collection("posts").findOne({_id: new ObjectId(request.params.id)}) // the id written here must be saame as the naming given to  "/posts/:id" this id
    if (Object.keys(data).length > 0) //here this time we are check in the empty object not an empty array
    {
        response.json(data);
    }
    else
    {
        throw new Error("No Data found")
    }
}) 

// #3 Create One

postRoutes.route("/posts").post(verifyToken, async (request,response) => 
{
    // as long as the the different methods are called different routes can have same name
    let db = database.getDb();
    let mongoObject = {
        title:request.body.title,
        description:request.body.description,
        content:request.body.content,
        author:request.body.user._id,
        dateCreated:request.body.dateCreated,
    }
    let data =await db.collection("posts").insertOne(mongoObject);
    response.json(data)
}) 


// #4 Update One
postRoutes.route("/posts/:id").put(verifyToken, async (request,response) => 
{
    
    let db = database.getDb();
    let mongoObject = {
        $set:
        {
            title:request.body.title,
            description:request.body.description,
            content:request.body.content,
            author:request.body.author,
            dateCreated:request.body.dateCreated,
        }
       
    }
    let data =await db.collection("posts").updateOne({_id:new ObjectId(request.params.id)},mongoObject);
    response.json(data)
}) 


// #5 Delete One
postRoutes.route("/posts/:id").delete(verifyToken, async (request,response) => 
{
    let db = database.getDb()
    let data =await db.collection("posts").deleteOne({_id: new ObjectId(request.params.id)}) 
    response.json(data);
}) 



// #6 Verify Token

function verifyToken(request , response , next)
{// the third argument next when using the context of express is just a function that basically will lead to our next step and to the other backend routes
    const authHeaders = request.headers["authorization"]
    // this will return the string that says bearer and then the token itself
    const token = authHeaders && authHeaders.split(' ')[1]
    // this says that if auth headers is found then we're going to split off the headers by its whitespace and take the first index
    if(!token)
    {
        return response.status(401).json({message:"Authentication token is missing"})
    }
    jwt.verify(token, process.env.SECRETKEY, (error,user) => 
    {
        if(error){
            return response.status(403).json({message:"Invalid token"})
        }
        request.body.user = user
        //if the validation did go through we will add this user object to the request body in case we donot use it
        next()
        // now we need to add this function to all the routes so that we must be logged in before accessing any routes
    })
}
{

}

module.exports = postRoutes