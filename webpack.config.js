const path = require('path')
//使用ES6的导出语法，向外导出一个webpack的配置对象
module.exports = {
    //代表webpack运行的模式，可选值有两个development和production
    //结论：开发时候一定要用development,因为追求的是打包的速度，而不是体积
    //反过来：发布上线的时候一定要用production,因为上线追求的是体积小，而不是打包速度快
    mode:'development',
    // entry: '指定要处理哪个文件'
    entry: path.join(__dirname,'./src/index1.js'),
    // 指定生成文件要存放到哪里
    output: {
        //存放到目录
        path: path.join(__dirname,'dist'),
        // 生产的文件名
        filename: 'bundle.js'
    }
}