const connect= require("./connect");
//with this line we assighn the connect variable to entire module.exports object
// Express allows us to launch the serverand also allows to setup middle-ware
//which allow front-end and backend to communucate
const express=require("express");
const cors=require("cors");
const posts = require("./postRoutes")
const users = require("./userRoutes")

//with this we can interact with our express app
const app=express();
const PORT=8000;

app.use(cors()); // app.use() is a function tha we call a middle ware 
 // cors tell express how to share resources across different domain
app.use(express.json()) // this just tells express to parse request in json format
app.use(posts)
app.use(users)

// app.listen is actulaay the server
app.listen(PORT,()=>{
    connect.connectToServer();
    console.log(`Connected to port ${PORT}`);
})
