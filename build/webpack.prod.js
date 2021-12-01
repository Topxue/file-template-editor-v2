/** Created by xwp on 2021-11-10 **/
const {merge} = require('webpack-merge');
const {resolveApp} = require('./paths');
const common = require('./webpack.common')

module.exports = merge(common, {
  // 模式
  mode: 'production',
  // devtool: 'eval-cheap-module-source-map',
  // 输出
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: resolveApp('dist'),
    // 编译前清除目录
    clean: true
  },
})
