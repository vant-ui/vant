var webpack = require('webpack');
var config = require('./webpack.config.dev.js');

config.entry = {
  'vant': './src/index.js'
};

config.output = {
  filename: './lib/[name].js',
  library: 'vant',
  libraryTarget: 'umd',
  umdNamedDefine: true
};

config.externals = {
  vue: {
    root: 'Vue',
    commonjs: 'vue',
    commonjs2: 'vue',
    amd: 'vue'
  }
};

config.plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    options: {
      babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime', 'transform-vue-jsx']
      },
      vue: {
        autoprefixer: false,
        preserveWhitespace: false
      }
    }
  })
];

delete config.devtool;

module.exports = config;
