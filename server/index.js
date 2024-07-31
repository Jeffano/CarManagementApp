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
    const userCollection = client.db("CarInventory").collection("users");
    const listCollection = client.db("CarInventory").collection("lists");
    const commentCollection = client.db("CarInventory").collection("comments");

    // All Car Collection Routes
    app.post("/add-car", async (req, res) => {
      const data = req.body;
      const result = await carCollections.insertOne(data);
      res.send(result);
    })

    //All User Routes

    // Add a new user
    // Add or update user by email
    app.post("/add-user", async (req, res) => {
      const { firstName, lastName, email} = req.body;

      try {
        // Check if the user already exists
        const existingUser = await userCollection.findOne({ email: email });

        if (existingUser) {
          // Update existing user
          const result = await userCollection.updateOne(
            { email: email },
            { $set: { firstName, lastName } }
          );
          res.status(200).send({ message: "User updated successfully", result });
        } else {
          // Create a new user
          const newUser = {
            firstName,
            lastName,
            email,
          };
          const result = await userCollection.insertOne(newUser);
          res.status(201).send({ message: "User added successfully", result });
        }
      } catch (error) {
        console.error("Error adding or updating user:", error);
        res.status(500).send({ message: "Failed to add or update user", error });
      }
    });


    // Fetch user data by email
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;
      const user = await userCollection.findOne({ email: email });
      res.send(user);
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