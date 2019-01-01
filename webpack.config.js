const path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve(__dirname, './src/index.ts'),
    output: {
        filename: 'iterize.min.js',
        path: path.resolve(__dirname, 'lib/bundle')
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                resolve: {extensions: ['.ts']},
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-typescript'],
                        plugins: [
                            ["@babel/plugin-transform-modules-umd", {
                                "globals": {
                                    "iterize": "Iterize"
                                },
                                "exactGlobals": true
                            }],
                            "@babel/plugin-transform-runtime",
                            "@babel/plugin-proposal-class-properties"
                        ]
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};