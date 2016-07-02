const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const validate = require('webpack-validator');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist'),
  style: [path.join(__dirname, 'src', 'main.css'),
        path.join(__dirname, 'src/fontello/css/fontello.css'),
      path.join(__dirname, 'node_modules/muicss/lib/css/mui.min.css')]
};

const config = {
  devtool: 'cheap-module-source-map',
  entry: {
    app: PATHS.src, //path.join(PATHS.src, 'main'),
    style: PATHS.style,
  },
  output: {
    path: PATHS.dist,
    publicPath: '/',
    //filename: 'bundle.js'
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
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
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0', 'react'],
          cacheDirectory: true
        }
      },
      {
        test: /\.jsx?$/,
        include: PATHS.src,
        loader: 'eslint',
      },
      {
        test: /\.css$/,
        include: PATHS.style,
        loaders: ['style', 'css'] //'style-loader!css-loader'
      },
      {
        test: /\.woff2?\?(\d+)$/,
        loader: 'file?name=font/[name].[ext]',
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
      config: path.resolve('./config.local.json')
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(PATHS.src, 'index.html'),
      filename: 'index.html',
      inject: 'body',
    }),
  ],
};

module.exports = validate(config);
