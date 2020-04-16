
var express = require('express');
var cors = require('cors');
var path = require('path');
var routers=require("./src/routes/index")


var app = express();


// allow cross origin requests
// configure to only allow requests from certain origins
app.use(cors());

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
	next();
});



app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1', routers);
module.exports = app;
