const Database = require('./db')
const { auth, requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: true,
  auth0Logout: true,
  secret: 'becdf956790ba5fbc3364e84c7c3cc32b133d860f2020baa7a7bcd83d2a6d131',
  baseURL: 'http://localhost:3000',
  clientID: 'FQ2yFwIHR2kUZ7OY0llla5Yu8cmDxEGF',
  issuerBaseURL: 'https://dev-fskafmekjbf3ya6h.us.auth0.com'
};

const db = new Database("meetcute", "meetcute");
db.test();

const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(auth(config));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Function to be triggered after login
const afterLoginFunction = async(user) => {
  console.log('User logged in:', user);
  // Perform additional operations here
  const user1 = await db.initUser();
  // const userId = await user1.createUser(age, first_name, last_name, username);
};

// Middleware to handle successful login
app.use((req, res, next) => {
  // Ensure req.oidc is available and isAuthenticated is a function
  if (req.oidc && req.oidc.isAuthenticated()) {
    // Use a flag or a temporary variable to handle post-login actions
    if (!req.hasLoggedIn) {
      req.hasLoggedIn = true; // Initialize flag
      afterLoginFunction(req.oidc.user); // Call your function here
    }
  } else {
    // Reset the login flag if the user is not authenticated
    req.hasLoggedIn = false;
  }
  next();
});

// Define routes if needed
app.get('/', requiresAuth(), async(req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.get('/friends', requiresAuth(), async(req,res) => {
  res.sendFile(path.join(__dirname, '../public', 'FriendsTab.html'));
})

app.get('/messaging', requiresAuth(), async(req,res) => {
  res.sendFile(path.join(__dirname, '../public', 'MessagingTab.html'));
})

app.get('/profile', requiresAuth(), async(req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'UserProfileTab.html'));
})

app.get('/test', requiresAuth(), (req, res) => {
  // res.send(req.oidc.user);
  res.json(req.oidc.user);
});

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
