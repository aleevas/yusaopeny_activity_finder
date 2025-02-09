const path = require('path')

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    externals: {
      'vue-router': 'VueRouter',
      axios: 'axios',
      'bootstrap-vue': 'BootstrapVue'
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/scss/global.scss')]
    }
  }
}
