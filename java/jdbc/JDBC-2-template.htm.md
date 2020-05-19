---
title: 抽取JDBC的模版
copyright: true
date: 2018-05-25 01:00:28
tags:
	- database
---





## 使用PrepareedStatement代替使用Statement

### PreparedStatement相对于Statement的优势:

1. 拼接SQL上,操作更简单(更好的可读性,可维护性). --能理解即可,以后使用PreparedStatement不会进行sql语句的字符串拼接
2. 预编译的性能会更加高效(但是需要取决于数据库服务器是否支持预编译)从测试的结果来看:MySQL不支持预编译(不做实验)
（其实MySQL5.x开始是支持的,但默认是关闭的,然而开启后效果也不明显(useServerPrepStmts=true). 所以一般我们就认为它不支持，但Oracle中效果非常明显）
<!-- more -->
3. 安全性更高,可以防止SQL的注入--先讲解登录操作   



### 认识PreparedStatement

#### PreparedStatement和Statement都可以表示语句对象:

- Statement: 表示静态SQL语句对象.--就是可以直接执行的sql语句
- PreparedStatement:Statement的子接口,表示预编译SQL语句对象. 通过占位符(?)来拼SQL.--执行前需要设置?占位符的具体的值



#### 如何创建PreparedStatement对象:
- Connection接口中:
```
    PreparedStatement prepareStatement(String sql):创建预编译语句对象,SQL是带有占位符的SQL模板.
```


- 常用API:
```
   int executeUpdate():该方法可以执行DML和DDL语句.
   若执行的是DML,则返回受影响的行数.若执行DDL将0.
   ResultSet executeQuery():该方法执行DQL语句. 并返回一个结果集对象.
 
   void  setXxx(int parameterIndex,Xxx value):用于设置占位符参数, 
   parameterIndex:第几个问号. 注意序号:从1开始.
   value:设置的真实值.
   Xxx:表示数据类型.String/int/long/Double
```

> 注意:使用PreparedStatement对象,调用executeUpdate/executeQuery都是不带参数的.

> 简单使用:
需求:使用Statement和PreparedStatement 完成保存学生操作

```
package smis;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.Statement;

import org.junit.Test;

/**
 * saveStudentDemo.java
 * @version
 * @date 2018年5月24日 下午5:21:08
 * @author jeesk
 * @since 1.0
 *  使用PreparedStatement和Statement完成 保存学生
 建表语句
create table t_student(
 
 	id bigint primary key auto_increment,
 	name varchar(20) not null,
 	age int(3) not null,
 
 );
 
 *  
 *  
 */
public class saveStudentDemo {

	@Test
	public void testUseStatement() throws Exception {

		// 插入语句 
		String sql = "insert into t_student (name,age) values('小明',18)";
		// 1):加载 驱动
		Class.forName("com.mysql.jdbc.Driver");
		// 获得Connection对象 
		Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");
		// 获得语句对象 
		Statement createStatement = connection.createStatement();
		// 执行语句
		int rows = createStatement.executeUpdate(sql);
		System.out.println("受影响的为" + rows + "行");

	}

	@Test
	public void testUsePreparedStatemtn() throws Exception {

		// 插入语句 
		String sql = "insert into t_student (name,age) values(?,?)";
		// 1):加载 驱动
		Class.forName("com.mysql.jdbc.Driver");
		// 获得Connection对象 
		Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");
		// 获得语句对象 
		PreparedStatement preparedStatement = connection.prepareStatement(sql);
		preparedStatement.setString(1, "大明");
		preparedStatement.setInt(2, 22);
		// 执行语句
		int rows = preparedStatement.executeUpdate();
		System.out.println("受影响的为" + rows + "行");

	}

}

```

