const path = require('path');
const config = require('./webpack.dev.js');

delete config.serve;

module.exports = Object.assign(config, {
  mode: 'production',
  output: {
    path: path.join(__dirname, '../docs/dist'),
    publicPath: 'https://img.yzcdn.cn/zanui/vant/',
    filename: '[name].[hash:8].js',
    umdNamedDefine: true,
    chunkFilename: 'async_[name].[chunkhash:8].js'
  }
});
