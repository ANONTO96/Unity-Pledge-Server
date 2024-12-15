const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const app = express();

const port = process.env.PORT || 4006;

// middleware
app.use(express.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@anonto96.bxfwp.mongodb.net/?retryWrites=true&w=majority&appName=Anonto96`;

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
    //   // Connect the client to the server	(optional starting in v4.7)
    //   await client.connect();
    //   // Send a ping to confirm a successful connection
    //   await client.db("admin").command({ ping: 1 });
    const campaignDB = client.db("campaignDB");
    const campaignCollection = campaignDB.collection('campaign');
    const userCollection = campaignDB.collection('users');
    
    // campaign apis
    // adding data
    app.post("/addCampaign", async(req, res) => {
        const newCampaign= req.body;
        console.log(newCampaign);

        const result = await campaignCollection.insertOne(newCampaign);
        res.send(result);
    
    })
    // getting all data
    app.get("/addCampaign", async(req, res) => {
      const cursor = campaignCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })
    // getting single data
    app.get("/addCampaign/:id", async(req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await campaignCollection.findOne(query);
      res.send(result);
    })

    // user apis
    app.post('/users', async(req, res) => {
      const newUser = req.body;

      const result = await userCollection.insertOne(newUser);
      res.send(result);
    })

    app.get("/users", async(req, res) => {
      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch(error) {
      console.log(error);
    }
  }
  run()


app.get('/',(req, res)=>{
    res.send('hello');
});

app.listen(port, ()=>{
    console.log('server is running')
})