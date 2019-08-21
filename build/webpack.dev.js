/*
 * @Author: xuxueliang
 * @Date: 2019-04-09 14:55:22
 * @LastEditors: xuxueliang
 * @LastEditTime: 2019-08-19 17:06:39
 */
// webpack.dev.js
const merge = require('webpack-merge')
const path = require('path')
const common = require('./webpack.common.js')
const config = require('../config')
const utils = require('./utils')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const devWebpackConfig = merge(common, {
  devtool: config.dev.devtool,
  devServer: { // 启用开发服务器
    contentBase: './dist', // 告诉服务器从哪提供内容，只有在想要提供静态文件时才需要
    compress: true, // 一切服务都启用gzip 压缩
    host: '0.0.0.0', // 指定使用一个host，可用ip地址访问，没有的话如果别人访问会被禁止。默认localhost。
    port: '8080', // 指定端口号，如省略，默认为”8080“
    disableHostCheck: true,
    hot: true, // 启用模块热替换特性
    inline: true, // 启用内联模式，一段处理实时重载的脚本被插入到bundle中，并且构建消息会出现在浏览器控制台
    quiet: true, // necessary for FriendlyErrorsPlugin
    historyApiFallback: true // 开发单页应用时有用，依赖于HTML5 history API，设为true时所有跳转将指向index.html
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.HotModuleReplacementPlugin(), // webpack内置的热更新插件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ],
  mode: 'development'
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`]
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
