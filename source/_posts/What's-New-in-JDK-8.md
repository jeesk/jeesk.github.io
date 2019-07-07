---
layout:	post
title: JDK 8 新特性 （What's New in JDK 8）
subtitle:   "翻译"
copyright: true
date: 2019-06-28 08:20:28
author: 	"jeesk"
tags:
	- JAVA-DOC
---



#	JDK 8 新特性 （What's New in JDK 8）

- Java 程序语言

  - Lambda 表达式， Java8的新语言特性。 它们能够使你轻松的将 `功能` 参数化，或者是代码作为数据传递。 Lambda 表达式允许你更加 紧凑的标识单个方法的接口（也叫函数式接口）。
  - 为已经有了名字的方法提供了 Lambda方法引用，更加易于阅读。
  -  接口可以拥有默认方法， 并且可以和老版本编写的代码能够二进制兼容。
  - 注解提供重复标记的功能。（ Ex： @Repeatable）。
  - 类型注解提供了在使用注解的地方，而不仅仅是申明。与可插拔类型系统一起使用的时候， ， 此功能可以改进代码的类型检查。 
  - 改进类型推断。
  - 方法参数反射功能。

- 集合 （ Collections）

   - 新增 `java.util.stream` 包，提供了 Stream Api 支持函数式编程。 Stream Api 可以集成到Collections Api， 可以对集合批量操作， 比如  顺序 或者是并行 map-reduce 转换。

   - 关键冲突的 HashMaps 的性能提升

     

- Compact Profiles 包含的Java SE 预定义的子集， 小型设备上不需要按扎安装整个库，就能运行这些应用程序。

- 安全 （ Security ）

   - 默认启动客户端 TLS 1.2 (安全传输层协议)。

   - 新的变体 AccessController.doPrivileged 代码能够断言其特权的子集 ， 而不会阻止短暂的完整遍历来检查其他权限。

   - 更加强大的加密算法支持。

   - SSL/TLS 服务管理拓展支持 JSSE Sever。

   - 支持 AEAD 算法。   SUNJCE 提供程序支持 AES/GCM/ NOPadding 密码，实现 GCM 算法参数。

     SunJSSE 提供了基于密码套件的增强模式AEAD 。 详情请看 Oracel 提供文档  JEP 115;。

  -	秘钥库增加 包括新的 `java.security.DomainLoadStoreParameter` ， 新的命令选项 `importpassword`

  -	SHA-224 信息摘要

  -	增强 NSA 套件 B 的密码支持

  -	增强 高随机数生成

  -	 新的 `java.security.cert.PKIXRevocationChecker`  配置 X.509 吊销检查新类

  -	 适用于Window 64 位的 PLCS11 

  -	New rcache Types in Kerberos 5 Replay Caching

  -	Support for Kerberos 5 Protocol Transition and Constrained Delegation

  -	Kerberos 5 weak encryption types disabled by default

  -	Unbound SASL for the GSS-API/Kerberos 5 mechanism

  -	 多个主机名的 SASL 服务

  -	 JNI 桥接到Mac Osx 的本地JGSS上

  -	Support for stronger strength ephemeral DH keys in the SunJSSE provider

  -	Support for server-side cipher suites preference customization in JSSE

