const Database = require('./db')

const db = new Database("meetcute", "meetcute");
db.test();

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Define routes if needed
// Get user by username
app.get('/api/user/get', async (req, res) => {
  const { username } = req.query;
  const user = await db.initUser();
  const userInfo = await user.getUserByUsername(username);
  if (userInfo) {
      res.json(userInfo);
  } else {
      res.status(404).json({ success: false, message: 'User not found.' });
  }
});

// Create user
app.get('/api/user/create', async (req, res) => {
  const { age, first_name, last_name, username, password } = req.query;
  const user = await db.initUser();
  const userId = await user.createUser(age, first_name, last_name, username, password);
  if (userId) {
      res.json({ success: true, userId });
  } else {
      res.status(400).json({ success: false, message: 'Username already exists.' });
  }
});

// Update location
app.get('/api/user/update/location', async (req, res) => {
  const { username, latitude, longitude } = req.query;
  const user = await db.initUser();
  const success = await user.updateLocation(username, parseFloat(latitude), parseFloat(longitude));
  if (success) {
      res.json({ success: true });
  } else {
      res.status(400).json({ success: false, message: 'Failed to update location.' });
  }
});

// Update age range
app.get('/api/user/update/ageRange', async (req, res) => {
  const { username, low, high } = req.query;
  const user = await db.initUser();
  const success = await user.updateAgeRange(username, parseInt(low), parseInt(high));
  if (success) {
      res.json({ success: true });
  } else {
      res.status(400).json({ success: false, message: 'Failed to update age range.' });
  }
});

// Update distance range
app.get('/api/user/update/distRange', async (req, res) => {
  const { username, range } = req.query;
  const user = await db.initUser();
  const success = await user.updateDistRange(username, parseFloat(range));
  if (success) {
      res.json({ success: true });
  } else {
      res.status(400).json({ success: false, message: 'Failed to update distance range.' });
  }
});

// Add interest
app.get('/api/user/add/interest', async (req, res) => {
  const { username, interest } = req.query;
  const user = await db.initUser();
  const success = await user.addInterest(username, interest);
  if (success) {
      res.json({ success: true });
  } else {
      res.status(400).json({ success: false, message: 'Failed to add interest.' });
  }
});

// Remove interest
app.get('/api/user/remove/interest', async (req, res) => {
  const { username, interest } = req.query;
  const user = await db.initUser();
  const success = await user.removeInterest(username, interest);
  if (success) {
      res.json({ success: true });
  } else {
      res.status(400).json({ success: false, message: 'Failed to remove interest.' });
  }
});

// Add friend
app.get('/api/user/add/friend', async (req, res) => {
  const { username, friend_username } = req.query;
  const user = await db.initUser();
  const success = await user.addFriend(username, friend_username);
  if (success) {
      res.json({ success: true });
  } else {
      res.status(400).json({ success: false, message: 'Failed to add friend.' });
  }
});

// Remove friend
app.get('/api/user/remove/friend', async (req, res) => {
  const { username, friend_username } = req.query;
  const user = await db.initUser();
  const success = await user.removeFriend(username, friend_username);
  if (success) {
      res.json({ success: true });
  } else {
      res.status(400).json({ success: false, message: 'Failed to remove friend.' });
  }
});

// Add rejected friend
app.get('/api/user/add/reject', async (req, res) => {
  const { username, friend_username } = req.query;
  const user = await db.initUser();
  const success = await user.addRejectedFriend(username, friend_username);
  if (success) {
      res.json({ success: true });
  } else {
      res.status(400).json({ success: false, message: 'Failed to add rejected friend.' });
  }
});

// Remove rejected friend
app.get('/api/user/remove/reject', async (req, res) => {
  const { username, friend_username } = req.query;
  const user = await db.initUser();
  const success = await user.removeRejectedFriend(username, friend_username);
  if (success) {
      res.json({ success: true });
  } else {
      res.status(400).json({ success: false, message: 'Failed to remove rejected friend.' });
  }
});

// Find users in range
app.get('/api/user/findUsersInRange', async (req, res) => {
  const { username } = req.query;
  const user = await db.initUser();
  const usersInRange = await user.findUsersInRange(username);
  res.json(usersInRange);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
