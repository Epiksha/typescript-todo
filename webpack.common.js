const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const { resolve } = require('path');

module.exports = {
    // Entry Files
    entry: [
        './src/index.ts',
    ],

    // Loaders
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
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {},
                    },
                    'svgo-loader',
                ],
            },
            {
                test: /\.(woff|ttf|eot|jpe?g|png)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: 'assets/',
                    },
                },
            },
        ],
    },

    plugins: [
        new SpriteLoaderPlugin(),
    ],

    // Resolve 'import' declarations in files with the provided extensions
    resolve: {
        extensions: ['.ts', '.js'],
    },

    // Generate Source Map
    devtool: 'inline-source-map',

    // Output Location
    output: {
        path: resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
};