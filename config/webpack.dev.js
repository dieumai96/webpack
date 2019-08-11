const path = require("path");
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        main: [
            // "babel-runtime/regenerator",
            // "webpack-hot-middleware/client?reload=true",
            "./src/main.js"
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.scss']
    },
    mode: "development",
    output: {
        filename: "[name]-bundle.js",
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/"
    },
    devServer: {
        contentBase: "dist",
        overlay: true,
        hot: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: isDev } },
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ],
                include: helpers.root('src', 'assets')
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    'to-string-loader',
                    { loader: 'css-loader', options: { sourceMap: isDev } },
                    { loader: 'sass-loader', options: { sourceMap: isDev } }
                ],
                include: helpers.root('src', 'app')
            },
            {
                // HTML LOADER
                test: /\.html$/,
                use: [
                    {
                        loader: 'html-loader',
                    },

                ]
            },
            // image loader
            {
                test: /\.(png|jpg|gif|woff(2)?|ttf|eot|svg)$/,
                exclude: [
                    /\.(js|jsx|mjs)$/,
                    /\.html$/,
                    /\.json$/,
                    /\.(less|config|variables|overrides)$/,
                ],
                use: [
                    {
                        loader: 'file-loader'
                    },
                ],
            },


        ]
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(), 
        new webpack.NamedModulesPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
        })
    ]
}