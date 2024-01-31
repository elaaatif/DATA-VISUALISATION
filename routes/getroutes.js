const express = require('express');
const routes = express.Router();

const getpage = require('../controllers/getpage');

routes.get('/', getpage.gethome);
routes.get('/choice', getpage.getchoice);


module.exports = routes;