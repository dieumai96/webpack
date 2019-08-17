import express from "express";
import path from 'path';

const server = express();
const webpack = require('webpack');
const config = require('./../../config/webpack.dev');
const history = require('connect-history-api-fallback');

const compler = webpack(config);

const webpackDevMiddleware = require('webpack-dev-middleware')(
    compler,
    config.devServer
)

const webpackHotMiddleware = require('webpack-hot-middleware')(compler);
server.use(history({
    index: '/' 
}));
server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
const staticMiddleware = express.static("dist");

server.use(staticMiddleware);
server.listen(8080, () => {
    console.log("Server listenning");
})