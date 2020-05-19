---

title: JDBC简单入门1
copyright: true
date: 2018-05-24 01:00:28
tags:
	- database
---

## 持久化

- 什么是持久化
什么是持久化(persistence):把数据保存到可掉电式存储设备中以供之后使用。
大多数情况下，特别是企业级应用，数据持久化意味着将内存中的数据保存到硬盘上加以”固化”，而持久化的实现过程大多通过各种关系数据库来完成。
持久化的主要应用是将内存中的数据存储在关系型数据库中，当然也可以存储在磁盘文件、XML数据文件中。 
  <!-- more -->
- Java中的数据持久化
在Java中，要想把数据持久化到数据库必须使用JDBC！
但使用JDBC访问数据库的形式主要有两种:
   1)直接使用JDBC的API去访问数据库（我们这几天会重点学习）
   2)间接地使用JDBC的API去访问数据库（第三方O/R Mapping工具，如Hibernate, MyBatis等.但他们底层依然是JDBC）
总结：JDBC是java访问数据库的基石,Java中其他访问数据库的技术都是对JDBC的封装.

> 扩展：JPA(Java persistence api):Java持久化API.JavaEE的规范, Hibernate实现了该规范.(xml/注解)
## JDBC概述


- 如果没有JDBC,会带来哪些问题:

 1. 我们访问数据库操作就没有规范.
 2. 因为数据库厂商是不一样的,就会执行自己的访问数据库规则.
 3. 比如小明,之前在A公司,使用了的是AB公司的MySQL,就得学习MySQL访问数据库的方式.
     后来,小明去了B公司,B公司使用的Oracle的Oracle数据库,小明只能重新学习Oracle访问数据库的方式.
    小明又跳槽了去了C公司,C公司使用的IBM的DB2,继续学习.


> 造成上述问题的根本原因:
 数据库厂商不一样,没有指定访问数据库的规则,所以操作不同的数据库就得学习不同的技术.
 这时,SUN出来,说:我来统一指定所有数据库的访问规则,你们(各大数据库厂商)必须按照我的方式来实现,否则不支持你的数据库服务器.
 有了规范之后,针对于不同的数据库服务器,就只需要一套技术即可.这个规范称之为JDBC.

---

- 什么是JDBC(Java DataBase Connectivity):
是一种用于执行SQL语句的Java API，由一组用Java语言编写的类和接口组成,可以为多种关系数据库提供统一访问。
JDBC提供了一种基准，据此可以构建更高级的工具和接口，使数据库开发人员能够编写数据库应用程序.
- JDBC为访问不同的数据库提供了一种统一的途径，为开发者屏蔽了一些细节问题。
JDBC的目标是使Java程序员使用JDBC可以连接任何提供了JDBC驱动程序的数据库系统，这样就使得程序员无需对特定的数据库系统的特点有过多的了解，从而大大简化和加快了开发过程。

- 说人话：JDBC就是SUN给我们提供的一套操作不同数据库的统一接口，我们只需要面向接口编程就可以以统一的方式操作不同的数据库，接口的实现(数据库驱动)由各大数据库厂商来提供。

- JDBC的版本:
1. JDBC隶属于JavaSE的范畴,伴随着JavaSE的版本升级.
2. Java6==>JDBC4.0: 有一个新特性(了解)-无需加载注册驱动.(但是在web项目中仍然需要)Java7==>JDBC4.1:

- 使用哪些API来操作?先了解下,后面会详细介绍
在java.sql.*包下有以下类与接口，是我们在使用jdbc时需要用到的。
DriverManager类:它主要用于管理驱动
Connection接口:它用于与数据库建立连接
Statement接口:它用于向数据库发送sql语句
PreparedStatement接口:它是Statement的子接口，它提供了预编译功能
CallableStatement接口:它是PreparedStatement的子接口，它用于处理存储过程(了解)
ResultSet接口:它用封装查询操作返回的结果信息。

- 使用JDBC操作数据库具体是哪些操作? 简单的说，通过JDBC我们可以做三件事：
1. 连接数据库
2. 发送sql语句给数据库执行
3. 处理数据库执行sql的结果

 ## JDBC操作步骤

要想使用JDBC操作数据库,肯定要连接上数据库,也就是获取连接对象:Connection.
而在获得连接对象:Connection之前我们还得告诉指定我们操作的是哪个数据库,所以还得先加载注册驱动
然后在执行其他的一系列操作....
记不住!?怎么办?----告诉大家一句口诀:

> 贾琏欲执事----要求熟记口诀(这就是写代码的思路)

1): 贾:加载注册驱动

2): 琏:获取连接对象

3): 欲:创建语句对象

4): 执:执行SQL语句(如果有结果集需要处理结果集)

5): 事:释放资源


 ## 获得数据库的连接

> 准备工作:

