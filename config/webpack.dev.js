const path = require("path");
const { ContextReplacementPlugin, NamedModulesPlugin, HotModuleReplacementPlugin } = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const helpers = require('./helpers');
const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: {
        // vendor: './src/vendor.ts',
        // polyfills: './src/polyfills.ts',
        main: [
            "./src/main.js"
        ],
        polyfills: ["./src/angular-polyfills"],
        angular: [
            "./src/angular"
        ],
        // angular: isDev ? './src/angular.ts' : './src/angular.aot.ts',
        // polyfills: './src/angular-polyfills',
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
        historyApiFallback: true,
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
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: helpers.root('tsconfig.json')
                        }
                    },
                    'angular2-template-loader',
                    'angular-router-loader'
                ],
                exclude: [/node_modules/]
            },
            // {
            //     test: /\.s(a|c)ss$/,
            //     use: [
            //         {
            //             loader: 'css-loader'
            //         },

            //         {
            //             loader: 'sass-loader',
            //             options: {
            //                 includePaths: [
            //                     path.resolve(__dirname, './node_modules')
            //                 ]
            //             }
            //         }
            //     ]
            // },
            // {
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: 'style-loader'
            //         },
            //         {
            //             loader: 'css-loader'

            //         }
            //     ]
            // },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: isDev } },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: isDev,
                          },
                    },
                    'resolve-url-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDev,
                            includePaths: [
                                path.resolve(__dirname, './node_modules')
                            ]
                        }
                    },
                    // {
                    //     // Loader for webpack to process CSS with PostCSS
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         plugins: function () {
                    //             return [
                    //                 require('autoprefixer')
                    //             ];
                    //         }
                    //     }
                    // },
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
                test: /\.(png|jpg|gif|ico|woff(2)?|ttf|eot|svg)$/,
                exclude: [
                    /\.(js|jsx|mjs)$/,
                    /\.html$/,
                    /\.json$/,
                    /\.(less|config|variables|overrides)$/,
                ],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            sourceMap: isDev,
                            includePaths: [
                                path.resolve(__dirname, './node_modules')
                            ]
                        }
                    },

                ],
            },
            // {
            //     test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
            //     loader: '@ngtools/webpack'
            // }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(),
        new NamedModulesPlugin(),
        new ContextReplacementPlugin(
            /\@angular(\\|\/)core/,
            path.join(__dirname, "./src"),
            {}
        ),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            favicon: "./src/favicon.png",
            inject: true
        })
    ]
}