const path = require('path')

// 1. 导入 HTML 插件，得到一个构造函数
const HtmlPlugin = require('html-webpack-plugin')
    // 2. 创建 HTML 插件的实例对象
const htmlPlugin = new HtmlPlugin({
    template: './src/index.html', // 指定源文件的存放路径
    filename: './index.html', // 指定生成的文件的存放路径
})

const { CleanWebpackPlugin } = require('clean-webpack-plugin')

//使用ES6的导出语法，向外导出一个webpack的配置对象
module.exports = {
    // 在开发调试阶段，建议大家都把 devetool 的值设置为 eval-source-map
    // devtool:'eval-source-map',
    // 在实际开发的时候，建议大家把 devtool 得到值设置为nosources-source-map 或者直接关闭 SourceMap
    devtool:'nosources-source-map',
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
        filename: 'js/bundle.js'
    },
    // 3. 插件的数组，将来 webpack 在运行时，会加载并调用插件
    plugins: [htmlPlugin,new CleanWebpackPlugin()],
    devServer: {
        open: true, // 初次打包完成后，自动打开浏览器
        // host: '127.0.0.1', // 指定运行的地址，不指定默认就是http://localhost:8080/
        // port: 80, // 实时打包所使用的端口，不写默认就是80
    },
    module: { // 所有第三方文件模块的匹配规则
        rules: [ // 文件后缀名的匹配规则
            // 处理 .css 文件的 loader 
            { test:/\.css$/,use:['style-loader','css-loader'] },
            // 处理 .less 文件的 loader
            { test:/\.less$/,use:['style-loader','css-loader','less-loader'] },
            // 处理图片文件的 loader
            // 如果需要调用的 loader 只有一个，则只传递一个字符串也行，如果有多个 loader,则必须指定数组
            // 在配置 url-loader 的时候，多个参数之间，使用 & 符合进行分隔
            { test:/\.jpg|png|gif$/,use:'url-loader?limit=470&outputPath=images' },
            // 使用 babel-loader 处理高级的 js 语法
            { test:/\.js$/,use:'babel-loader',exclude:/node_modules/ }
        ]
    },
    resolve: {
        alias: {
          // 告诉 webpack ,程序员写的代码，@符合表示 src 这一层目录
          '@':path.join(__dirname,'./src/')
        }
    }
}