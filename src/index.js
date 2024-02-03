// src/index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import initDatabase from '../initDatabase.js';
import postsRouter from './routes/posts.js';

import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';
import session from 'express-session';
import preferencesRouter from './routes/preferences.js';

import User from './models/User.js';
import Post from './models/Post.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON requests
app.use(express.json());


//Initialize Redis client
let redisClient = createClient();
redisClient.connect().catch(console.error);

// Initialize store.
let redisStore = new RedisStore({
  client: redisClient,
  prefix: "myapp:",
})

// Session configuration
app.use(
  session({
    store: redisStore,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// // Use the posts router
// app.use('/api/posts', postsRouter);
// app.use('/api/update-preferences',preferencesRouter);


// Function to initialize the database
async function startServer() {
  try {
    // Call the initDatabase function
    await initDatabase();
    mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("db connected successfully");
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Call the function to start the server
startServer();

// Configure OAuth 2.0 strategy
passport.use(
  'oauth2',
  new OAuth2Strategy(
    {
      authorizationURL: 'https://github.com/login/oauth/authorize',
      tokenURL: 'https://github.com/login/oauth/access_token',
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Find or create user based on OAuth profile ID
        console.log(profile);
        const user = await User.findOne({ oauthId: profile.id });

        if (!user) {
          // If the user doesn't exist, create a new user
          const newUser = await User.create({
            oauthId: profile.id,
            username: profile.username,
            preferences: profile._json.favoriteGenres || [], // Use favoriteGenres from the OAuth profile
          });

          return done(null, newUser);
        }

        // User already exists, update preferences if needed
        if (!user.preferences.length && profile._json.favoriteGenres) {
          user.preferences = profile._json.favoriteGenres;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error(error);
        return done(error);
      }
    }
  )
);

// Serialize user to store in the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});




// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  // Fetch user from the database based on id
  // You need to implement this based on your database schema
  // For simplicity, we'll assume a User model with an 'findById' method
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    console.error(error);
    done(error);
  }
});

// OAuth 2.0 routes
app.get(
  '/auth',
  passport.authenticate('oauth2')
);

app.get(
  '/auth/github/callback',
  passport.authenticate('oauth2', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect to the home page
    res.redirect('/');
  }
);

// Serve the public directory containing the frontend
app.use(express.static('public'));

// Use the posts router
app.use('/api/posts', postsRouter);
app.use('/api/update-preferences',preferencesRouter);


// Basic endpoint
app.get('/', (req, res) => {
  res.send('Hello, Blogging Platform!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});







