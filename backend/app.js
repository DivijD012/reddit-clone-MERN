// require express and bodyParser
const  express = require("express");
const  bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();
const mongoose = require('mongoose')

// Import DB Connection
require("./config/db");

mongoose.set('strictQuery', true);

// Import API route
var routes = require('./api/routes/userRoutes'); //importing route

// create express app
const  app = express();

// define port to run express app
const  port = process.env.PORT || 3000;

// use bodyParser middleware on express app
app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());
app.use(cors());

routes(app);

// Add endpoint
app.get('/', (req, res) => {
res.send("Hello World");
});


// Listen to server
app.listen(port, () => {

console.log(`Server running at http://localhost:${port}`);
});

