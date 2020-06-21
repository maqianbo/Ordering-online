module.exports = {
  //   lintOnSave：{ type:Boolean default:true } 问你是否使用eslint
  lintOnSave: false,

  // productionSourceMap：{ type:Bollean,default:true } 生产源映射
  // 如果您不需要生产时的源映射，那么将此设置为false可以加速生产构建
  productionSourceMap: false,
  publicPath: './',
  // devServer:{type:Object} 3个属性host,port,https
  // 它支持webPack-dev-server的所有选项
  devServer: {
    port: 9000, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      '/bqtqxpt': {
        target: 'http://tong.csscone.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/bqtqxpt': '/bqtqxpt'
        }
      },
      '/qywxgdzs': {
        target: 'http://tong.csscone.com',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/qywxgdzs': '/qywxgdzs'
        }
      },
    },
  },
}