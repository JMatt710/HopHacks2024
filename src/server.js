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
  const { age, first_name, last_name, username } = req.query;
  const user = await db.initUser();
  const userId = await user.createUser(age, first_name, last_name, username);
  if (userId) {
      res.json({ success: true, userId });
  } else {
      res.status(400).json({ success: false, message: 'Username already exists.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
