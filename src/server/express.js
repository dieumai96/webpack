import express from "express";
import path from 'path';

const server = express();
const webpack = require('webpack');
const config = require('./../../config/webpack.dev');
const compler = webpack(config);

const webpackDevMiddleware = require('webpack-dev-middleware')(
    compler,
    config.devServer
)

const webpackHotMiddleware = require('webpack-hot-middleware')(compler);

server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);

const staticMiddleware = express.static("dist");
server.use(staticMiddleware);
// const expressStaticGzip = require('express-static-gzip');
// server.use(expressStaticGzip("dist", {
//     enableBrotli: true,
// }));

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log("Server listenning");
})