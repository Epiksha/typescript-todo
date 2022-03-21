const { resolve } = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

module.exports = {
    entry: [
        './src/index.ts',
    ],

    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },

    plugins: [
        new ESLintPlugin(),
        new SpriteLoaderPlugin(),
    ],

    module: {
        rules: [
            {
                test: /\.ts?/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.html$/,
                loader: 'html-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource',
                include: [resolve(__dirname, 'src/assets/images')],
            },
            {
                test: /\.svg$/,
                include: [resolve(__dirname, 'src/assets/icons')],
                use: ['svg-sprite-loader', 'svgo-loader']
            },
        ],
    },

    resolve: {
        extensions: ['.ts', '.js'],
    },

    devtool: 'inline-source-map',
};