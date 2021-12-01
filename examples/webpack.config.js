const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackUnusedScaner = require('webpack-unused-scaner');

module.exports = {
  target: 'node',
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    alias: {
      img: path.resolve(__dirname, 'images'),
      css: path.resolve(__dirname, 'styles'),
      js: path.resolve(__dirname, 'js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|webp)$/,
        use: ['file-loader'],
      },
      {
        // 标准 html 模板片段文件
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'less-loader',
            },
          ],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('index.css'),
    new WebpackUnusedScaner({
      // Source directories
      directories: [
        path.join(__dirname, 'js'),
        path.join(__dirname, 'images'),
        path.join(__dirname, 'styles'),
      ],
      // Exclude patterns
      exclude: ['**/*.test.js'],
      // Root directory (optional)
      root: __dirname,
      failOnUnused: false,
      remove: true,
    }),
  ],
};
