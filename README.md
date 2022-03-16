<pre>
一.新建项目
1.新建项目空白目录，并且运行npm init -y命令，初始化包管理配置文件package.json
2.新建src源代码目录
3.新建src->index.html首页和src->index.js脚本文件
4.初始化首页基本的结构
5.运行npm install jquery -S命令，安装jQuery（-S是--save的简写）
6.通过ES6模块化方式导入jQuery,实现列表隔行变色效果

二.webpack的基本使用
1.安装webpack相关的两个包：npm install webpack@5.0.0 webpack-cli@4.9.2 -D（-D是--save-dev的简写）
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
b. 打包处理css文件
1> 运行 npm i style-loader css-loader -D 命令，安装处理css文件的loader
2> 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：
  module: { // 所有第三方文件模块的匹配规则
      rules: [ // 文件后缀名的匹配规则
          { test:/\.css$/,use:['style-loader','css-loader'] }
      ]
  }
其中，test 表示匹配的文件类型，use表示对应要调用的 loader
注意：
use 数组中指定的 loader 顺序是固定的
多个 loader 的调用顺序是：从后往前调用
c. 打包处理 less 文件
1> 运行 npm i less-loader@10.0.1 less@4.1.1 -D 命令
2> 在webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：
  module: { // 所有第三方文件模块的匹配规则
      rules: [ // 文件后缀名的匹配规则
          { test:/\.less$/,use:['style-loader','css-loader','less-loader'] }
      ]
  }
d. 打包处理样式表中与 url 路径相关的文件
1> 运行 npm i url-loader@4.1.1 file-loader@6.2.0 -D 命令
2> 在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：
  module: { // 所有第三方文件模块的匹配规则
      rules: [ // 文件后缀名的匹配规则
          { test:/\.jpg|png|gif$/,use:'url-loader?limit=22229' }
      ]
  }
其中 ？ 之后的是 loader 的参数项：
limit 用来指定图片的大小，单位是字节（byte）
只有 <= limit 大小的图片，才会被转为base64 格式的图片
e. 打包处理 js 文件中的高级语法
webpack 只能打包处理一部分高级的 javaScript 语法。对于那些webpack无法处理的高级 js 语法，需要借助于
 babel-loader 进行打包处理。例如 webpack 无法处理下面的 javaScript 代码：
 // 1. 定义了名为 info 的装饰器
 function info(target) {
   // 2.为目标添加静态属性 info 
   target.info = 'Person info'
 }

// 3. 为 Person 类应用 info 装饰器
@info
class Person {}
// 4. 打印 Person 的静态属性 info 
console.log(Person.info)

e.1 安装 babel-loader 相关的包
运行如下的命令安装对应的依赖包：
npm i babel-loader@8.2.2 @babel/core@7.14.6 @babel/plugin-proposal-decorators@7.14.5 -D
在 webpack.config.js 的 module -> rules 数组中，添加 loader 规则如下：
// 注意：必须使用 exclude 指定排除项：因为 node_modules 目录下的第三方包不需要被打包
{ test:/\.js$/,use:'babel-loader',exclude:/node_modules/ }

e.2 配置 babel-loader
在项目根目录下，创建名为 babel.config.js 的配置文件，定义 Babel 的配置如下：
module.exports = {
  //声明 babel 可用的插件
  plugins: [['@babel/plugin-proposal-decorators',{ legacy:true }]]
}
详情请参考 Babel 的官网 https://babeljs.io/docs/en/babel-plugin-proposal-decorators

f. 打包发布
1>  配置 webpack 的打包发布
在 package.json 文件的 scripts 节点下，新增 build 命令如下：
"scripts":{
  "dev":"webpack serve", //开发环境中，运行 dev 命令
  "build":"webpack --mode production" // 项目发布时，运行 build 命令
}
--model 是一个参数项，用来指定 webpack 的运行模式。production 代表生产环境，会对打包生成的文件进行代码压缩和性能优化。
注意：通过 --model 指定的参数项，会覆盖 webpack.config.js 中的 model 选项。
2> 把javaScript 文件统一生成到 js 目录中
在 webpack.config.js 配置文件的 output节点中，进行如下的配置：
output: {
  path:path.join(__dirname,'dist'),
  // 明确告诉 webpack 把生成的 bundle.js 文件存放到 dist 目录下的 js 子目录中
  filename:'js/bundle.js',
}
3> 把图片文件统一生成到 image 目录中
修改 webpack.config.js 中的 url-loader 配置项，新增 outputPath 选项即可指定图片文件的输出路径：
{
  test:/\.jpg|png|gif$/,
  use:{
    loader:'url-loader',
    options:{
      limit:22228,
      // 明确指定把打包生成的图片文件，存储到 dist 目录下的 image 文件夹中
      outputPath:'image',
    }
  }
}

