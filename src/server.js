const Database = require('./db')

const db = new Database("meetcute", "meetcute");
db.test();

const express = require('express');
const path = require('path');

const cookieParser = require('cookie-parser');


const app = express();
app.use(cookieParser());
const port = process.env.PORT || 3000;

const isAuthenticated = async (req, res, next) => {
  const loggedIn = req.cookies?.loggedIn;

  if(loggedIn) {
    return next();
  } else {
    res.redirect('/login.html');
  }
}

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Define routes if needed
app.get('/', isAuthenticated, async(req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'main.html'));
});

app.get('/friends', isAuthenticated, async(req,res) => {
  res.sendFile(path.join(__dirname, '../public', 'FriendsTab.html'));
})

app.get('/messaging', isAuthenticated, async(req,res) => {
  res.sendFile(path.join(__dirname, '../public', 'MessagingTab.html'));
})

app.get('/profile', isAuthenticated, async(req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'UserProfileTab.html'));
})

app.get('/login', isAuthenticated, async(req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'login.html'));
})
app.use(express.json());
app.post('/api/register', async (req,res) => {
  console.log(req.body);
  const {uname, psw, fname, lname, email} = req.body;
  const user = await db.initUser();
  const user_id = await user.createUser(24, fname, lname, uname, psw);

  if (user_id) {
    res.cookie('loggedIn', 'true', { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
    res.cookie('username', uname, { httpOnly: true, maxAge: 3600000 });
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }
});
app.post('/api/login', async (req,res) => {
  console.log(req.body);
  const {uname, psw} = req.body;
  const user = await db.initUser();
  const user_id = await user.getUserByUsername(uname);
  if(user_id) {
    if(user_id.username == uname) {
      res.cookie('loggedIn', 'true', { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
      res.cookie('username', uname, { httpOnly: true, maxAge: 3600000 });
      res.json({ success: true });
    }
    else {
      res.cookie('loggedIn', 'false', { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
      // res.cookie('username', uname, { httpOnly: true, maxAge: 3600000 });
      res.json({ success: false });
    }
  }
  else {
    res.status(401).json({ success: false, message: 'Invalid credentials.' });
  }
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
