// import { Database } from './db.js';
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
// app.use('/api', require('./routes/api'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
