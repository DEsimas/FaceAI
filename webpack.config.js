const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

module.exports = (env) => {
    return {
        mode: env.mode,
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist'),
            clean: true
        },
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        devServer: {
            static: {
                directory: path.join(__dirname, 'dist')
            },
            compress: true,
            port: process.env.PORT || 9000,
            hot: true,
            proxy: [
                {
                    context: ['/upload_images', '/select_faces'],
                    target: process.env.API,
                    changeOrigin: true
                }
            ]
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'],
            alias: {
                "@": path.resolve(__dirname, 'src')
            }
        },
        performance: {
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: './src/index.ejs',
                favicon: './src/Assets/favicon.ico'
            }),
            new Dotenv()
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: { sourceMap: true }
                        },
                        {
                            loader: 'sass-loader',
                            options: { sourceMap: true }
                        }
                    ]
                },
                {
                    test: /\.jpg|\.png|\.svg/,
                    type: 'asset/resource'
                }
            ]
        }
    };
}