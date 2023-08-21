path = require('path');
html = require('html-webpack-plugin');

module.exports = {
	entry: './source/functionality',
	devtool: 'inline-source-map',
	plugins:[new html({title: 'svg face generator',template:'./source/index.html'})],
	output:{
		filename: 'main.js',
    path:path.resolve(__dirname, 'output/distribution'),
		clean: true,
	},
	module: {rules: [{test: /\.css$/i, use: ['style-loader', 'css-loader']}]}
}
