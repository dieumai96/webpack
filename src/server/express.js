import express from "express";
const server = express();
const isProd = process.env.NODE_ENV === "production";
if (!isProd) {
    const webpack = require('webpack');
    const config = require('./../../config/webpack.dev.js');
    const compler = webpack(config);
    require("webpack-mild-compile")(compler);
    const webpackDevMiddleware = require('webpack-dev-middleware')(
        compler,
        config.devServer
    )
    const webpackHotMiddleware = require('webpack-hot-middleware')(compler, config.devServer);
    server.use(webpackDevMiddleware);
    server.use(webpackHotMiddleware);
}

const staticMiddleware = express.static("dist");
server.use(staticMiddleware);
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`Server listenning on PORT ${PORT}`);
})