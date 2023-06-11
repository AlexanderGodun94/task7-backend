const winston = require('winston');
const config = require('./../../config');
// const fileFormat = winston.format.combine(
//   winston.format.timestamp(),
//   winston.format.splat(),
//   winston.format.errors({stack: true}),
//   winston.format.printf(info => info.timestamp + ' | ' + info.level + ' | ' + info.message + ' | ' + (info.stack || ''))
// );

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.splat(),
  winston.format.errors({stack: true}),
  winston.format.printf(info => info.timestamp
    + ' | ' + info.level + ' | '
    + (info.message
      ? info.message.split('{').join('\n{')
      : 'no message ')
    + (info.stack
      ? (' | ' + info.stack)
      : '')
    + ((info.level.includes('error') && info.stackOfParentErr)
      ? ('\n' + info.timestamp + ' | stack of parent ' + info.level + ' | ' + info.stackOfParentErr)
      : '')
    + ((info.level.includes('error') || info.level.includes('warn'))
      ? ('\n' + info.timestamp + ' | ' + info.level + ' details in JSON | ' + JSON.stringify(info, null, 4))
      : '')
  )
);

const logger = winston.createLogger({
  level: config.loggingLevel || 'info',//error warn info verbose debug silly
  transports: [
    //new winston.transports.File({filename: 'error.log', level: 'error', format: fileFormat}),
    //new winston.transports.File({filename: 'combined.log', format: fileFormat}),
    new winston.transports.Console({format: consoleFormat})
  ],
  format: consoleFormat//can be deleted if need file transport
});

module.exports = logger;