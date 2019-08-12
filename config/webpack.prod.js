const path = require("path");
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const helpers = require('./helpers');
const isDev = process.env.NODE_ENV !== 'production';
module.exports = env => {
    return {
        entry: {
            main: ["./src/main.js"]
        },
        mode: "production",
        output: {
            filename: "[name]-bundle.js",
            path: path.resolve(__dirname, "../dist"),
            publicPath: "/"
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
            // new ExtractTextPlugin("[name].css"),
            new OptimizeCssAssetsPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name]-[contenthash].css"
            }),
            new HTMLWebpackPlugin({
                template: "./src/index.html",
            }),
            new webpack.DefinePlugin({
                "process.env": {
                    NODE_ENV: JSON.stringify(env.NODE_ENV)
                }
            }),
            // new MinifyPlugin()
            new UglifyJSPlugin()
        ]
    }

}