const path = require("path");
const resolve = dir => path.join(__dirname, dir)
const webpack = require('webpack')

module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.0.190:8010',
                // 本地虚拟一个服务端接受你的请求，并代为转发
                changeOrigin: true,
                // 就是你准备用什么东西代替/api
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    },
    css: {
        //TODO 当测试时，不需要rem自适应，打开下边这个注释，并把它下边的loaderOption对象都注释调，重启项目即可
        // extract: true,
        loaderOptions: {
            // postcss: {
            //     plugins: [
            //         require('postcss-px2rem')({
            //             remUnit: 192  //TODO 目前咱们UI设计文稿宽度时1920， 这里就写192,以后有变动，就把他的宽度/10（应该是这样的，不对的话，百度吧）
            //         })
            //     ]
            // }
        }
    },
    configureWebpack: {
        resolve: { // 这里就是给src起别名的地方
            alias: {
                '@': resolve('src')
            }
        },
        plugins: [ // 这里可以将npm install 安装的模块设置成全局变量，不用在每个页面import xx from 'xx'后使用了
            new webpack.ProvidePlugin({
                '$': 'jquery'
            })
        ]
    }
}
