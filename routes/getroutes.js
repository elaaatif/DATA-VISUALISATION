const express = require('express');
const routes = express.Router();

const getpage = require('../controllers/getpage');

routes.get('/', getpage.gethome);
routes.get('/index1', getpage.getindex1);
routes.get('/index2', getpage.getindex2);

// Add routes for the 6 categories
routes.get('/choice', getpage.getchoice);


module.exports = routes;