const path = require('path')

// 1. 导入 HTML 插件，得到一个构造函数
const HtmlPlugin = require('html-webpack-plugin')
    // 2. 创建 HTML 插件的实例对象
const htmlPlugin = new HtmlPlugin({
    template: './src/index.html', // 指定源文件的存放路径
    filename: './index.html', // 指定生成的文件的存放路径
})



//使用ES6的导出语法，向外导出一个webpack的配置对象
module.exports = {
    //代表webpack运行的模式，可选值有两个development和production
    //结论：开发时候一定要用development,因为追求的是打包的速度，而不是体积
    //反过来：发布上线的时候一定要用production,因为上线追求的是体积小，而不是打包速度快
    mode: 'development',
    // entry: '指定要处理哪个文件'
    entry: path.join(__dirname, './src/index1.js'),
    // 指定生成文件要存放到哪里
    output: {
        //存放到目录
        path: path.join(__dirname, 'dist'),
        // 生产的文件名
        filename: 'bundle.js'
    },
    // 3. 插件的数组，将来 webpack 在运行时，会加载并调用插件
    plugins: [htmlPlugin],
    devServer: {
        open: true, // 初次打包完成后，自动打开浏览器
        // host: '127.0.0.1', // 指定运行的地址，不指定默认就是http://localhost:8080/
        // port: 80, // 实时打包所使用的端口，不写默认就是80
    }
}