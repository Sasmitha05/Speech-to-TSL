const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); 
const router = express.Router();


router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
  
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'Username already exists.' });
    }

 
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

 
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
 
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: 'User does not exist. Please sign up.' });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Incorrect password. Please try again.' });
    }

    res.status(200).json({ message: 'Login successful!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
