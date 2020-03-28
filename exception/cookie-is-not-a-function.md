##	浏览器控制台报 [$.cookie is not a function]  如何解决

1. 一个应用使用了多个tomcat的版本, 导致cookie 不兼容,解析失败. 建议重新清理浏览器缓存即可.
2. 项目没有引入 jquery.cookie.js 的文件
3. jQuery库文件和jquery.cookie.js文件的顺序问题。须先引入jQuery库文件再引入cookie插件文件
4. 一个页面引入了多次 jquery插件,导致读取异常.