1. 拷贝MySQL的驱动包到项目中去:mysql-connector-java-5.1.x-bin.jar,注意是jar包,不是zip包.
2. build path,告诉项目去哪里去找字节码文件.

- 加载注册驱动(查看java.sql.Driver接口):发现使用下面这行代码就可以了
Class.forName(“com.mysql.jdbc.Driver”);

- 为什么上述这一行代码,就能完成加载和注册驱动操作呢?

1: 会把com.mysql.jdbc.Drvier这份字节码加载进JVM.

2: 当一份字节码被加载进JVM时,就会执行该字节码中的静态代码块.
```

public class Driver extends NonRegisteringDriver implements java.sql.Driver {

    static {
        try {
            java.sql.DriverManager.registerDriver(new Driver());
        } catch (SQLException E) {
            throw new RuntimeException("Can't register driver!");
        }
    }

    public Driver() throws SQLException {
        // Required for Class.forName().newInstance()
    }
}

```






●获取连接:
通过DriverManager类的getConnection方法来获取连接对象.
Connection conn = DriverManager.getConnection(url,username,password);
参数:
url:       连接数据库的URL:  jdbc:mysql://localhost:3306/jdbcdemo 
如果连接的是本机的MySQL,并且端口是默认的3306,则可以简写: jdbc:mysql:///jdbcdemo
username: 数据库用户名:root
password: 数据库密码:admin
```

public class DDLDemo {
	@Test
	public void test() throws Exception {
			
		Class.forName("com.mysql.jdbc.Driver");
		Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");
		System.out.println(connection);
		
	}
}
```



- 如何检测我们获取了数据库的连接:使用MySQL的命令:show  processlist;




> ★注意:
1. 编写JDBC代码前一定要拷贝并buildpath驱动包
2. 导包时关于JDBC的包有冲突时,要导入java.sql包中的接口名.千万不要导入com.mysql..Xxx中的类.
3. 起类名的时候不要占用jdk中或jar包中的类名,我们自己的加个Demo/Test后缀


- 常见错误:
1. 帐号密码错误:
2. 数据库名称错误:
3. 驱动名错误
....


- 扩展1:简单了解:从JDK6开始,可以不需要手动加载注册驱动.
JDBC 4.0 Drivers(对应JDK6) 包括 META-INF/services/java.sql.Driver 文件。
此文件包含 java.sql.Driver 的 JDBC 驱动程序实现的名称
程序会自动从 META-INF/services/java.sql.Driver去读取当前的驱动类的全限定名,
此时程序员不再需要显示的编写 Class.forName("com.mysql.jdbc.Driver")代码.
但是:注意,以后必须手动加载注册驱动,因为JavaWeb中必须这样才正确.




- 扩展2:简单了解:有的时候，MySQL的驱动类也也会看到使用org.gjt.mm.mysql.Driver的情况，
org.gjt.mm.mysql.Driver是早期的驱动名称，后来就改名为com.mysql.jdbc.Driver，现在一般都推荐使用 com.mysql.jdbc.Driver。
在最新版本的mysql jdbc驱动中，为了保持对老版本的兼容，仍然保留了org.gjt.mm.mysql.Driver，
但是实际上 org.gjt.mm.mysql.Driver中调用了com.mysql.jdbc.Driver，因此现在这两个驱动没有什么区别。


- 扩展3：连接不同数据库
Oracle: 
driverClass：oracle.jdbc.driver.OracleDriver
url：jdbc:oracle:thin:@127.0.0.1:1521:sid

-----------------------------------------------------------
MySQL: 
driverClass：com.mysql.jdbc.Driver
url：jdbc:mysql://localhost:3306/数据库名


## DDL-创建表操作	
> 案例:创建学生信息表(t_student),包括id/name/age三个列.
SQL:

```
public class DDLDemo {
	@Test
	public void test() throws Exception {
		//		创建一个表
		Class.forName("com.mysql.jdbc.Driver");
		Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");

		String ctr_tablle = " create table t_student(id BIGINT,name VARCHAR(20),age int)";

		Statement state = connection.createStatement();
		int executeUpdate = state.executeUpdate(ctr_tablle);

	}
}
```

- 异常处理
1. 使用try-catch-finally手动处理

```
	@Test // 传统处理异常的方式
	public void testMehotd1() {
		//		创建一个表
		String ctr_tablle = " create table t_student(id BIGINT,name VARCHAR(20),age int)";
		Connection connection = null;
		Statement state = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");

			state = connection.createStatement();
			int executeUpdate = state.executeUpdate(ctr_tablle);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
        // 释放资源
			if (state != null) {
				try {
					state.close();
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {
					if (connection != null) {
						try {
							connection.close();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}
				}
			}

		}
	}
```


