const morgan = require('morgan');

const morganConfig = morgan(':method :url :status :res[content-length] - :response-time ms');

module.exports = morganConfig;