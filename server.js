
//Load HTTP module
require('dotenv').config({ path: __dirname + '/.env' });
var bodyParser = require("body-parser"),
  express = require('express'),
  config = require("./common/config"),
  app = express(),
  hostName = process.env.HOSTNAME || config.server.hostName,
  port = process.env.PORT || config.server.port,
  jsonwebtoken = require("jsonwebtoken");
indexRouter = require('./routes/root');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// maybe delete it when host to internet
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use('/', indexRouter);

app.use(function (req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function (err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

app.use((err, req, res, next) => {
  if (!err.message) err.message = 'Oh no, something went wrong!';
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(JSON.stringify(`Error Code: ${err.statusCode} - ${err.message}`));
})

//listen for request on port 3000, and as a callback function have the port listened on logged
app.listen(port, () => {
  console.log(`Server running at http://${hostName}:${port}/`);
});