#### sql statement会造成Sql注入,不安全,使用Preparedstatement才能解决这一个问题
```
package smis;

import static org.junit.Assert.*;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import org.junit.Test;

/**
 * SqlDemo.java
 * @version
 * @date 2018年5月24日 下午6:15:33
 * @author jeesk
 * @since 1.0
 *  演示使用Statementsql语句注入
 
 	建表语句
 	create table user(
 		username varchar(20) not null,
 		password varchar(20) not null
 	);
 	
 	insert into user values('Bob','mima');
 	insert into user values('Cob','mima');
 	insert into user values('XOb','mima');
 	
 	// 一个网站简单登录的验证就是去数据库 里面找你的用户名和密码是否存在 ,所以说在你使用语句查询你的账户密码是否在数据库 最下面存在就行了
 
 *  
 */
public class SqlDemo {

	@Test
	public void testDemo1() throws Exception {

		String username = "12";
		String password = "321";
		// 查询语句
		String sql = "select username,password from user where username = " + username + " and password = " + password;

		// 加载 驱动
		Class.forName("com.mysql.jdbc.Driver");
		// 获得Connection对象 
		Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");
		Statement createStatement = connection.createStatement();
		ResultSet rs = createStatement.executeQuery(sql);
		if (rs.next()) {
			System.out.println("已经找到");

		} else {

			System.out.println("用户或则是密码错误");

		}
	}

	@Test // 使用Sql语句注入  不知用户名一样的可以登录
	public void testDemo2() throws Exception {

		String username = " '随便写' ";
		// String password = " '' Or 1=1 Or '' "; // sql语句的写法
		String password = " '' Or 1=1 "; // sql语句的写法
		// 查询语句
		String sql = "select username,password from user where username = " + username + " and password = " + password;
		System.out.println(sql);
		// 加载 驱动
		Class.forName("com.mysql.jdbc.Driver");
		// 获得Connection对象 
		Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");
		Statement createStatement = connection.createStatement();
		ResultSet rs = createStatement.executeQuery(sql);
		if (rs.next()) {
			System.out.println("已经找到");

		} else {

			System.out.println("用户或则是密码错误");

		}
	}

	@Test // 使用preparedStatement解决了sql注入的问题
	public void testDemo3() throws Exception {

		// String username = " '随便写' ";
		// String password = " '' Or 1=1 Or '' "; // sql语句的写法
		// String password = " '' Or 1=1 "; // sql语句的写法

		// 使用正确的才能查找 到
		String username = "Bob";
		String password = "mima";

		// 查询语句
		String sql = "select username,password from user where username = ? and password = ?";
		// 加载 驱动
		Class.forName("com.mysql.jdbc.Driver");
		// 获得Connection对象 
		Connection connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");
		PreparedStatement createStatement = connection.prepareStatement(sql);
		// 设置值
		createStatement.setString(1, username);
		createStatement.setString(2, password);
		ResultSet rs = createStatement.executeQuery();
		if (rs.next()) {
			System.out.println("已经找到");

		} else {

			System.out.println("用户或则是密码错误");

		}
	}

}

```
### DAO思想

问题1:什么是DAO思想?

问题2:为什么得有DAO思想?
               DAO思想出现之前是怎么样的?
               DAO思想出现之后又是怎么样的?

1. 之前的做法
此时的设计,在客户端中编写了操作JDBC的代码.从功能上分析,是没有问题的.



2. 出现问题
但是, 当有多个客户端时,存在客户端代码重复的问题.
因为把功能代码编写在客户端中,此时若有3个客户端,则功能代码会重复3次.
重复就意味着维护成本很高.
所以开发中遵循DRY原则:
Don't repeat Yourself(不要编写重复的代码).


3. 分析问题
现在上述案例,已经出现代码重复的问题,关键是如何去解决:
该问题的解决方案,我们从之前的开发经验入手去分析:
-----------------------------------------------------------
数组  :存储数据,把数据存储到内存中.
数据库:存储数据,把数据存储到数据库中(磁盘中).
-----------------------------------------------------------

数组的相关操作:
1):把数据存储到数组.

2):取出数组中的数据.

3):修改数组中的数据.

4):删除数组中的数据.

> 此时,也是在每一个客户端中编写代码,如此一来,在每一个客户端中代码依然重复.
解决方案:编写一个数组的工具类:ArrayList.把所有和数组相关的CRUD操作封装在ArrayList类中.以后,客户端需要什么功能,就只需要创建ArrayList对象,并调用相应的方法即可

4. 解决问题
同样的,我们现在遇到的问题也可以参照以前的做法来解决


5. 什么是DAO

DAO(Data Access Object)是一个数据访问对象(接口)，数据访问：顾名思义就是与数据库打交道的。它封装了对数据库的增删改查(CRUD)操作.


> 在核心J2EE模式中是这样介绍DAO模式的：为了建立一个健壮的J2EE应用，应该将所有对数据源的访问操作抽象封装在一个公共API中。
用程序设计的语言来说，就是建立一个接口，在接口中定义此应用程序中将会用到的所有方法。
当需要和数据库进行交互的时候则使用这个接口，并且编写一个单独的类来实现这个接口，实现与数据库的交互操作



