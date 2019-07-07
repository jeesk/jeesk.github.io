---
title: 三分钟学会使用Derby数据库
copyright: true
date: 2018-05-03 01:00:28
tags:
	- database
---

> Derby数据库是一个纯用Java实现的内存数据库，属于Apache的一个开源项目。由于是用Java实现的，所以可以在任何平台上运行；另外一个特点是体积小，免安装，java1.6开始集成了derby数据库,位于jdk下面的db目录下.

<!-- more -->
1. #### 环境变量配置
- #####  CLASSPATH =
```
‪C:\openSource\jdk1.8.0_162\db\lib\derby.jar;
‪C:\openSource\jdk1.8.0_162\db\lib\derbyclient.jar;
‪C:\openSource\jdk1.8.0_162\db\lib\derbytool.jar;
‪C:\openSource\jdk1.8.0_162\db\lib\derbynet.jar;
‪C:\openSource\jdk1.8.0_162\db\lib\derbytools.jar;
```
- ##### PATH =
```
C:\openSource\jdk1.8.0_162\db\bin
```

- ##### 如果不想配置,也可以使用下面指令来简化你的使用

- 在Derby数据库的/bin目录中提供了几个脚本用于设置classpath，以简化你手工在classpath中添加jar包的麻烦：
-  setEmbeddedCP。当使用内嵌模式来运行Derby时，可以使用该脚本来设置。该脚本将derby.jar和derbytools.jar添加到环境变量中；
 setNetworkServerCP。当使用网络模式来运行Derby时，用该脚本来设置Derby服务端的classpath变量。该脚本将derbynet.jar添加到环境变量中；
-  setNetworkClientCP。当使用网络模式来运行Derby时，用该脚本来设置Derby客户端的classpath变量。该脚本将derbyclient.jar和derbytools.jar添加到环境变量中。
一般只有当你通过derbyrun.jar来运行Derby工具时才会使用这些脚本。

---



2. #### Derby提供了三个工具脚本:
> 将derby数据库的bin目录加入环境变量后,可以在命令行中使用下面的脚本
- sysinfo
使用sysinfo可以显示你的Java环境信息和Derby的版本信息。使用方法就是在命令行下直接输入：
sysinfo.bat
- dblook
使用dblook可以将全部或者部分数据库的DDL定义导出到控制台或者文件中。使用方法：
dblook.bat -d <sourceDBUrl> [Options]
- ij
使用ij工具来进行数据库交互，执行SQL脚本，如查询、增删改、创建表等等。在命令行下输入：
ij.bat
即可启动ij工具，然后就可以开始执行SQL脚本了。当要退出ij工具时，在命令行下输入
exit;
即可。 




> 注意:命令行中使用derby,无论是服务(使用服务先启动数据库
)还是文件的连接方式都要行执行 ij命令,进入derby数据库;

---


3. #### 命令行中使用derby: 

- ##### 服务的方式(独立数据库)
 > 这种模式下，需要使用两个控制台窗口，一个用于启动Derby数据库服务端，另一个做为访问Derby数据库的客户端。
可以通过DERBY数据库/bin目录下的==startNetworkServer.bat==来启动Derby数据库服务端，只需要在==命令行中输入==：
==startNetworkServer.bat==
或者是在命令行中输入
```
java -jar  derbyrun.jar server start;
```
> 数据库就启动了，启动成功会在控制台输出如下信息：
已使用基本服务器安全策略安装了安全管理程序。
Apache Derby Network Server － 10.4.1.3 - (648739) 已启动并且已准备好 2008-09-06
00:38:12.540 GMT 时在端口 1527 上接受连接

- 在命令行中输入ij,进入数据库
```
connect 'jdbc:derby://localhost:1527/db_name';
或者是
connect 'jdbc:derby://localhost:1527/db_name;user=root;password=root;create=true;';
```
>  user=root;password=root; 创建一个用户.

>  create=true 没有数据库的话,也创建一个

---


4. #### 文件连接的方式(内嵌数据库): 
- 在在命令行中输入ij,进入数据库
- 再输入以下命令(注意db_name可以是相对路径也可以是绝对路径)
```
connect 'jdbc:derby:db_name';
```

> 与服务端连接上后，就可以开始执行SQL脚本了，：

- 如创建一个表格
``` create table firsttable(id int primary key, name varchar(20)); ```
- 然后插入记录：
``` insert into firsttable values(1, ‘Hotpepper'); ```
- 也可以执行查询：
``` select * from firsttable; ```
- 也可以通过run命令来执行sql文件：
``` run 'E:/derby/demo/programs/toursdb/ToursDB_schema.sql'; ```
- 最后通过exit;来退出ij工具

---




5. #### 在java中使用jdbc连接(独立数据库)
> 注意derby的所有的驱动在lib目录下面
- 先把derbycilent.jar导入项目,再buildpath一下
>  java代码
```
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Db {
	public static void main(String[] args) {
		try {
		// 创建实例
			 Class.forName("org.apache.derby.jdbc.ClientDriver").newInstance();
			// 获得数据库连接
			Connection conn = DriverManager.getConnection("jdbc:derby://localhost:1527/firstdb");
			String sql = "select name from stu";
			PreparedStatement ps = conn.prepareStatement(sql);
			// 执行查询语句
			ResultSet rs = ps.executeQuery();
			while (rs.next()) {
				System.out.println(rs.getString("name"));
			}
			
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {

			e.printStackTrace();
		} catch (InstantiationException e) {
			
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			
			e.printStackTrace();
		}
	}
}
```
6. #### 也可以使用内镶数据库的连接方式连接jdbc(到最后加载驱动和Conncetion即可)

> 这儿的db_name可以是相对路径也可以是绝对路径,shutdown=true;用户在使用derby的内嵌数据库的时候有责任关闭数据库
- 请将derby.jar加入项目的build path路径

```
Class.forName("org.apache.derby.jdbc.EmbeddedDriver").newInstance();
Connection conn = DriverManager.getConnection("jdbc:derby:db_name;shutdown=true);

```
##### Tips: 注意网络模式和内嵌模式的不同出在于：
- 数据库连接URL的不同.(独立服务器模式是数据库库的名字,另外一个是数据库的路径)
- 应用程序退出时无效关闭Derby数据库；(内嵌数据库必须关闭)
- 数据库驱动的不同；
---

- ##### 关闭数据库
```
在命令行中执行  java -jar  derbyrun.jar server stop;
```

> 关于数据库的操作我在这儿就不说了,有需要学习的网友可以自己百度一下

- [x]  参考

[Derby net server doc](http://db.apache.org/derby/papers/DerbyTut/ns_intro.html)

[Derby 快速入门](http://db.apache.org/derby/quick_start.html/)

[gsls200808的专栏](https://blog.csdn.net/gsls200808/article/details/46518029)
