const common = require('./webpack.common.js');
const { join } = require('path');
const { merge } = require('webpack-merge');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',

    output: {
        filename: 'bundle.[hash].js',
        path: join(__dirname, 'dist'),
    },

    optimization: {
        minimizer: [
            new HtmlWebpackPlugin({
                template: 'src/public/index.html',
                minify: {
                    removeAttrbuteQuotes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                },
            }),
            new CssMinimizerPlugin(),
            new MinifyPlugin(),
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].[contentHash].css",
        }),
        new CleanWebpackPlugin(),
    ],
    
    module: {
        rules: [
            {
                test: /\.s?css$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
});