### DAO 设计
DAO设计
使用了DAO思想之后的设计,从功能的正确与否的角度分析,没有问题.
----------------------------------------------
但是,我们需要分析DAO组件中的方法该如何具体的设计:(方法的参数和方法的返回)

1．封装之前
设计save方法.
public void save(String name,int age){}
若参数过多,此时save方法的参数就会出现爆炸式增长.一般的,方法在设计的时候参数个数最好不要超过5/6个. 肿么办?

设计get方法
```
public XXX get(Long id){} ```
此时查询指定ID的某一个学生信息,问题:XXX表示什么类型.
若XXX表示String,就只能查询学生的名字.
       若XXX表示Integer,就只能查询学生的名字.
那如果,我同时想得到学生的名字和年龄,怎么办?
 
2．封装之后
解决方案:封装思想.
把学生的信息封装成一个对象(Student).
//学生信息类/封装了学生相关的数据

```
```
public class Student{
    private  Long id;        //唯一标识
    private  String name;   //姓名
    private  int age;       //年龄
}
```

save方法,应该这样来设计:
```
void  save(Student stu);
```
get方法,应该这样来设计:
```
   Student  get(Long id); 
```
   在查询处理结果集的时候,把某一行数据封装成一个Student对象,并返回.

#### DAO规范

- DAO规范
lDAO组件(可以重复使用的java类)包括:

     DAO接口:
  
     DAO实现类:
  
     DAO测试类:

- 包名的规范:
- ```
     package  域名倒写.模块名称.组件名称;    smis --student manager information
    system   学生信息管理系统

     package com.shanjiancaofu.smis.domain;      //存储所有的domain类
     
     package com.shanjiancaofu.smis.dao;             //存储所有的DAO接口
     
     package com.shanjiancaofu.smis.dao.impl;    //存储所有的DAO接口的实现类
     
     package com.shanjiancaofu.smis.test;            //暂时存储DAO的测试类,以后的测试类不应该放这里.
    ```

- 类名和接口规范:
domain类:

   放在domain包中,是个描述一类事物的JavaBean,包含字段和getter/setter方法.使用名词,如Student,Employee.
DAO接口:

   放在dao包中,表示某一个对象的CRUD操作声明.起名规范:IXxxDAO/IXxxDao(Xxx表示domain对象),如IStudentDAO/IEmployeeDao  
  

DAO实现类:

   放在dao.impl包中,表示DAO接口的实现类(要实现DAO接口).起名规范:XxxDAOImpl/XxxDaoImpl(Xxx表示domain对象),如StudentDAOImpl/EmployeeDaoImpl

DAO测试类: 

   放在test包中,表示是XxxDAO组件的测试类(应该测试DAO组件中的所有方法).根据DAO接口来生成的,起名:StudentDAOTest/XxxDaoTest

●开发建议:

使用面向接口编程,声明DAO对象时应该使用接口类型:接口 变量 = new  实现类();
   举例

    ```
      传统的做法    :StudentDAOImpl dao = new StudentDAOImpl();
      面向接口编程  :IStudentDAO    dao = new StudentDAOImpl(); 
     ```

好处:面向接口编程可以利用多态特性屏蔽不同子类之间的差异、解除模块之间的耦合！
多态示例：

```
public void show(List list){}
调用:
show(new  ArrayList());  //YES
show(new  LinkedList()); //YES

```

### DAO开发的步骤
 > 操作步骤:
1. 准备数据库jdbcdemo和表t_student        
2. 创建一个smis工程	                    
3. 导包:mysql驱动包/junit包/lombok包       
4. 创建包结构		                    		
5. 在指定包下创建domain类/接口/实现类
6. 编写接口的测试
7. 编写实现类方法

#### DAO接口
```
package com.shanjiancao.smis.dao;

import java.util.List;

import com.shanjiancao.smis.domain.Student;

/**
 * IStudentDAO.java
 * @version
 * @date 2018年5月24日 下午7:12:10
 * @author jeesk
 * @since 1.0
 *
 */
public interface IStudentDAO {

	/**
	 * @param student  保存学生
	 * @return
	 * @throws Exception
	 */
	int save(Student student) throws Exception;

	/**
	 * @param id  删除学生
	 * @return
	 * @throws Exception
	 */
	int delete(Long id) throws Exception;

	/**
	 * @param id  获得对应的学生的对象 
	 * @return
	 * @throws Exception
	 */
	Student get(Long id) throws Exception;

	/**
	 * @param student  更改学生的信息
	 * @return 
	 * @throws Exception
	 */
	int update(Student student) throws Exception;

