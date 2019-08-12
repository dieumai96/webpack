require("babel-runtime/regenerator");
require('webpack-hot-middleware/client?reload=true');
require('./assets/main.css');
require('./index.html');
console.log(`Enviroment is ${process.env.NODE_ENV} + "dddd"`)