2. 使用Java7新特性-自动关闭资源-要求资源类实现AutoCloseable接口
3. 
```
	@Test // Java7自动关闭资源
	public void testMehotd2() {
		//		创建一个表
		String ctr_tablle = " create table t_student(id BIGINT,name VARCHAR(20),age int)";

		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		try (

				Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin"); Statement state = connection.createStatement();) {
			state.executeUpdate(ctr_tablle);

		} catch

		(Exception e) {
				e.printStackTrace();
		}

	}
```

3. 使用Lombok插件@Cleanup注解


## 	DML-增删改操作					

- DML-增删改操作
> 执行DML操作的代码和DDL相同,唯一不同的是执行的SQL语句.

需求:
1. 往学生表中插入信息杰克 , 18

```
@Test // 插入一条信息
	public void testMehotd1() {
		//		插入一条数据
		String sql = "insert into t_student value(1,'杰克',18)";
		Connection connection = null;
		Statement state = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");

			state = connection.createStatement();
			state.executeUpdate(sql);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

			if (state != null) {
				try {
					state.close();
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {
					if (connection != null) {
						try {
							connection.close();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}
				}
			}

		}
	}
```
2. 修改id为1的学生的姓名为杰克马 , 年龄为20

```
@Test // 修改id为1的学生的姓名为杰克马 , 年龄为20
	public void testMehotd2() {
		//		修改数据的语句
		String sql = "update t_student set name = '杰克马',age = 20 where id = 1";
		Connection connection = null;
		Statement state = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");

			state = connection.createStatement();
			state.executeUpdate(sql);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

			if (state != null) {
				try {
					state.close();
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {
					if (connection != null) {
						try {
							connection.close();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}
				}
			}

		}
	}

```
3. 


3. 把id为1的学生删除


 ```
	@Test // 删除Id为1的数据
	public void testMehotd3() {
		//		插入一条数据
		String sql = "delete from t_student where id = 1";
		Connection connection = null;
		Statement state = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");

			state = connection.createStatement();
			state.executeUpdate(sql);
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

			if (state != null) {
				try {
					state.close();
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {
					if (connection != null) {
						try {
							connection.close();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}
				}
			}

		}
	}

 
 ```




## DQL-查询操作

先执行sql语句: 
```
insert into t_student value(1,'Bob1',15)
insert into t_student value(2,'Bob2',16)
insert into t_student value(3,'Bob3',17)
```
> 需求:

1. 查询t_student表中一共有多少条学生信息.

```
	@Test // 1: 查询t_student表中一共有多少条学生信息.
	public void testMehotd1() {
		//		插入一条数据
		String sql = "select count(*) from t_student";
		Connection connection = null;
		Statement state = null;
		ResultSet rs = null;
		// 记录的条数
		int count = 0;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");

			state = connection.createStatement();
			rs = state.executeQuery(sql);
			while (rs.next()) {
				count = rs.getInt(1);
			}

			System.out.println("一共有" + count + "条信息");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

			if (state != null) {
				try {
					state.close();
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {
					if (connection != null) {
						try {
							connection.close();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}
				}
			}

		}
	}
```
2. 查询t_student表中id为1的学生信息

```
// 查询t_student表中id为1的学生信息
	@Test
	public void test() throws Exception {
		//		插入一条数据
		String sql = "select * from t_student where id = 1";
		Connection connection = null;
		Statement state = null;
		ResultSet rs = null;
		// 记录的条数

		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");
			state = connection.createStatement();
			rs = state.executeQuery(sql);
			while (rs.next()) {
				int id = rs.getInt("id");
				String name = rs.getString("name");
				int age = rs.getInt("age");
				System.out.println(id + "  " + name + "  " + age);
			}

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

			if (state != null) {
				try {
					state.close();
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {
					if (connection != null) {
						try {
							connection.close();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}
				}
			}

		}
	}
```
3. 查询t_student表中所有学生的信息

```
	// 查询t_student表中所有学生的信息
	@Test
	public void testMethod5() throws Exception {
		//		插入一条数据
		String sql = "select * from t_student";
		Connection connection = null;
		Statement state = null;
		ResultSet rs = null;
		// 记录的条数

		try {
			Class.forName("com.mysql.jdbc.Driver");
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");
			state = connection.createStatement();
			rs = state.executeQuery(sql);
			while (rs.next()) {
				int id = rs.getInt("id");
				String name = rs.getString("name");
				int age = rs.getInt("age");
				System.out.println(id + "  " + name + "  " + age);
			}

		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} finally {

			if (state != null) {
				try {
					state.close();
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {
					if (connection != null) {
						try {
							connection.close();
						} catch (SQLException e) {
							e.printStackTrace();
						}
					}
				}
			}

		}
	}

```
## 常用 Api



