var webpack = require('webpack');
const path = require('path');
var baseConfig = require('./webpack.config.production');

var config = Object.create(baseConfig);

config.resolve = {
  alias: {
    config: path.resolve('./config.staging.json')
  }
};

module.exports = config;
