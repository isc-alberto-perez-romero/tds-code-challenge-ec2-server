'use strict';

const express = require('express');

const app = express();
/**
* Index file to include all resources into this API.
*/
app.use(require('./contacts'));
app.use(require('./lambdaLogic'));

module.exports = app;
