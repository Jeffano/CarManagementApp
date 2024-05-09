const express = require('express')
const app = express()
const port = 3000
const cors = require('cors');

// middleware, makes connections to the front end side
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// mongodb cofiguration
const { ObjectId, MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://car-management-app:Jipsy1234@cluster0.pqnsixs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create a collection of documents
    const carCollections = client.db("CarInventory").collection("cars");

    // insert a car to the db: post method
    app.post("/add-car", async (req, res) => {
        const data = req.body;
        const result = await carCollections.insertOne(data);
        res.send(result);
    })

    // get all cars from the db: get method
    app.get("/all-cars", async (req, res) => {
        const result = await carCollections.find().toArray();
        res.send(result);
    })

    // get a car from the db: get method
    app.get("/car/:id", async (req, res) => {
        const id = req.params.id;
        const result = await carCollections.findOne({ _id: new ObjectId(id) });
        res.send(result);
    })

    // update a car in the db: put method
    app.put("/update-car/:id", async (req, res) => {
        const id = req.params.id;
        const updatedCarData = req.body;
        const result = await carCollections.updateOne({ _id: new ObjectId(id) }, { $set: updatedCarData });
        res.send(result);
    })

    // delete a car from the db: delete method
    app.delete("/delete-car/:id", async (req, res) => {
        const id = req.params.id;
        const result = await carCollections.deleteOne({ _id: new ObjectId(id) });
        res.send(result);
    })

    // filter by make
    app.get("/car-make/:make", async (req, res) => {
        const make = req.params.make;
        const result = await carCollections.find({ make: make }).toArray();
        res.send(result);
    })

    // filter by model
    app.get("/car-model/:model", async (req, res) => {
        const model = req.params.model;
        const result = await carCollections.find({ model: model }).toArray();
        res.send(result);
    })

    // filter by year
    app.get("/car-year/:year", async (req, res) => {
        const year = req.params.year;
        const result = await carCollections.find({ year: year }).toArray();
        res.send(result);
    })

    // filter by brand
    app.get("/car-brand/:brand", async (req, res) => {
        const brand = req.params.brand;
        const result = await carCollections.find({ brand: brand }).toArray();
        res.send(result);
    })

    //filter by size
    app.get("/car-size/:size", async (req, res) => {
        const size = req.params.size;
        const result = await carCollections.find({ size: size }).toArray();
        res.send(result);
    })

    //filter by color
    app.get("/car-color/:color", async (req, res) => {
        const color = req.params.color;
        const result = await carCollections.find({ color: color }).toArray();
        res.send(result);
    })

    // create list

    // add to list

    // remove from list

    // delete list

    // get all public lists


    //filter by scale
    
    //get all public lists

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`Car Management Application listening on port ${port}`)
})