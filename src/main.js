require("babel-runtime/regenerator");
process.env.NODE_ENV === 'development' ? require('webpack-hot-middleware/client?reload=true') : '';
require('./assets/main.scss');
require('./index.html');
console.log(`Enviroment is ${process.env.NODE_ENV} + "dddd"`)