const express = require('express');
const routes = express.Router();

const postpage = require('../controllers/postpage');

routes.post('/', postpage.posthome);

module.exports = routes;