4> 自动清理 dist 目录下的旧文件
为了在每次打包发布时自动清理掉 dist 目录中的旧文件，可以安装并配置 clean-webpack-plugin 插件：
// 1. 安装清理 dist 目录的 webpack 插件
npm install clean-webpack-plugin@3.0.0 -D
// 2. 按需导入插件、得到插件的构造函数之后，创建插件的实例对象
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const cleanPlugin = new CleanWebpackPlugin()
// 3. 把创建的 cleanPlugin 插件实例对象，挂载到 plugins 节点中
plugins:[htmlPlugin,cleanPlugin],// 挂载插件

g. Sourcce Map
1> 什么是 Source Map
Source Map 就是一个信息文件，里面存储着位置信息。也就是说，Source Map 文件中存储着压缩混淆后的代码，
所对应的转换前的位置。
有了它，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码，能够极大的方便后期的调试。
2> 默认 Source Map 的问题
开发环境下默认生成的 Source Map,记录的是生成后的代码位置。会导致运行时报错的行数与源代码的行数不一致的问题。
3> 解决默认 Source Map 的问题
开发环境下，推荐 webpack.config.js 中添加如下的配置，即可保证运行时报错的行数与源代码的行数保持一致：
module.exports = {
  mode:'development',
  // eval-source-map 仅限在'开发模式'下使用，不建议在'生产模式'下使用。
  // 此选项生成的 Source Map 能够保证 '运行时报错的行数'与'源代码的行数'保持一致
  devtool:'eval-source-map',
  // 省略其它配置项...   
}
4> 生产环境下是 Source Map 
在生产环境下，如果省略了 devtool 选项，则最终生成的文件中不包含Source Map。这能够防止源代码通过
Source Map 的形式暴露给别人。

4.1> 只定位行数不暴露源码
在生产环境下，如果只想定位报错的具体行数，且不想暴露源代码。此时可以将 devtool 的值设置为 nosources-source-map。
4.2> 定位行数且暴露源代码
在生产环境下，如果想在定位报错行数的同时，展示具体报错的源码。此时可以将 devtool 的值设置为 source-map。
采用此选项后，你应该将你的服务器配置为，不允许普通用户访问 Source map 文件!
5> Source Map 的最佳实践
a. 开发环境下：
    建议把 devtool 的值设置为 eval-source-map
    好处：可以精准定位到具体的错误
b. 生产环境下：
    建议关闭 Source Map 或将 devtool 的值设置为 nosources-source-map
    好处：防止源码泄露，提高网站的安全性

h.查找文件说明：
如果想用@符合代替src目录，需要在 webpack.config.js 文件中配置：
resolve:{
  alias:{
    // 告诉 webpack ,程序员写的代码，@符合表示 src 这一层目录
    '@':path.join(__dirname,'./src/')
  }
}
@表示 src 源码目录 列如src下有一个文件msg.js 导入文件 import msg from '@/msg'

i. 安装vuejs的调试工具
需要下载Vue_devtools_chrome6.0.12，我下载好了，打开chrome浏览器 更多工具 -> 扩展程序 ( 把下载好的插件（Vue_devtools_chrome6.0.12.crx）拖进来)，再把开发者模式点关闭，然后点击详情 -> 允许访问文件网址打开就可以了。



四.package.json说明
{
    "name": "change",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "dev": "webpack serve"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "dependencies": { //项目在开发阶段和上线阶段都需要被用到
        "jquery": "^3.6.0" //npm install jquery -S(加-S后把jquery安装到dependencies节点下)
    },
    "devDependencies": {  //只在开发阶段会用到
        "@babel/core": "^7.14.6",
        "@babel/plugin-proposal-decorators": "^7.14.5",
        "babel-loader": "^8.2.2",
        "css-loader": "^6.7.1",
        "file-loader": "^6.2.0",
        "html-webpack-plugin": "^4.5.0",
        "less": "^4.1.1",
        "less-loader": "^10.0.1",
        "style-loader": "^3.3.1",
        "url-loader": "^4.1.1",
        "webpack": "^5.0.0", //npm install webpack@5.42.1 webpack-cli@4.7.2 -D (加上-D之后把这两个包记录在devDependencies节点下)
        "webpack-cli": "^4.9.2",
        "webpack-dev-server": "^3.11.2"
    }
}
</pre>
