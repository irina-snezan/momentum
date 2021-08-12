const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const dev = 'development';

const esLintPlugin = (isDev) => isDev ? [] : [new ESLintPlugin({ extensions: ['js'] })];

module.exports = {
	mode: dev,
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		assetModuleFilename: 'assets/[name][ext]',
	},

	module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|svg|jpg|jpeg)$/i,
        type: 'asset/resource',
			},
			{
			test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
	},
	
	plugins: [
		 ...esLintPlugin(dev),
    new HtmlWebpackPlugin({
          template: path.resolve(__dirname, './src/js/index.html'),
		}),
		new CopyWebpackPlugin({
          patterns: [{
                  from: path.resolve(__dirname, 'src/assets'),
                  to: path.resolve(__dirname, 'dist/assets')
                }],
		}),
		new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
		 new CleanWebpackPlugin({
			 cleanStaleWebpackAssets: false
		 }),
	],
	 devServer: {
    open: true,
    hot: true,
    port: 8080,
  },
};