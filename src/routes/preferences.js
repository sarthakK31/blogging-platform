// src/routes/preferences.js
import express from 'express';
const router = express.Router();
//import  isAuthenticated  from '../auth.js';
import User from '../models/User.js';

//Middleware to check if the user is authenticated or not
const isAuthenticated = (req, res, next) => {
  console.log('Checking authentication status...');
  
  if (req.isAuthenticated) {
    console.log('User is authenticated.');
    return next();
  }
  
  console.log('User is not authenticated. Unauthorized.');
  res.status(401).json({ error: 'Unauthorized' });
};

// Update user preferences
router.post('/', isAuthenticated,async (req, res) => {
  try {
    console.log('Updating preferences for authenticated user:', req.user.username);
    // Update user preferences based on the request body
    req.user.preferences = req.body.favoriteGenres || [];
    await req.user.save();
    console.log('Preferences updated successfully.');
    res.json({ message: 'Preferences updated successfully' });
  } catch (error) {
    console.error('Error updating preferences:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
