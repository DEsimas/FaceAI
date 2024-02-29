const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const path = require('path');

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
            port: 9000,
            hot: true,
            proxy: [
                {
                    context: ['/upload_images', '/select_face'],
                    target: 'http://26.113.24.68:8000',
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
                template: './src/index.html',
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
                }
            ]
        }
    };
}