- JavaFX

  	- 新的 Mondena 主题 已经在正式版本中发布了。
  
  	-	SwingNode class 可以帮助开发者将Swing 的带入到JavaFx 应用中 .
  
  	-	新的UI 控制  [`DatePicker`](http://docs.oracle.com/javase/8/javafx/api/javafx/scene/control/DatePicker.html) and the [`TreeTableView`](http://docs.oracle.com/javase/8/javafx/api/javafx/scene/control/TreeTableView.html) 。
  
  	-	`javafx.print` 包提供了 JavaFX 打印API。 详情 [javadoc](http://docs.oracle.com/javase/8/javafx/api/javafx/print/package-summary.html) 。
  
  	-	3D 绘图工具 包括 3D 图形， 相机， 灯光，子场景， 材质 拾取， 抗锯齿等。

  	  ```
  	  Shape3D (Box, Cylinder, MeshView, and Sphere subclasses), SubScene, Material, PickResult, LightBase (AmbientLight and PointLight subclasses) , and SceneAntialiasing API classes ， 已经增加到JavaFX 3D 图形库中。
  	  ```
  	
   - 改进了 `WebView` class， 并且提供了新特性支持HTML5， 和Web Sockets, Web Workers 和Web Fonts。

   - 增强的文本包括双向文本和复杂的文本脚本 ， 如控件的泰语和印地语言。 

   - 此版本增加了 HI-DPI 显示。

   - CSS Styleable* 成为了 公共的 API， 详情请看文档 [`javafx.css`](http://docs.oracle.com/javase/8/javafx/api/javafx/css/package-frame.html) 

   - [`ScheduledService`](http://docs.oracle.com/javase/8/javafx/api/javafx/concurrent/ScheduledService.html)  支持自动重启服务。

   - JavaFX 现在可用于 ARM 平台， 包括 JavaFX 的基础库， 图形，控制组件。

- Tools

   - `jjs`  命令提供了 Nashorn 引擎。
   - `java` 命令 启动JavaFX 应用。
   
   - `java` man 手册已经被重新设计 。
   - `jdeps` 命令行提供了 class 文件分析工具.
   
   - Java Management Extensions (JMX)  提供了 对诊断命令的远程访问。
   - `jarsigner` 拱了 提供了对单个时间戳请求钱敏的 认证。-
   
   - [Javac tool](http://docs.oracle.com/javase/8/docs/technotes/guides/javac/index.html)
   
     - 该命令的 -parameters 选项可用于存储形式参数名称 ， 并且能够使用  `Reflection API ` 来检索形式参数名称。
   -  现在， `javac` 命令 可以正确实施 Java 语言规范 第 15.21 节中的相等运算符规则。
      - `javac` 命令支持 检查 javac 注释中的内容， 改查找可能导致javadoc运行时生成的文件中的各种问题。
   - 现在， `javac tool` 提供了可以更具需要生成本地头。这样就无需将javah 工具作为构建管道中的单独步骤运行。 javac 通过使用`new -h` 选项启动改功能。
    - javadoc tool
      - `javadoc ` tool 支持 DocTrcc API 能够是你的javadoc 注释 作为抽象语法遍历。
      - `javadoc` tool 支持 新的Javadoc 访问api， 能够是你直接从 Java 引用程序调用Javadoc 工具， 而无需执行新的进程。   详情请看 文档  [javadoc](http://docs.oracle.com/javase/8/docs/technotes/guides/javadoc/whatsnew-8.html) 
      - 该`javadoc`工具现在支持检查`javadoc`注释的内容，以查找可能导致`javadoc`运行时生成的文件中的各种问题（例如无效的HTML或可访问性问题）的问题。
-	[ 国际化 Internationalization](http://docs.oracle.com/javase/8/docs/technotes/guides/intl/enhancements.8.html)

    -	Unicode 加强 ， 支持 Unicode 6.2.0
    -	采用 Unicode CLDR 数据和  `java.locale.providers` 系统属性。
    -	新的日历 和Locale API
    -	能够自定义资源包安装为拓展

-	[部署 Deployment](http://docs.oracle.com/javase/8/docs/technotes/guides/jweb/enhancements-8.html)

   	-	沙箱小程序和 Java Web Start 应用程序，  URlPermission 现在允许链接返回到启动他们的服务器。 SocketPermission 却不在被允许。
      	-	所有安全级别的 JAR 包 清单中都需要 Permission 属性。

-	Date-Time Package 一组新的包， 提供了 全面的日期时间模型。

-	脚本 (Scripting)

   - Rhino javascript引擎已被[Nashorn](http://docs.oracle.com/javase/8/docs/technotes/guides/scripting/nashorn/) Javascript引擎取代。

-	Pack200

   - Pack200 支持常量此 和新的字节码 ， 由JSR 292 引入。
   - JDK8 支持JSR-292，JSR-308 和 JSR-225 指定的类文件更改。

-	IO and NIO

   -	新的 SelectorProvider 基于 Solaries 时间端口机制。 要使用，请在系统属性`java.nio.channels.spi.Selector`设置为值的情况下运行`sun.nio.ch.EventPortSelectorProvider`。
   -	减少了 <JDK_HOME>/jre/Lib/charset.jar 的文件大小。
   -	String(byte[] ,*) 构造器 和 `java.lang.String.getBytes()` 方法的性能提升。

-	java.lang and java.util 包

   	-	并行数组排序
      	-	标准编码和解码 Base64
              	-	无符号算术支持。

-	JDBC

   	-	JDBC-ODBC  桥接已经被移除。
      	-	JDBC 4.2 引入了新特性。

-	JAVA DB

   	-	JDK8 支持 JAVA DB 10.10

 - NetWorking

   - 新增 ` `java.net.URLPermission类
   - 如果安装了安全管理器， 调用 `java.net.HttpURLConnection` 打开一个连接， 需要权限。

-	并发相关 (Concurrency)

    -	类和接口 增加到了 `java.util.concurrent`
   -	已经将 `java.util.concurrent.ConcurrentHashMap` class 增加到了支持新增加的Lambda 表达式的聚合操作中。
   -	`java.util.concurrent.atomic` 包中支持可伸缩可更新的变量。
   -	`java.util.concurrent.ForkJoinPool` 支持 公共水池。
   -	`java.util.concurrent.locks.StampedLock`  已经提供了基于能力的锁，提供了3中模式控制 读写访问。

-	[Java XML](http://docs.oracle.com/javase/8/docs/technotes/guides/xml/enhancements.html) - [JAXP](http://docs.oracle.com/javase/8/docs/technotes/guides/xml/jaxp/enhancements-8.html)

-	HotSpot

    - 硬件支持 AES 加密算法， 在`UseAES`和`UseAESIntrinsics`标志是可用的启用Intel硬件的基于硬件的AES内部函数。硬件必须是2010或更新的Westmere硬件。

      

   -	**注意：** AES内在函数仅受服务器VM支持。

     例如，要启用硬件AES，请使用以下标志：

     ```
     -XX：+ UseAES -XX：+ UseAESIntrinsics
     ```

     要禁用硬件AES，请使用以下标志：

     ```
     -XX：-UseAES -XX：-UseAESIntrinsics
     ```

   -	去除 PermGen (永久代)

   -	方法调用支持Java 编程语言中的缺省方法。

-	[Java Mission Control 5.3发行说明](http://www.oracle.com/technetwork/java/javase/jmc53-release-notes-2157171.html)

   	-	JDK 8包括Java Mission Control 5.3。



---------------------



1. [原文文档地址](https://www.oracle.com/technetwork/java/javase/8-whats-new-2157071.html)

2. 部分参考谷歌翻译

   

