---
title: 关于Java技术
copyright: true
date: 2019-06-29 19:43:54
tags:
	- JAVA-DOC
---

###	关于Java技术

​	 java 技术是一种语言， 也是一种平台。

   #### 	Java 编程语言

​	Java 编程语言是一种高级语言， 可以用下面的流行语词

​	

|   简单   | 架构中立 |
| :------: | -------- |
| 面向对象 | 便携性   |
|  分布式  | 高性能   |
|  多线程  | 强大的   |
|   动态   | 安全     |

 上面提到的每个流行词都是都可以在  [*Java Language Environment*](http://www.oracle.com/technetwork/java/langenv-140151.html) ,

中得到解释，是由James Gosling和Henry McGilton编写的白皮书。



在 Java 程序语言中， 所有的源代码都是 `.java` 为后缀的拓展资源。 这些资源文件被 `javac` 编译命令放到了一个 A.class 文件， 其中并不包含本地进程处理的原生代码，而是包含了 由  `Java Virtual Machine` (JVM)编译后的字节码文件。 Java 应用并不是运行在你的桌面， 而是运行在你的 JVM 上。

![](img/getStarted-compiler.gif)



 同一个 class 文件,因为JVM 的缘故可以在不同的操作系统上面运行， 比如 WIndow, solaries, Linux Or Mac os.  甚至是 Java SE Hotspot 虚拟机上面， JVM在运行的时候， 会执行其他的步骤， 以提高应用运行的性能。 包括查找性能瓶颈， 重编译你经常使用的代码。

![](img/helloWorld.gif)

> ​	通过JVM， 同一个应用可以运行在 多个平台上面。



###	Java 平台

无论什么程序运行都需要一个硬件或者是软件的环境。  我们在前面的章节已经提及了大量流行的平台 ， 比如Microsoft Window， LInux， Solaris  和Mac os.   大多数的平台都可以被描述成操作系统和硬件的结合。

Java 平台和其他的平台不同的地方是， 它是一个运行在软件上面的平台。

Java 平台的2种组件：

-	Java 虚拟机
-	Java 应用程序接口

现在，你已经了解了一些关于 JVM 的内容了。 它是一个基于Java 平台， 并且可以移植到基于硬件的平台。

API 是大量现存的软件组件，提供了很多有用的功能。  它被分成了 类和 接口。 

这些库文件就是我们所接触到的包。 下一个章节， 就是 Java 技术 能够做些什么。  重点介绍一些API 所提供的功能。

![](img/getStarted-jvm.gif)

> ​	API 和JVM 从硬件上面隔离开

作为一个平台依赖的环境， Java 平台的代码可能比本地原生代码 (比如 原生C语言的代码)要慢一点。 但是编译器和虚拟机的技术的进步， 使性能能够接近本地远程代码而不会威胁到可移植性。



> ​	翻译参考

1. [https://docs.oracle.com/javase/tutorial/getStarted/intro/definition.html](https://docs.oracle.com/javase/tutorial/getStarted/intro/definition.html)

2. [谷歌翻译](https://translate.google.cn)







###	Java 技术能够做些什么

一般的高级语言是一个强大的软件平台。每个实现了Java 平台的都拥有下面的特性

- 开发工具： 开发工具提供了你需要的编译，运行， 管理，调试，和文档工具的功能。 作为一名新的开发者，你将使用 javac 编译， java 启动器， 和javadoc 文档工具。

- 应用程序接口: 	API 提供了核心的Java 程序功能。 在你的应用中， 已经提供了一些有用的 class 。

  基本的对象， 网络，安全，XML 和数据库访问相关API。 核心API 功能十分强大。 包含了很多的东西。 详情参考 文档  [Java Platform Standard Edition 8 Documentation](https://docs.oracle.com/javase/8/docs/index.html).

- 部署技术：  JDK 软件提供了 如JavaWeb 软件和Java 插件 这样的标准机制。

- 用户接口工具项： JavaFX, Swing, 和 2D 工具箱， 使开发者开发 `GUI` 程序变得更加方便。

- 集成库：  集成库 比如  Java IDL API， JDBC API， Java Naming 和 JDNI API，Java Rmi， Java Remote method 等。

  > 原文

  [https://docs.oracle.com/javase/tutorial/getStarted/intro/cando.html](https://docs.oracle.com/javase/tutorial/getStarted/intro/cando.html)



### 	Java 怎么改变我们的生活

​	如果你学习Java 编程语言， 我们不能保证你可以得到名望，未来甚至工作。但是它能够使你的程序比其他程序更好，只需要付出小小很小的代价。 我们相信Java 技术可以帮助你们下面的几点

1.  更快的开始：  Java 程序语言是一个 强大的面向对象的语言，很融化成学习， 尤其是它更像 C和C++ 一样。
2. 写更少的代码：  用Java 程序编写的语言的代码 比C++ 来写， 代码要少于 4 倍有余。
3. 写更好的代码:     Java 程序语言鼓励良好爱的编程习惯， 可以帮助你管理内存回收内存，避免内存泄露。 遵守Java 规范，使用 Javabeans 组件， 可以使你广泛的轻松的扩展API，测试你的代码，和引入更少的BUG。
4. 开发程序更快： Java 程序语言 比C++ 更简单， 你的开发速度可能快 2倍。 程序需要的代码行更少了。
5. 避免平台依赖:   你可以使你的程序在避免移植其他语言的库。
6. 一次编写， 多处运行:    因为你的程序编译成字节码文件， 那么可以运行在任何Java 平台上。
7.  分发软件更容易:   用户单击鼠标就可以启动你的Java web 应用。 在启动的时候， 可以确保你的软件升级到最新的版本。 如果是可以升级的， 那么 Java Web Start software 将自动升级。

