const { webpackConfig, merge } = require('@rails/webpacker')
const TerserPlugin = require('terser-webpack-plugin')

const customConfig = {
  resolve: {
    extensions: [".scss", ".css", ".js", ".jsx"]
  },
  optimization: {
    minimizer: [
      new TerserPlugin(),
    ],
  }
}

module.exports = merge(webpackConfig, customConfig)
