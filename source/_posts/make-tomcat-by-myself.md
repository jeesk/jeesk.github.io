---
layout:	post
title: 30分钟手写一个Tomcat服务器
subtitle:   "不适合人类阅读，非常水的自我笔记"
copyright: true
date: 2019-02-25 22:00:28
author: 	"jeesk"
tags:
	-Tomcat
	-Java
---

>    	 阅读本教程需要了解Http协议, Java Socket,Java反射的等相关内容. 并且本篇文章只是实现简单的web服务器, 让大家了解其原理, 大拿请无视.下面是浏览器和web服务器的一段简单的请求和相应的内容, 通过请求和相应, 同时我们也可以简单了解http协议的规范.



##	1:  了解Http请求和响应

```html
浏览器的请求
GET /login?username=username&passwd=passwd&books=1&books=2 HTTP/1.1
// 访问的主机名
Host: localhost:8080
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: keep-alive
Cookie: menu=ad_menu_2_1; submenu=bidsInvitation
Upgrade-Insecure-Requests: 1

浏览器的响应
// http响应码 , 200 表示正常返回
HTTP/1.1 200 OK
//响应内容长度
Content-Length: 92
// 响应内容类型, text/json响应的就是json
Content-Type: text/html;charset=utf-8;
// 时间
DATE: Sat 23 Feb 2019 08:36:29 GMT
// 服务器名称
Server: Simple_Tomcat Server/0.0.1
// 响应的内容, 也就是我们在网页上面显示的东西
<html><head><title>Http响应</title></head><body>Hello tomcat 你好Tomcat</body></html>;
```



所谓的浏览器的交互,就是说浏览器解析响应, 服务器解析请求的一个过程. 

实现一个Tomcat服务器: 也就是说要解析浏览器的请求, 并且将要显示的内容返回给浏览器即可.

 ##	2:  实现简单的响应和请求

创建一个简单的maven项目, 然后复制下面的代码, 并在idea中启动main方法. 

```java
package io.github.jeesk;

import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;

public class Server {
  public static void main(String[] args) throws IOException {
      ServerSocket server = new ServerSocket(8080);
      // 获得从浏览器中请求,
      Socket client = server.accept();
      // 获得请求中的信息
      InputStream inputStream = client.getInputStream();
      byte[] bytes = new byte[2048];
      int len = inputStream.read(bytes);
      String requestInfo = new String(bytes, 0, len);
      System.out.println(requestInfo);
      server.close();
      client.close();
  }
}
```



浏览器中访问:  http://localhost:8080/login?username=username&passwd=passwd&books=1&books=2



那么在 idea 的控制台将会打印下列出现的内容:

```html
GET /login?username=username&passwd=passwd&books=1&books=2 HTTP/1.1
Host: localhost:8080
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:65.0) Gecko/20100101 Firefox/65.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: keep-alive
Upgrade-Insecure-Requests: 1
```

好的, 小伙伴们, 我们是不是已经得到了到了浏览器的请求信息呢? 那么接下来,我们给浏览器一个响应, 祟拜你写一段html内容 响应给浏览器

> 构造浏览器响应体

