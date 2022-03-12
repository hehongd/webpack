//1、使用ES6导入语法，导入jquery
import $ from 'jquery'
//导入样式（在webpack中，一切皆模块，都可以通过ES6导入语法进行导入和使用）
import '@/css/index.css'
import '@/css/index.less'

// 1. 导入图片，得到图片文件
import logo from '@/images/logo.png'
// console.log(logo) //打印出来的是base64的图片， 不需要额外发送请求
// 2. 给 img 标签的 src 动态赋值
$('.box').attr('src',logo)

//2、定义jquery的入口函数
$(function() {
    //3、实现寄偶行变色
    //寄数行为红色
    $('li:odd').css('background-color', 'red')
    $('li:even').css('background-color', 'yellow')
})



// 定义装饰器函数
function info(target) {
    // 为目标添加静态属性 info 
    target.info = 'Person info'
  }
 
 // 定义一个普通的类
 @info
 class Person {}
 console.log(Person.info)