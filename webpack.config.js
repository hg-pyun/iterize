const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
        filename: 'iterize.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'Iterize',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                resolve: {extensions: ['.ts', '.js']},
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript'],
                        plugins: [
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            }
        ]
    }
};