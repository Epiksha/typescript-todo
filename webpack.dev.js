const common = require('./webpack.common.js');
const { merge } = require('webpack-merge');
const { join } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'development',

    devServer: {
        port: 3000,
        historyApiFallback: true,
        hot: true,
        liveReload: true,
        watchFiles: ['src/index.html']
    },

    // Loaders
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },

    output: {
        filename: '[name].bundle.js',
        path: join(__dirname, 'dist'),
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
        }),
    ],
});