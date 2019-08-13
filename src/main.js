require("babel-runtime/regenerator");
process.env.NODE_ENV === 'development' ? require('webpack-hot-middleware/client?reload=true') : '';

require('./index.html');
require('./assets/main.scss');
console.log(`Enviroment is ${process.env.NODE_ENV} + "dddd"`)