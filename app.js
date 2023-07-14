const express = require('express');
const path = require('path');

const app = express();

//Middleware
app.use(express.static('public'));

//routes
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './temp/index.html'));
});

app.listen(3000, () => {
  console.log('Server is started');
});
