const app=require("./app")
const http=require('http')
// var database = require("./config/db/db_config");


var host = process.env.HOST || '127.0.0.1';
var port = normalizePort(process.env.PORT || '3003');

var server = http.createServer(app);

server.listen(port, host, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Server listening at http://%s:%d', host, port);     
  });

  function normalizePort(val) {
    var port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
  
    if (port >= 0) {
      return port;
    }
  
    return false;
  }