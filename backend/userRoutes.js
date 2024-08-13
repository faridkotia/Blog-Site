// Just like the postRoutes File

const { request, response } = require("express");
const express = require("express");
const { getDb } = require("./connect");
const database = require("./connect")
const ObjectId = require("mongodb").ObjectId;
// the above funtion helps us to convert regular string to object id
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config({path:'./config.env'});
// the above library helps to provide a user authentication token

let userRoutes=express.Router();
const SALT_ROUNDS = 6

// Fore each collection in mongo db we should keep the below 5 routes
// #1 Retrieve All
// this line creates a route to the page: http://localhost:8000/users
userRoutes.route("/users").get(async (request,response) => 
{
    let db = database.getDb()
    let data =await db.collection("users").find({}).toArray() // is we leave this {} empty then it will return all the data in the collection and .toArray() will provide this all data in the form of an array of objects
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
userRoutes.route("/users/:id").get(async (request,response) => 
{
    let db = database.getDb()
    let data =await db.collection("users").findOne({_id: new ObjectId(request.params.id)}) // the id written here must be saame as the naming given to  "/users/:id" this id
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

userRoutes.route("/users").post(async (request,response) => 
{// as long as the the different methods are called different routes can have same name
    let db = database.getDb()


    // the code line bellow is essential to prevent creation of useres with same credentials instead
    // it will find in the user database whether this user already exists or not
    const takenEmail = await db.collection("users").findOne({email : request.body.email});
    if(takenEmail)
    {
        response.json({message: "The email is already taken"})
    }

    else
    {
        const hash = await bcrypt.hash(request.body.password , SALT_ROUNDS)
        let mongoObject = {
            name:request.body.name,
            email:request.body.email,
            password: hash,
            joinDate:new Date(),
            posts:[],
        }
        let data =await db.collection("users").insertOne(mongoObject);
        response.json(data)
    }

    
}) 


// #4 Update One
userRoutes.route("/users/:id").put(async (request,response) => 
{
    
    let db = database.getDb();
    let mongoObject = {
        $set:
        {
            name:request.body.name,
            email:request.body.email,
            password:request.body.password,
            joinDate:request.body.joinDate,
            posts:request.body.posts,
        }
       
    }
    let data =await db.collection("users").updateOne({_id:new ObjectId(request.params.id)},mongoObject);
    response.json(data)
}) 


// #5 Delete One
userRoutes.route("/users/:id").delete(async (request,response) => 
{
    let db = database.getDb()
    let data =await db.collection("users").deleteOne({_id: new ObjectId(request.params.id)}) 
    response.json(data);
}) 



// #6 LogIn Route

userRoutes.route("/users/login").post(async (request,response) => 
{// as long as the the different methods are called different routes can have same name
    let db = database.getDb()


    // the code line bellow is essential to prevent creation of useres with same credentials instead
    // it will find in the user database whether this user already exists or not
    const user = await db.collection("users").findOne({email : request.body.email});
    
    // we need to check that whether the email exists in the database which the user passed in 
    if (user) {
     let confirmation = await bcrypt.compare(request.body.password , user.password)
     // basically it will compare the entered password with the stored password in the data base  
     if(confirmation)
     {
        const token = jwt.sign(user,process.env.SECRETKEY, {expiresIn:'1h'})
        // this sign method takes basically 3 arguments which are 1.) the payload which here is our user 2.) the secret key 3.) the time duration for which our token will last long
       // sign is a method which is used to create a token
        response.json(
        {
            success:true,
            token,
        })
     } 
     else
     {
        response.json(
            {
                success:false,
                message:"Password is incorrect"
            })
     }
    }
    else
    {
        response.json({
            success:false,
            message:"User not found"
        })
    }

    
}) 


module.exports = userRoutes