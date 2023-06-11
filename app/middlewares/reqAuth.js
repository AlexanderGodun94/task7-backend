const expressJwt = require('express-jwt');
const config = require('../../config.js');
const errorMessages = require('./../services/errorMessages.js');

module.exports = expressJwt({
  secret: config.server.secret, fail: (req, res) => {
    if (!req.headers.authorization) res.send(400, errorMessages.MISSING_AUTHORIZATION_HEADER);
    res.send(401);
  }
});
