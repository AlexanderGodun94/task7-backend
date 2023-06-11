const express = require('express.oi');
const bodyParser = require('body-parser');
const config = require('./config');
const AppError = require('./app/services/error');
const errorMessages = require('./app/services/errorMessages');
const controllers = require('./app/controllers');
const db = require('./app/services/db');
const prepareDb = require('./app/services/prepareDb');

const app = express().http().io();
const port = config.server.port;

app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(bodyParser.urlencoded({
  extended: false
}));


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.use('/uploads', express.static(__dirname + '/uploads', {
  maxAge: '364d'
}));

controllers.forEach(controller => controller.apply({app}));

app.use(function (err, req, res, next) {
  if (err.code === 'credentials_required') {
    res.status(401).send({
      status: 401,
      message: errorMessages.MISSING_AUTHORIZATION_HEADER,
      err: err
    });
  }
  if (err.code === 'invalid_token')
    res.status(401).send({
      status: 401,
      message: errorMessages.INVALID_TOKEN,
      err: err
    });
});

db.getSequelize().sync({force: false, alter: true})
  .then(async () => {
    console.log('Models synced');
    await prepareDb.prepareAllInstances();
    console.log('All instances prepared');

    console.log('Start Task4-backend, port:' + port);
    return app.listen(port);
  })
  .catch(err => {
    if (!(err instanceof AppError)) new AppError({err: err});
  });
