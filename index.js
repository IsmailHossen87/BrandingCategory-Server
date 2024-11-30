const express = require('express');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors');
app.use(express.json())
app.use(cors())



const uri = `mongodb+srv://${process.env.DB_USERS}:${process.env.DB_PASS}@cluster0.hg2ad.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(uri)
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect();
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const dataCollection =  client.db('BrandProduct').collection('Brand')
// POST DATA 
app.post('/brand' , async(req,res)=>{
    const newBrand = req.body;
    const result = await dataCollection.insertOne(newBrand)
    res.send(result)
})
// sob gulo datake rea korar jonno 
app.get('/brand',async(req,res)=>{
    const cursor = dataCollection.find()
    const result = await cursor.toArray()
    res.send(result)
})



  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res)=>{
    res.send("Sucessfully Run ")
})
app.listen(port,()=>{
    console.log(`Your port is Running ${port}`)
})