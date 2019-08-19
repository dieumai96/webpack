const path = require("path");
const { HotModuleReplacementPlugin, ProvidePlugin } = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    entry: {
        main: ["./src/main.js"]
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
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader"
                    }
                ]
            },
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
                test: /\.s(a|c)ss$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader'
                    },

                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                path.resolve(__dirname, './node_modules')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'

                    }
                ]
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
        new VueLoaderPlugin(),
        new HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
        }),
        new ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        })
    ]
}