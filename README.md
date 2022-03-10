
一.新建项目
1.新建项目空白目录，并且运行npm init -y命令，初始化包管理配置文件package.json
2.新建src源代码目录
3.新建src->index.html首页和src->index.js脚本文件
4.初始化首页基本的结构
5.运行npm install jquery -S命令，安装jQuery（-S是--save的简写）
6.通过ES6模块化方式导入jQuery,实现列表隔行变色效果

二.webpack的基本使用
1.安装webpack相关的两个包：npm install webpack@4.46.0 webpack-cli@4.9.2 -D（-D是--save-dev的简写）
2.webpack的配置
a.在项目跟目录中，创建名为webpack.config.js的webpack配置文件，并初始化如下的配置：
module.exports = {
    mode:"development" //mode用来指定构建模式，可选值有devalopment 和production。（devalopment开发模式，production发布和上线）
    //结论：开发时候一定要用development,因为追求的是打包的速度，而不是体积
    //反过来：发布上线的时候一定要用production,因为上线追求的是体积小，而不是打包速度快
}
b.在package.json的scripts节点下，新增dev脚本如下：
"scripts":{
    "dev":"webpack" //script 节点下的脚本，可以通过npm run 执行。列如npm run dev
}
c.webpack中的默认约定
在webpack4.x和5.x的版本中，有如下的默认约定：
1.默认的打包入口文件为src->index.js
2.默认的输出文件路径为dist->main.js
注意：可以在webpack.config.js中修改打包的默认的约定
d.自定义打包的入口与出口
在webpack.config.js配置文件中，通过entry节点指定打包的入口。通过output指定打包的出口。
const path = require('path') //导入 node.js 中专门操作路径的模块
module.exports = {
    entry: path.join(__dirname,'./src/index.js'), // 打包入口文件的路径
    output: {
        path: path.join(__dirname,'./dist'), // 输出文件的存放路径
        filename:'bundle.js' // 输出文件的名称
    }
}

三.webpack中的插件（预编译，保存代码自动更新界面）
1.webpack的作用
通过安装和配置第三方的插件，可以拓展webpack的能力，从而让webpack用起来更方便。最常用的webpack插件有如下两个：
a. webpack-dev-server 
   . 类似于 node.js 阶段用到的nodemon 工具
   . 每当修改了源代码，webpack 会自动进行项目的打包和构建
b. html-webpack-plugin
   . webpack 中的 HTML 插件（类似于一个模板引擎插件）
   . 可以通过此插件自定制 index.html 页面的内容
2.1 安装 webpack-dev-server
运行 npm install webpack webpack-cli --save-dev 或者指定版本号 npm install webpack-dev-server@3.11.2 -D （在根目录下隐藏一个js文件在硬盘中不可见）
2.2 配置 webpack-dev-server
a. 修改 package.json -> script 中的 dev 命令如下：
"scripts": {
    "dev": "webpack server", // script 节点下的脚本，可以通过 npm run 执行
}
b .再次运行 npm run dev 命令，重新运行项目的打包
c .在浏览器中访问 http://localhost:8080 地址，查看自动打包效果
注意：webpack-dev0server 会启动一个实时打包的 http 服务器
3.1 安装 html-webpack-plugin 
运行如下命令，即可在项目中安装此插件：
npm install html-webpack-plugin@4.5.0 -D (作用是可以把指定的页面复制一份放到根目录里面)
3.2 配置 html-webpack-plugin (webpack.config.js文件里配置)
// 1. 导入 HTML 插件，得到一个构造函数
const HtmlPlugin = require('html-webpack-plugin')
// 2. 创建 HTML 插件的实例对象
const htmlPlugin = new HtmlPlugin({
  template:'./src/index.html', // 指定源文件的存放路径
  filename:'./index.html', // 指定生成的文件的存放路径
})

module.exports = {
  mode'development',
  plugins:[htmlPlugin], // 3. 通过plugins节点，使 htmlPlugin 插件生效
}
3.3 解疑惑 html-webpack-plugin
a. 通过 HTML 插件复制到根目录中的index.html页面，也被放到了内存中
b. HTML 插件在生成index.html页面，自动注入了打包的bundle.js文件

4. devServer 节点
在webpack.config.js 配置文件中，可以通过devServer节点对webpack-dev-server插件进行更多的配置，
示例代码如下：
devServer: {
  open:true, // 初次打包完成后，自动打开浏览器
  host:'127.0.0.1', // 实时打包所使用的主机地址
  port:80, // 实时打包所使用的端口
}
注意：凡是修改了webpack.config.js配置文件，或者改了package.json配置文件，必须重启实时打包的服务器，
否则最新的配置文件无法生效

5. webpack 中的loader
a. loader 概述
在实际开发过程中，webpack默认只能打包处理以.js后缀名结尾的模块。其他非.js后缀结尾的模块，
webpack默认处理不了，需要调用loader加载器才可以正常打包，否则会报错!

loader 加载器的作用：协助webpack打包处理特定的文件模块。比如：
css-loader可以打包处理.css相关的文件
less-loader可以打包处理.less相关的文件
babel-loader可以打包处理webpack无法处理的高级JS语法

四.package.json说明
{
  "name": "change",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": { //项目在开发阶段和上线阶段都需要被用到
    "jquery": "^3.6.0" //npm install jquery -S(加-S后把jquery安装到dependencies节点下)
  }
  "devDependencies": {//只在开发阶段会用到
    "webpack": "^5.42.1", //npm install webpack@5.42.1 webpack-cli@4.7.2 -D (加上-D之后把这两个包记录在devDependencies节点下)
    "webpack-cli": "^4.7.2"
  }
}
