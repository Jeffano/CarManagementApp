const express = require('express')
const mongoose = require('mongoose')
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

// Define Car Schema
const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String },
  year: { type: Number },
  brand: { type: String },
  size: { type: String },
  color: { type: String },
  additionalDetails: { type: String },
  ownerId: { type: String, required: true } // Changed to String for email
});

const Car = mongoose.model('Car', carSchema);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // create a collection of documents
    const carCollection = client.db("CarInventory").collection("cars");
    const userCollection = client.db("CarInventory").collection("users");
    const listCollection = client.db("CarInventory").collection("lists");
    const commentCollection = client.db("CarInventory").collection("comments");

    // All Car Collection Routes

    // Add Car Route
    // Add Car Route
    app.post("/add-car", async (req, res) => {
      const { make, model, year, brand, size, color, additionalDetails, ownerId } = req.body;
      try {
        const newCar = new Car({
          make,
          model,
          year,
          brand,
          size,
          color,
          additionalDetails,
          ownerId
        });
        const result = await newCar.save(); // Save to the "cars" collection
        res.status(201).send(result);
      } catch (error) {
        res.status(500).send({ error: 'Error adding car' });
      }
    });


    //All User Routes

    app.post("/add-user", async (req, res) => {
      const { firstName, lastName, email } = req.body;

      try {
        // Create a new user with the provided details
        const result = await userCollection.insertOne({ firstName, lastName, email });

        res.status(201).send({ message: "User added successfully", result });
      } catch (error) {
        console.error("Error adding user:", error);
        res.status(500).send({ message: "Failed to add user", error });
      }
    });

    // Fetch user data by email
    app.get('/user/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const user = await userCollection.findOne({ email: email });

        if (!user) {
          return res.status(404).send({ message: 'User not found' });
        }

        // Return only firstName and lastName
        const { firstName, lastName } = user;
        res.send({ firstName, lastName });
      } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });

    // Update user data by email
app.put('/user/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const { firstName, lastName } = req.body;

    // Validate input
    if (!firstName || !lastName) {
      return res.status(400).send({ message: 'First name and last name are required' });
    }

    const result = await userCollection.updateOne(
      { email: email },
      { $set: { firstName: firstName, lastName: lastName } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send({ message: 'User not found' });
    }

    res.send({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});




    // All List Collection Routes



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