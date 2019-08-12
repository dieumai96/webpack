// require("babel-runtime/regenerator");
// require('webpack-hot-middleware/client?reload=true');
require("./assets/nav.css");
require('./assets/main.css');
require('./index.html');
console.log(`Enviroment is ${process.env.NODE_ENV}`)
const globalVar = true;
const someThing = function (someArgument) {
    const logVariableName = someArgument;
    const result = function (logVariableName) {
        return logVariableName * logVariableName + globalVar
    }
    console.log(result);
}
