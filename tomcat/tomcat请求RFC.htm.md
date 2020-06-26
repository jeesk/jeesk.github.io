公司tomcat从7.0.91更换到高版本的9.0.22以后，postman请求没问题，但是终端请求总是400

报Invalid character found in the request target. The valid characters are defined in RFC 7230 and RFC 3986错，

原因：

　　 RFC 3986规范定义了Url中只允许包含英文字母（a-zA-Z）、数字（0-9）、-_.~4个特殊字符以及所有保留字符(RFC3986中指定了以下字符为保留字符：! * ’ ( ) ; : @ & = + $ , / ? # [ ])。而我们的系统在通过地址传参时，在url中传了一段json，传入的参数中有”{“不在RFC3986中的保留字段中，所以会报这个错。

解决：

```
1、在tomcat的conf/server.xml 的Connector中添加：relaxedQueryChars="{}|[],%" relaxedPathChars="[]|{},%"   需要编码什么特殊字符添加什么。

<Connector port="8080" protocol="HTTP/1.1" connectionTimeout="20000"
**relaxedQueryChars="[]|{}\**`^\`"<>`\**" relaxedPathChars="[]|{}\**`^\`"<>`\**"** redirectPort="8443" />

有中文的话加上：`URIEncoding="UTF-8"。`

HTML5转义字符

numeric character reference（NCR），数字取值为目标字符的 Unicode code point；以「&#」开头的后接十进制数字，以「&#x」开头的后接十六进制数字。

https://dev.w3.org/html5/html-author/charref``

2、请求前编码：**URLEncoder.encode(param)**
```

>
>
>**Tips: 网上有些文章说在 catalina.properties  配置下面的, 其实根本没有效果的.**

```
org.apache.tomcat.util.buf.UDecoder.ALLOW_ENCODED_SLASH=true
tomcat.util.http.parser.HttpParser.requestTargetAllow=|{}
```