- 1.DriverManager
java.sql包下的类，它的作用是管理JDBC驱动程序。
> 常用方法:
```
static void registerDriver(Driver driver)  :向 DriverManager 注册给定驱动程序。
static Connection getConnection(String url,String user,String password) :建立到给定数据库 URL 的连接。
```

 egistDriver方法分析:
我们可以查看mysql驱动中Driver类的加载，会发现在其内部有一个静态代码块
```
static {
      try {
         java.sql.DriverManager.registerDriver(new Driver());
      } catch (SQLException E) {
         throw new RuntimeException("Can't register driver!");
      }
   }
```

在代码块中它完成了注册驱动的操作，所以我们在程序中只需执行Class.forName("com.mysql.jdbc.Driver");便可以注册驱动,而无需手动调用registerDriver方法

etConnection参数分析：
```
url: URL用于标识数据库的位置，程序员通过URL地址告诉JDBC程序连接哪个数据库
user:这个是数据库的用户名，对于我们来说，就是root用户
password:这个是root用户的密码
```
>  扩展:
对于MySQL数据库,url的基本格式如下:

协议 : 子协议 : //ip:端口/数据库名

例如: jdbc:mysql://localhost:3306/jdbcdemo

如果我们连接的是本机并且端口号是3306，以上代码也可以简写成
jdbc:mysql:///jdbcdemo

Oracle写法：

jdbc:oracle:thin:@localhost:1521:sid

对于url来说，我们有时也会在其后面携带参数,例如:
```
jdbc:mysql://127.0.0.1:3306/jdbcdemo?useUnicode=true&characterEncoding=utf8&autoReconnect=true&allowMultiQueries=true&rewriteBatchedStatements=true
```

指定编码,自动重连,支持批量更新,支持批处理


> 2.Connection接口:

java.sql包下的接口

表示JDBC的连接对象.(代表的是一个与数据库连接的对象，当我们获取了一个Connection对象时，我们就可以说，已经与数据库连接成功了)
常用方法:
```
       Statement createStatement():创建一个静态的语句对象.
       PreparedStatement prepareStatement(String sql):创建一个预编译语句对象.
                此时参数sql:表示带有占位符(?)的SQL语句的模板.   比如：INSERT INTO t_student (name,age) VALUES(?,?)
       close():释放资源
```
CallableStatement prepareCall(String sql):创建一个 CallableStatement

对象来调用数据库存储过程


> 3.Statement接口:
java.sql包下的接口

执行静态SQL语句并返回它所生成结果.

常用方法:
```
    int executeUpdate(String sql):执行DDL/DML(增删改)语句.
     若当前SQL是DDL语句,则返回0.
    若当前SQL是DML语句,则返回受影响的行数.
    ResultSet executeQuery(String sql):执行DQL语句,返回结果集.
    close():释放资源
boolean execute(String sql) :执行给定的sql语句，该语句返回多个结果，如果第一个结果为ResultSet对象，则返回true(DQL返回true),其它则返回false,
 
```
> 4.PreparedStatement接口:

java.sql包下的接口

表示预编译的SQL 语句(SQL 语句被预编译并存储在 PreparedStatement 对象中。然后就可以使用此对象多次高效地执行该语句)
是Statemen接口的子接口-->享有Statement中的方法.
通过 Connection的preparedStatement(sql)获取该对象
注意:
   参数sql,代表的是要预编译的sql语句，在语句中可以使用 “?”占位符来占位
常用方法:
```
    void setXxx(int parameterIndex,Xxx value):设置第几个占位符的真正参数值. Xxx表示数据类型,比如String,int,long,Date等.(Index从1开始算).
    int executeUpdate():执行DDL/DML语句. 注意:没有参数
      若当前SQL是DDL语句,则返回0.
      若当前SQL是DML语句,则返回受影响的行数.
    ResultSet executeQuery():执行DQL语句,返回结果集.注意:没有参数
    close():释放资源
```

> 5.ResultSet接口:

java.sql包下的接口

通过执行DQL语句查询之后的结果对象.封装了查询之后的所有数据.
ResultSet 对象具有指向其当前数据行的光标。最初，光标被置于第一行之前。next 方法将光标移动到下一行；因为该方法在 ResultSet 对象没有下一行时返回 false，所以可以在 while 循环中使用它来迭代结果集
常用方法:
```
  	  boolean next():判断当前光标是否能向下移动,如果能向下移动返回true,并同时将光标移动到下一行,否则返回false.
  	  
      Xxx getXxx(int columnIndex):取出当前光标所在行的第columnIndex列的数据(columnIndex从1开始算).
      在Java中,只有在JDBC和JPA中设置列角标序号是从1开始的.
	
      Xxx getXxx(String columnName):取出当前光标所在行的列名为columnName列的数据,columnName可以是别名. 
	  Xxx表示数据类型,比如String,int,long,Date等. 推荐使用列名来取数据.
      close():释放资源
 
```

 



