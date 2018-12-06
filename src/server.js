'use strict';

require('./config/config');

const express = require('express');
const colors = require('colors/safe');
const path = require('path');
const bodyParser = require('body-parser');
const busboy = require('connect-busboy');
const busboyBodyParser = require ('busboy-body-parser');
const cors = require ('cors');

// Fixes a database problem when running in PROD.
require('https').globalAgent.options.ca =
                            require('ssl-root-cas/latest').create();

// Use express's APIs:
const app = express();
// Import function to set up connection:
const { setUpConnection } = require('./model/mysql');

// Use busboy for file uploading:
app.use(busboy());

// Allow the app to parse application/x-www-form-urlencoded:
app.use(bodyParser.urlencoded({ extended: true }));  // After busboy

// Allow the app to parse application/json:
app.use(bodyParser.json());

// Add busboy body parser:
app.use(busboyBodyParser());

// Enable CORS:
app.use(cors());

// Enable public folder:
app.use(express.static(path.resolve(__dirname, './public')));

// Global route configuration:
app.use(require('./routes/index'));

// Prepare DB pool:
setUpConnection();

// Set up Express to start listening:
app.listen(process.env.PORT, () => {
	console.log('Server listening to port: ' + colors.green(process.env.PORT));
});
