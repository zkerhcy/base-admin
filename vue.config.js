const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

// 项目部署基础
// 默认情况下，我们假设你的应用将被部署在域的根目录下,
// 例如：https://www.my-app.com/
// 默认：'/'
// 如果您的应用程序部署在子路径中，则需要在这指定子路径
// 例如：https://www.foobar.com/my-app/
// 需要将它改为'/my-app/'
const BASE_URL = process.env.NODE_ENV === 'production' ? '/base-admin/' : '/'

const configureWebpack =
  process.env.NODE_ENV === 'production'
    ? {
      optimization: {
        splitChunks: {
          cacheGroups: {
            iview: {
              test: /(iview)/,
              name: 'vendor_1',
              chunks: 'all'
            },
            echarts: {
              test: /(echarts|zrender)/,
              name: 'vendor_2',
              chunks: 'all'
            },
            buz: {
              test: /[\\/]src[\\/]/,
              name: 'buz',
              chunks: 'all'
            },
            commons: {
              chunks: 'all',
              minChunks: 2,
              name: 'commons'
            }
          }
        }
      }
    }
    : {}

module.exports = {
  // Project deployment base
  // By default we assume your app will be deployed at the root of a domain,
  // e.g. https://www.my-app.com/
  // If your app is deployed at a sub-path, you will need to specify that
  // sub-path here. For example, if your app is deployed at
  // https://www.foobar.com/my-app/
  // then change this to '/my-app/'
  publicPath: BASE_URL,

  configureWebpack,

  // tweak internal webpack configuration.
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@c', resolve('src/components'))
      .set('@v', resolve('src/views'))
      .set('@@c', resolve('src/views/components'))
      .set('@api', resolve('src/api'))
      .set('@lib', resolve('src/lib'))
      .set('@conf', resolve('src/config'))
      .set('@styl', resolve('src/style'))
      .set('@res', resolve('src/assets'))
      .set('@icon', resolve('src/assets/icons'))
      .set('@img', resolve('src/assets/images'))
    config.externals({
      // 'BaiduMap': 'BMap'
      // 'AMap': 'AMap'
    })
  },

  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },

  // 打包时不生成.map文件
  // productionSourceMap: false
  productionSourceMap: false,

  devServer: {
    // 这里写你调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    proxy: 'http://localhost:8080/', // public
    disableHostCheck: true
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, 'src/style/global.less'), // global custom less file.
        path.resolve(__dirname, 'src/style/util.less')
      ]
    }
  }
}
