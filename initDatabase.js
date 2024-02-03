// initDatabase.js

import mongoose from 'mongoose';
import config from './config.js'; // Import your database configuration
import User from "./src/models/User.js";
import Post from "./src/models/Post.js";

// Connect to the database
mongoose.connect(config.databaseUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Function to initialize the database with sample data
async function initDatabase() {
  try {
    // Drop existing collections to start fresh (use with caution in a real application)
    await User.collection.drop();
    await Post.collection.drop();

    // Insert sample users
    const user1 = await User.create({ username: 'john_doe', preferences: ['Technology', 'Travel'] });
    const user2 = await User.create({ username: 'jane_smith', preferences: ['Food', 'Sports'] });
    const user3 = await User.create({ username: 'tom_holland',preferences: ['Food', 'Sports'] });
    const user4 = await User.create({ username: 'bob_jones', preferences: ['Technology', 'Music'] });
    const user5 = await User.create({ username: 'alice_wonder',preferences: ['Books', 'Technology'] });


    // Insert sample posts
    await Post.create({
      title: 'Tech Blog',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac urna quis metus laoreet ullamcorper. In hac habitasse platea dictumst.',
      author: user1._id,
      genre: 'Technology'
    });

    await Post.create({
      title: 'Exploring Food Trends',
      content: 'Vestibulum euismod elit et libero tincidunt fermentum. Praesent luctus elit et tortor consectetur, eu accumsan libero fermentum.',
      author: user2._id,
      genre: 'Food'
    });

    await Post.create({
      title: 'Music Discoveries',
      content: 'Nullam aliquam auctor rhoncus. Sed vulputate est vel justo efficitur, vel cursus ligula fermentum. Phasellus efficitur velit vitae ante rhoncus.',
      author: user3._id,
      genre: 'Music'
    });

    await Post.create({
      title: 'Travel Adventures',
      content: 'Quisque viverra arcu ut felis posuere, vitae feugiat velit eleifend. Fusce aliquam dolor in metus sagittis, nec fermentum nisl ultricies.',
      author: user4._id,
      genre: 'Travel'
    });

    await Post.create({
      title: 'Science and Innovation',
      content: 'Integer in tellus ut est facilisis gravida a et sapien. Proin sit amet quam a tellus maximus volutpat. Aliquam nec ipsum id dolor posuere euismod vitae eu orci.',
      author: user5._id,
      genre: 'Science'
    });

    await Post.create({
      title: 'Fitness Tips',
      content: 'Duis suscipit mi eu metus volutpat, nec dapibus elit tempus. Nunc ut justo eu libero laoreet fermentum nec ac erat. Suspendisse potenti.',
      author: user1._id,
      genre: 'Health'
    });

    await Post.create({
      title: 'Movie Reviews',
      content: 'Aenean varius libero in cursus facilisis. Morbi vel velit vel tortor auctor varius. Sed vitae sapien vel elit ultrices convallis.',
      author: user2._id,
      genre: 'Movies'
    });

    await Post.create({
      title: 'Coding Challenges',
      content: 'Nam hendrerit augue et ipsum ullamcorper, ut aliquam nisi congue. Duis et eleifend urna. Phasellus at lacus vitae augue volutpat consequat.',
      author: user3._id,
      genre: 'Technology'
    });

    await Post.create({
      title: 'Art and Creativity',
      content: 'Suspendisse eu diam ac lectus accumsan cursus vel sit amet ligula. Mauris tincidunt mi in mauris efficitur, nec imperdiet elit malesuada.',
      author: user4._id,
      genre: 'Art'
    });

    await Post.create({
      title: 'Cooking Experiments',
      content: 'Pellentesque aliquet orci sit amet malesuada ultricies. Vivamus ut est vel dui fermentum elementum. Vestibulum luctus est vel odio pharetra, a bibendum arcu congue.',
      author: user5._id,
      genre: 'Food'
    });


    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
    console.log('Database closed successfully');
  }
}

// Run the initialization function
export default initDatabase;
