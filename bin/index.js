/**
 * Created by zyg on 16/7/15.
 */

var winston = require('winston');

const __DEBUG__ = process.env.NODE_ENV !== 'product' && process.env.NODE_ENV !== 'production';

module.exports = function globalLog(config) {
  
  const outputLogFile = config.outputLogFile;
  
  const logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ 
        filename: outputLogFile
      })
    ]
  });

  logger.level = __DEBUG__ ? 'debug' : 'info';

  global.__DEBUG__ = __DEBUG__;

  //挂到全局
  global.log = function(){
    logger.info.apply(logger,arguments);
  };
  ['debug','error'].forEach(function (level) {
    global[level] = function(){
      logger[level].apply(logger,arguments);
    }
  });

};