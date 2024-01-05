const express = require('express');
const routes = express.Router();

const getpage = require('../controllers/getpage');

routes.get('/', getpage.gethome);
routes.get('/index1', getpage.getindex1);
routes.get('/index2', getpage.getindex2);

routes.get('/choice', getpage.getchoice);


module.exports = routes;