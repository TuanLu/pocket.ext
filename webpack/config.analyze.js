let path = require('path'),
	webpack = require('webpack'),
	DedupCSSPlugin = require('dedupcss-webpack-plugin'),
	CompressionPlugin = require("compression-webpack-plugin"),
	BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: {
	},
	devtool: 'source-map',
	output: {
		path: path.join(__dirname, '..', 'dist', 'scripts'),
		filename: '[name].bundle.js'
	},
	mode: 'production',
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
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new DedupCSSPlugin({}),
		new webpack.optimize.AggressiveMergingPlugin(),
		new CompressionPlugin({
			asset: "[path].gz[query]",
			algorithm: "gzip",
		}),
		new BundleAnalyzerPlugin(),
	]
};