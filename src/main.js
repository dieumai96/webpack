require("babel-runtime/regenerator");
process.env.NODE_ENV === 'development' ? require('webpack-hot-middleware/client?reload=true') : '';
// import 'bootstrap';
require('./index.html');
// require('~bootstrap/scss/mixins/breakpoints');
// require("./../node_modules/bootstrap/dist/css/bootstrap.css");
// require("node_modules/typeface-exo/index.css")
// require("node_modules/roboto-fontface/css/roboto/roboto-fontface.css")
// require("node_modules/ionicons/scss/ionicons.scss")
// require("node_modules/@fortawesome/fontawesome-free/css/all.css")
// require("node_modules/socicon/css/socicon.css")
// require("node_modules/nebular-icons/scss/nebular-icons.scss")
// require("node_modules/angular-tree-component/dist/angular-tree-component.css")
// require("node_modules/pace-js/templates/pace-theme-flash.tmpl.css")
// require("node_modules/leaflet/dist/leaflet.css")
require("./app/@theme/styles/styles.scss")





require('./assets/main.scss');

console.log(`Enviroment is ${process.env.NODE_ENV} + "dddd"`)