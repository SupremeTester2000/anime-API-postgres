require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3300;
const db = require('./database/models');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});