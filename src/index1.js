//1、使用ES6导入语法，导入jquery
import $ from 'jquery'

//2、定义jquery的入口函数
$(function() {
    //3、实现寄偶行变色
    //寄数行为红色
    $('li:odd').css('background-color','red')
    $('li:even').css('background-color','pink')
})