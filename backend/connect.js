
const { MongoClient, ServerApiVersion } = require('mongodb');
require("dotenv").config({path:'./config.env'});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let database
module.exports=
{
    // in this curly braces are function we are going to export
    // the first one willl be the function that will actually connect to our server
    connectToServer: () =>
    {
        database = client.db("blogData")
        //it will assign the database variable to the blogData database we have in MongoDB
    },
    getDb: ()=>
    {
        return database;
    }
    //this function helps to get the function whenever we need
    // we need to call getDb function only after the connectToServer funtion is called
}
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

console.log("HI");
