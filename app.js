const express = require("express")
const User = require("./Models/User");
const path = require("path");

const app = express();
const PORT = 3000;

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sae1um:NTQQt1GBP0bIG8ik@todoapp.ys91h9x.mongodb.net/?retryWrites=true&w=majority";

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
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

app.post("/User", async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.join(savedUser);
    }
    catch (err) {
        console.error("Error creating user:", err);
        res.status(400).json({ error: "Bad request" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Replace 'index.html' with the filename of your HTML file
});