	/**
	 * @return  获得所有学生的信息
	 * @throws Exception
	 */
	List<Student> getAll() throws Exception;
}

```

### 测试类
```
package com.shanjiancao.smis.test;

import java.util.List;

import org.junit.Test;

import com.shanjiancao.smis.dao.IStudentDAO;
import com.shanjiancao.smis.dao.impl.StudentDAOImpl;
import com.shanjiancao.smis.domain.Student;

/**
 * IStudentDAOTest.java
 * @version
 * @date 2018年5月24日 下午7:18:02
 * @author jeesk
 * @since 1.0
 *
 */
public class IStudentDAOTest {

	private IStudentDAO dao = new StudentDAOImpl();

	@Test
	public void testSave() throws Exception {
		Student student = new Student();
		student.setAge(12);
		student.setName("张小明");

		dao.save(student);
	}

	@Test
	public void testDelete() throws Exception {

		dao.delete(100L);
	}

	@Test
	public void testUpdate() throws Exception {
		Student student = new Student();
		student.setAge(12);
		student.setName("张大明");
		student.setId(1L);
		dao.update(student);
	}

	@Test
	public void testGet() throws Exception{
		Student student = dao.get(1L);
		System.out.println(student);
	}
	
	@Test
	public void testGetAll() throws Exception {
		List<Student> all = dao.getAll();
		all.forEach(System.out::println);
	}
	
	

}

```
### 实现类
```
package com.shanjiancao.smis.test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import javax.sql.ConnectionEvent;

import com.shanjiancao.smis.dao.IStudentDAO;
import com.shanjiancao.smis.domain.Student;

/**
 * StudentDAOImpl.java
 * @version
 * @date 2018年5月24日 下午8:20:46
 * @author jeesk
 * @since 1.0
 *
 */
public class StudentDAOImpl implements IStudentDAO {

