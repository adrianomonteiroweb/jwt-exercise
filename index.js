const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.json());

// routes
const { users } = require('./routes');

app.use('/api/v1/login', users);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
