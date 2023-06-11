const express = require('express');
const fs = require('fs');

module.exports = function () {

  const app = this.app;

  app.route('/exportSwagger')
    .get((req, res) => {
      fs.createReadStream('docs_api/swagger.json').pipe(res);
    });

  app.use('/api/v1/documentation',
    express.static(__dirname + '/../../docs_api', {maxAge: '364d'})
  );

  app.use('/api/v1/statics',
    express.static(__dirname + '/../../statics', {maxAge: '364d'})
  );

};