```java
// 创建系统常用常量, 用于构建响应体
package io.github.jeesk;
public class SysCon {
// 表示换行
  public final static String CRLF = ("\r\n");
  // 空格
  public final static String BLANK = (" ");

}
package io.github.jeesk;
import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;
public class Server2 {
  public static void main(String[] args) throws IOException {
      ServerSocket server = new ServerSocket(8080);
      // 获得从浏览器中请求,
      Socket client = server.accept();
      // 获得请求中的信息
      InputStream inputStream = client.getInputStream();
      byte[] bytes = new byte[2048];
      int len = inputStream.read(bytes);
      String requestInfo = new String(bytes, 0, len);
      System.out.println(requestInfo);

      StringBuilder content = new StringBuilder();
      content.append("<html><head><title>Http响应</title></head><body>Hello tomcat Http响应</body></html>;" + "");
      // 如果使用下面的json形式, 那么僵Content-type: 里面的html变成json即可.
      // content.append(" {\"name\":\"小强\",\"age\":16,\"msg\":[\"a\",\"b\"],\"regex\": \"^http://.*\"}");
      StringBuilder resp = new StringBuilder();
      // HTTP协议版本   状态码,描述
      resp.append("HTTP/1.1").append(SysCon.BLANK).append("200").append(SysCon.BLANK).append("OK").append(SysCon.CRLF);
      // 响应头
      resp.append("Server: Simple_Tomcat Server/0.0.1").append(SysCon.CRLF);
      resp.append("DATE:").append(new Date()).append(SysCon.CRLF);
      // text/json text/html
      resp.append("Content-type: text/html;charset=utf-8;").append(SysCon.CRLF);
      // 响应内容长度
      resp.append("Content-Length:").append(content.toString().getBytes().length).append(SysCon.CRLF);
      resp.append(SysCon.CRLF);
      resp.append(content);
      // 输出到网页上面
      BufferedWriter bufferedReader = new BufferedWriter(new OutputStreamWriter(client.getOutputStream()));
      bufferedReader.write(resp.toString());
      bufferedReader.flush();

      server.close();
      client.close();
  }
}
```

访问: http://localhost:8080

##	3:  提取Response

分析浏览器获得的响应:

1. 第一行为Http服务器的版本和状态码, 由于访问资源的不同状态码是不同的, 可以提取状态码为变量. 以设置不同的状态码提示信息

2. SERVER: 服务器版本号码, 不需要提取

3. DATE: 日期可以通过new Date()设置即可.

4. Content-type: 响应内容类型, 这里可以设置json, html,text等,本项目只展示html. 故不提取.

5. Content-length:  响应内容直接长度需要提取. 

   

Response代码如下: 

```java
package io.github.jeesk;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.net.Socket;
import java.util.Date;

public class Response {
  private int contengLength; // 响应内容字节长度
  private StringBuilder content;
  private StringBuilder headInfo;
  private BufferedWriter bw;
  public Response() {
      contengLength = 0;
      content = new StringBuilder();
      headInfo = new StringBuilder();
  }
  public Response(Socket client) {
      this();
      try {
          bw = new BufferedWriter(new OutputStreamWriter(client.getOutputStream()));
      } catch (IOException e) {
          e.printStackTrace();
      }

  }
  private Response createInfo(int code) {
      headInfo.append("HTTP/1.1").append(SysCon.BLANK).append(code).append(SysCon.BLANK);
      switch (code) {
          case 200:
              headInfo.append("OK");
              break;
          case 500:
              headInfo.append("SERVER IS ERROR");
              break;
          case 404:
              headInfo.append(" NOT FOUND!");
              break;
          default:
              break;
      }
      headInfo.append(SysCon.CRLF);
      // 响应头
      headInfo.append("Server: Simple_Tomcat Server/0.0.1").append(SysCon.CRLF);
      headInfo.append("DATE:").append(new Date()).append(SysCon.CRLF);
      // text/json text/html
      headInfo.append("Content-type: text/html;charset=utf-8;").append(SysCon.CRLF);
      // 响应内容长度, 作为变量可以随时改变
      headInfo.append("Content-Length:").append(content.toString().getBytes().length).append(SysCon.CRLF).append(SysCon.CRLF);
      return this;
  }
  public Response println(String appendContent) {
      if (appendContent == null) {
          throw new RuntimeException("appendContent is null ");
      }
      content.append(appendContent).append(SysCon.CRLF);
      contengLength += (appendContent + SysCon.CRLF).getBytes().length;
      return this;
  }
  public Response print(String appendContent) {
      if (appendContent == null) {
          throw new RuntimeException("appendContent is null ");
      }
      content.append(appendContent);
      contengLength += appendContent.getBytes().length;
      return this;
  }
  // 推送出去
  public void push(int code) {
      this.createInfo(code);
      try {
          bw.append(headInfo);
          bw.append(content);
          bw.flush();
      } catch (IOException e) {
          e.printStackTrace();
      }
  }
}
```