	@Override
	public int save(Student student) {

		String sql = "insert into t_student(id,name,age) values (null,?,?)";
		Connection conn = null;
		PreparedStatement prepareStatement = null;
		int count = 0;
		//加载驱动
		try {
			Class.forName("com.mysql.jdbc.Driver");
			conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");
			prepareStatement = conn.prepareStatement(sql);
			prepareStatement.setString(1, student.getName());
			prepareStatement.setInt(2, student.getAge());
			count = prepareStatement.executeUpdate();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		// 获得Connection对象 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {

			if (prepareStatement != null) {
				try {
					prepareStatement.close();
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {

					if (conn != null) {
						try {
							conn.close();
						} catch (SQLException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}
		}

		return count;

	}

	@Override
	public int delete(Long id) {
		String sql = "delete from t_student where id = ?";
		int count = 0;

		//加载驱动
		PreparedStatement prepareStatement = null;
		Connection connection = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
			// 获得Connection对象 
			// 获得Connection对象 
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");
			prepareStatement = connection.prepareStatement(sql);
			prepareStatement.setLong(1, id);
			count = prepareStatement.executeUpdate();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {

			if (prepareStatement != null) {
				try {
					prepareStatement.close();
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {

					if (connection != null) {
						try {
							connection.close();
						} catch (SQLException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}
		}

		return count;
	}

	@Override
	public int update(Student student) {
		String sql = "update t_student set name = ?,age = ? where id = ?";
		int count = 0;
		Connection connection = null;
		PreparedStatement prepareStatement = null;
		try {
			//加载驱动
			Class.forName("com.mysql.jdbc.Driver");
			// 获得Connection对象 
			// 获得Connection对象 
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");
			prepareStatement = connection.prepareStatement(sql);
			prepareStatement.setString(1, student.getName());
			prepareStatement.setInt(2, student.getAge());
			prepareStatement.setLong(3, student.getId());
			count = prepareStatement.executeUpdate();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (prepareStatement != null) {
				try {
					prepareStatement.close();
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {

					if (connection != null) {

						try {
							connection.close();
						} catch (SQLException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}

					}
				}
			}

		}
		return count;

	}

	@Override
	public Student get(Long id) {
		String sql = "select id,name,age from t_student where id = ?";
		Student student = null;
		ResultSet rs = null;
		Connection connection = null;
		PreparedStatement prepareStatement = null;
		try {
			//加载驱动
			Class.forName("com.mysql.jdbc.Driver");
			// 获得Connection对象 
			// 获得Connection对象 
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");
			prepareStatement = connection.prepareStatement(sql);
			prepareStatement.setLong(1, id);
			rs = prepareStatement.executeQuery();
			student = new Student();
			while (rs.next()) {
				student.setId(rs.getLong("id"));
				student.setName(rs.getString("name"));
				student.setAge(rs.getInt("age"));
			}
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					if (prepareStatement != null) {
						try {
							prepareStatement.close();
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

		}

		return student;
	}

	@Override
	public List<Student> getAll() {
		String sql = "select id,name,age from t_student ";
		List<Student> list = new ArrayList<>();
		Connection connection = null;
		PreparedStatement preparedStatement = null;
		ResultSet rs = null;

		try {
			//加载驱动
			Class.forName("com.mysql.jdbc.Driver");
			// 获得Connection对象 
			// 获得Connection对象 
			connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/jdbcdemo", "root", "admin");
			preparedStatement = connection.prepareStatement(sql);
			rs = preparedStatement.executeQuery();

			while (rs.next()) {
				Student student = new Student();
				student.setId(rs.getLong("id"));
				student.setName(rs.getString("name"));
				student.setAge(rs.getInt("age"));
				list.add(student);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} finally {
					if (preparedStatement != null) {
						try {
							preparedStatement.close();
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
		}
		return list;
	}

}


```
### 初步了解重构（Refactoring）	

> ●重构（Refactoring）
重构就是通过调整程序代码,改善软件的质量、性能，使其程序的设计模式和架构更趋合理，提高软件的扩展性和维护性。

> 解决方案：声明为成员变量(在被类中任何地方都可以访问),然后在每一个DAO方法中,只需要去引用成员变量即可.

 把连接数据库的驱动和数据库的地址,账号和密码设置成成员变量


```
public class StudentDAOImpl2 implements IStudentDAO {

	private static final String DRIVER = "com.mysql.jdbc.Driver";
	private static final String URL = "jdbc:mysql://localhost:3306/jdbcdemo";
	private static final String USERNAME = "root";
	private static final String PASSWORD = "admin";

	@Override
	public int save(Student student) {

		String sql = "insert into t_student(id,name,age) values (null,?,?)";
		Connection conn = null;
		PreparedStatement prepareStatement = null;
		int count = 0;
		//加载驱动
		try {
			Class.forName(DRIVER);
			conn = DriverManager.getConnection(URL, USERNAME, PASSWORD);
			prepareStatement = conn.prepareStatement(sql);
			prepareStatement.setString(1, student.getName());
			prepareStatement.setInt(2, student.getAge());
			count = prepareStatement.executeUpdate();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		// 获得Connection对象 
		catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {

			if (prepareStatement != null) {
				try {
					prepareStatement.close();
				} catch (SQLException e) {
					e.printStackTrace();
				} finally {

					if (conn != null) {
						try {
							conn.close();
						} catch (SQLException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
					}
				}
			}
		}

		return count;

	}
```

### 在DAO 有实现类中的Connection是出现 多次的可以提取到一个类中,把连接数据库的驱动和数据库的地址,账号和密码可以放在资源文件中去
```
package com.shanjiancao.smis.util;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

/**
 * JDBCUtil.java
 * @version
 * @date 2018年5月24日 下午9:07:26
 * @author jeesk
 * @since 1.0
 *
 */
public enum JDBCUtil {

	INSTANCE;
	private static Properties p = new Properties();

	static {

		InputStream inStream = Thread.currentThread().getContextClassLoader().getResourceAsStream("config.properties");
		try {
			p.load(inStream);
			Class.forName(p.getProperty("driver"));
		} catch (IOException e) {
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

	}

	/**
	 * 创建一个实例{@link com.mysql.jdbc.Connection}
	 * @return
	 * @throws Exception
	 */
	public static Connection getConnection() {

		Connection connection = null;
		try {
			connection = DriverManager.getConnection(p.getProperty("url"), p.getProperty("user"), p.getProperty("password"));
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return connection;

	}

	// ,每次查询后,必须关闭数据库的连接
	/**
	 * 
	 * @param ps
	 * @param conn
	 * @param rs
	 */
	public static void close(PreparedStatement ps, ResultSet rs, Connection conn) {

		try {
			if (ps != null)
				ps.close();
		} catch (SQLException e) {

			e.printStackTrace();
		} finally {

			try {
				if (rs != null)
					rs.close();
			} catch (SQLException e) {

				e.printStackTrace();
			} finally {
				if (conn != null) {
					try {
						conn.close();
					} catch (SQLException e) {
						e.printStackTrace();
					}
				}
			}

		}

	}

}

```

