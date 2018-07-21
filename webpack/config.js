let path = require('path'),
    webpack = require('webpack'),
    DedupCSSPlugin = require('dedupcss-webpack-plugin');

module.exports = {
    entry: {
        "background": './src/background/index.js',
        "content": './src/content/index.js',
        "popup": './src/popup/index.js',
        "options": './src/options/index.js',
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, '..', 'dist', 'scripts'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [
                    path.resolve(__dirname, '..', 'src')
                ],
                exclude: [
                    path.resolve(__dirname, '..', 'node_modules')
                ],
                options: {
                    babelrc: true,
                }
            },
            {
                test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg|png)(\?.*$|$)/,
                loader: 'url-loader?limit=100000'
            },
            {
                test: /\.(scss|sass|css)/,
                loader: 'style-loader!css-loader!resolve-url-loader!sass-loader'
            }
        ]
    },
    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'ENV': JSON.stringify(process.env.NODE_ENV),
            }
        }),
        new DedupCSSPlugin({}),
        new webpack.optimize.AggressiveMergingPlugin(),
    ]
};