Server代码:

```java
package io.github.jeesk;

import java.io.BufferedWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.Date;

public class Server3 {
  public static void main(String[] args) throws IOException {
      ServerSocket server = new ServerSocket(8080);
      // 获得从浏览器中请求,
      Socket client = server.accept();
      // 获得请求中的信息
      InputStream inputStream = client.getInputStream();
      byte[] bytes = new byte[2048];
      int len = inputStream.read(bytes);
      String requestInfo = new String(bytes, 0, len);
      System.out.println(requestInfo);
      StringBuilder content = new StringBuilder();
      content.append("<html><head><title>Http响应</title></head><body>Hello tomcat , 你好 Tomcat</body></html>" );
      // 如果使用下面的json形式, 那么僵Content-type: 里面的html变成json即可.
      // content.append(" {\"name\":\"小强\",\"age\":16,\"msg\":[\"a\",\"b\"],\"regex\": \"^http://.*\"}");
      Response response = new Response(client);
      // 在网页上面要显示的内容
      response.print("<html><head><title>Http响应</title></head><body>Hello tomcat Http响应</body></html>");
      response.push(200);
      server.close();
      client.close();
  }
}
```

## 4:  提取Request

分析浏览器的请求:

1. 第一行请求头的请求, 我们可以获得请求的方式比如get还是post, 还可以拿到,包括请求的url. 甚至是参数. 

   

1. 今天暂时不讨论post方式的请求体的参数解析. 那么Request对象具有的字段:  method(请求方式),url(请求路劲), 请求头(第一行)
2. 请求的参数, 由于我们讨论的是get方式的请求方法, 那么参数只是在请求头里获取即可.  参数是以key:value的形式,也有可能是多选框, 也就是说一个key对应多个value.   那么参数可以抽象成功一个Map<String,List<String>>, 一个key,可以只有一个参数, 或者是多个参数. 当然我们自己写的页面当然知道什么key对应一个参数,还是key对应多个. 我们可以提供2个方法, 用于获得 字符串数组,和单个字符串的方法/

Request 代码如下



```java
package io.github.jeesk;

import lombok.Getter;
import lombok.Setter;

import javax.swing.plaf.FontUIResource;
import java.io.IOException;
import java.io.InputStream;
import java.net.Socket;
import java.util.*;
@Getter
@Setter
public class Request {
  private String url;
  private String method;
  private String requestInfo; // 请求头
  private Map<String, List<String>> paramValueMap;
  private InputStream is;
  public Request() {
      url = "";
      method = "";
      requestInfo = "";
      paramValueMap = new HashMap<>();
  }
  public Request(Socket client) {
      this();
      try {
          is = client.getInputStream();
          byte[] data = new byte[20480];
          int len = is.read(data);
          requestInfo = new String(data, 0, len);
          this.parseRequestInfo();
      } catch (IOException e) {
          e.printStackTrace();
      }
  }

  // 创建请求后, 解析头信息
  public void parseRequestInfo() throws IOException {
//     GET /login?username=username&passwd=passwd&books=1&books=2 HTTP/1.1
//       Host: localhost:8080
//       Connection: keep-alive
//       Cache-Control: max-age=0
//       Upgrade-Insecure-Requests: 1
//       User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36
//       DNT: 1
//       Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8
//       Accept-Encoding: gzip, deflate, br
//       Accept-Language: zh-CN,zh;q=0.9,en-US;q=0.8,en-GB;q=0.7,en;q=0.6
      // 获得请求信息的第一行
      int inx = requestInfo.indexOf(SysCon.CRLF);
      String firstLine = requestInfo.substring(0, inx);

      int index = firstLine.indexOf("/");// 获得第一个/的索引
      method = firstLine.substring(0, index).trim(); // 截取字符串获得method
      int index2 = firstLine.indexOf("HTTP/");// 获得HTTP/所在的索引.
      String pathAndParam = firstLine.substring(index, index2); // 访问路径   +   参数
      String[] split = pathAndParam.split("\\?"); // 通过问号分隔
      // 为了处理方便,这里暂时考虑路径和参数为空的情况
      url = split[0];
      String paramStr = split[1];
      // 解析请求参数成Map
      parseParamValue(paramStr);

  }
  public void parseParamValue(String str) {
      StringTokenizer stringTokenizer = new StringTokenizer(str, "&");
      while (stringTokenizer.hasMoreTokens()) {
          String keyAndValue = stringTokenizer.nextToken();
          String[] values = keyAndValue.split("=");
          if (values.length == 1) { // 只有key, 没有value
              Arrays.copyOf(values, 2);
              values[1] = "";
          }
          if (paramValueMap.get(values[0]) == null) { // 判断key是否存在
              paramValueMap.put(values[0], new ArrayList<String>());
          }
          paramValueMap.get(values[0]).add(values[1]); // 将解析的valule放到对应集合中
      }
  }
  /**
  * 获得指定key的数组
  *
  * @param key
  * @return
  */
  public String[] getParameterValues(String key) {
      if (key == null) {
          throw new RuntimeException("PARAM IS NULL!");
      }
      List<String> values = paramValueMap.get(key);
      if (values == null) {
          return null;
      }
      return values.toArray(new String[values.size()]);
  }
  /**
  * 获得单个key的value值
  *
  * @param key
  * @return
  */
  public String getParameter(String key) {
      if (key == null) {
          throw new RuntimeException("PARAM IS NULL!");
      }
      String[] parameterValues = getParameterValues(key);
      if (parameterValues == null) {
          return null;
      }
      return parameterValues[0];
  }

}
```



