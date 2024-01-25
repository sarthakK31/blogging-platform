// src/index.js
import express from 'express';
import mongoose from 'mongoose';
import redis from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to Redis
const client = redis.createClient(process.env.REDIS_URL);

// Basic endpoint
app.get('/', (req, res) => {
  res.send('Hello, Blogging Platform!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
