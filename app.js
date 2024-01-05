const express = require('express');
const opn = require('opn');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const getRoutes = require('./routes/getroutes');

app.use('/', getRoutes);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  opn(`http://localhost:${PORT}`);
});