Server代码:

```java
package io.github.jeesk;

import java.io.IOException;
import java.io.InputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.util.List;
import java.util.Map;

public class Server4 {
  public static void main(String[] args) throws IOException {
      ServerSocket server = new ServerSocket(8080);
      // 获得从浏览器中请求,
      Socket client = server.accept();
      Request request = new Request(client);
      System.out.println(request.getMethod());
      System.out.println(request.getUrl());
      if (request.getParamValueMap().size() > 0) {
          Map<String, List<String>> paramValueMap = request.getParamValueMap();
          paramValueMap.forEach((x, y) -> {
              System.out.println(x + ":" + y);
          });
      }

      // 如果使用下面的json形式, 那么僵Content-type: 里面的html变成json即可.
      // content.append(" {\"name\":\"小强\",\"age\":16,\"msg\":[\"a\",\"b\"],\"regex\": \"^http://.*\"}");
      Response response = new Response(client);
      // 在网页上面要显示的内容
      response.print("<html><head><title>Http响应</title></head><body>Hello tomcat Http响应</body></html>");
      response.push(200);
      server.close();
      client.close();
  }
}
```



访问:  http://localhost:8080/login?username=username&passwd=passwd&books=1&books=2

在idea控制台打印出请求方式, 路径,还有参数. 

## 5:  封装Dispatcher和Servlet, 并且增加多线程处理Request

1. 封装DefaultServlet, 处理Response和Request
2. 由于现在请求一次服务器就关闭了,增加多线程处理, 避免阻塞.

 

## 6:  封装ServletContext,和使用xml文件配置Servlet包名和映射路径

5,6 的代码太多了, 暂时不贴了.  代码放在了github上面:  [https://github.com/jeesk/simpletomcat](https://github.com/jeesk/simpletomcat)

> ​     后面实现了默认登录不添加路劲跳转到首页登录框.  这就是实现了一个极其简单的tomcat服务器了. 并且可以放html文件到simple_4项目的webapp下面目录. 然后响应到浏览器.
>
> ​    项目实现了非常简单的请求解析, 但是功能太单一 . 如果有新兴趣可以慢慢完善.比如增加Filter, 增加Session, 增加网页的功能(集成freemarker), 使用注解简单的模拟Spring mvc等. 