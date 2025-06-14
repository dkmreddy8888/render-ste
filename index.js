// index.js
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = "saiteja";

app.get("/api/customers", async (req, res) => {
  try {
    const db = client.db(dbName);
    const customers = await db.collection("Customers").find({}).toArray();
    res.json(customers);
  } catch (err) {
    console.error("❌ Failed to fetch customers", err);
    res.status(500).json({ error: "Error fetching customers" });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const db = client.db(dbName);
    const products = await db.collection("Products").find({}).toArray();
    res.json(products);
  } catch (err) {
    console.error("❌ Failed to fetch products", err);
    res.status(500).json({ error: "Error fetching products" });
  }
});

app.listen(5000, async () => {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");
    console.log("🚀 API live at http://localhost:5000");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  }
});
