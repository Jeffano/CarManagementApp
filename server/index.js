const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const cors = require('cors');

// Middleware setup
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// MongoDB configuration
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
    // Connect to MongoDB
    await client.connect();

    // Create collections
    const carCollection = client.db("CarInventory").collection("cars");
    const userCollection = client.db("CarInventory").collection("users");

    // Add Car Route
    app.post("/add-car", async (req, res) => {
      const { make, model, year, brand, size, color, additionalDetails, ownerId } = req.body;

      try {
        // Insert car data into the collection
        const result = await carCollection.insertOne({
          make,
          model,
          year,
          brand,
          size,
          color,
          additionalDetails,
          ownerId
        });

        res.status(201).send({ message: "Car added successfully", result });
      } catch (error) {
        console.error("Error adding car:", error);
        res.status(500).send({ message: "Failed to add car", error });
      }
    });

    // Fetch cars by email (ownerId)
    app.get('/cars/:email', async (req, res) => {
      try {
        const email = req.params.email;
        const cars = await carCollection.find({ ownerId: email }).toArray();

        if (cars.length === 0) {
          return res.status(404).send({ message: 'No cars found for this user' });
        }

        res.send(cars);
      } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });

    // Add User Route
    app.post("/add-user", async (req, res) => {
      const { firstName, lastName, email } = req.body;
      try {
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

    // Confirm successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. Successfully connected to MongoDB!");

  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Car Management Application listening on port ${port}`);
});
