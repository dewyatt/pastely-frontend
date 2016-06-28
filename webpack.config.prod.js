const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const validate = require('webpack-validator');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  style: [path.join(__dirname, 'src', 'main.css'),
        path.join(__dirname, 'src/fontello/css/fontello.css'),
        path.join(__dirname, 'node_modules/muicss/lib/css/mui.min.css')]
};

const config = {
  devtool: 'source-map',
  entry: {
    style: PATHS.style,
    app: PATHS.src,
    vendor: ['react', 'react-dom', 'brace', 'react-ace', 'muicss'],
  },
  output: {
    path: PATHS.dist,
    publicPath: '/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name][chunkhash].chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
        exclude: './node_modules/'
      },
      {
        test: /\.jsx?$/,
        include: PATHS.src,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
        include: PATHS.style,
      },
      {
        test: /\.woff2?\?(\d+)$/,
        loader: 'file?name=font/[name].[ext]'
      },
      {
        test: /\.ttf\?(\d+)$/,
        loader: 'file?name=font/[name].[ext]'
      },
      {
        test: /\.svg\?(\d+)$/,
        loader: 'file?name=font/[name].[ext]'
      },
      {
        test: /\.eot\?(\d+)$/,
        loader: 'file?name=font/[name].[ext]'
      },
    ]
  },
  resolve: {
    alias: {
      config: path.resolve('./config.prod.json')
    }
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.DedupePlugin(),
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.html'),
      filename: 'index.html',
      inject: 'body',
      chunks: ['manifest', 'vendor', 'style', 'app'],
      chunksSortMode: 'none'
    }),
    new ExtractTextPlugin('[name].[contenthash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
};

module.exports = validate(config);
