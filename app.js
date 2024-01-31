const express = require('express');
const opn = require('opn');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const getRoutes = require('./routes/getroutes');
const postRoutes = require('./routes/postroutes');

app.use('/', getRoutes);
app.use('/', postRoutes);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  //opn(`http://localhost:${PORT}`);
});