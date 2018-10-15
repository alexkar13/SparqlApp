const path = require('path');

module.exports = {
    devServer: {
        contentBase: "public"
    },
    devtool:'cheap-module-eval-source-map',
    entry: './src/index.tsx',
    mode:"development",
    module: {
        rules: [
            {
                test: /\.s?css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                exclude: /node_modules/,
                loader: "babel-loader",
                test: /\.(tsx?)|(js)$/,
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public')
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    }
};
