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
debugger
server.listen(8080, () => {
    console.log("Server listenning");
})