
---
title: 如何使用JDBC的线程池
copyright: true
date: 2018-05-25 01:00:28
categories: 数据库
tags:
---



## 数据库连接池					

### 为什么必须使用数据库连接池:
 
- 数据库连接(Connection)是一种关键的、有限的、昂贵的资源(这一点在多用户的网页应用程序中体现得尤为突出).

<!-- more -->
- 我们之前使用 DriverManager 来获取Connection对象，每次与数据库建立连接的时候都要将 Connection 加载到内存中，再验证用户名和密码(得花费0.05s～1s的时间)。获得Connection对象、执行完操作之后又断开连接。
> 使用这样的方式的严重后果:
- 数据库的连接资源并没有得到很好的重复利用，造成大量的资源消耗和时间浪费.
- 不能控制被创建的连接对象数，比如:程序出现异常而未能关闭，内存中Connection对象不断积累;同时有成千上万人在线，频繁的进行数据库连接操作创建无数的Connection对象。这样系统资源会被毫无顾及的分配出去，连接过多，可能导致内存泄漏，严重的甚至会造成服务器崩溃.
 

---

#### 结论:
1. 数据库的连接来之不易,我们需要使用技术保证Connection对象的重复利用.使用什么技术?数据库连接池!---暂时可以简单理解为一个集合里面装着Connection
使用数据库连接池技术来统一分配、管理和释放数据库连接,让应用程序能够重复使用一个现有的数据库连接，而不是再重新建立一个；
还可以释放长时间空闲的连接来避免因为没有释放数据库连接而引起的数据库连接遗漏(避免内存泄漏)。
2. 数据库连接的管理能显著影响到整个应用程序的伸缩性和健壮性，影响到程序的性能指标。在开发中绝对不可忽视!
 
 
思考题: 如何设计一个连接池?

1. 连接池有最大连接
2. 初始连接数
3. 最少连接数
4. 连接池的基本信息
5. 最长连接时间(关闭空闲的连接)
6. 超时时间(最长等待)
 

### 几种连接池的介绍

> Java中的连接池:
在Java中,连接池使用javax.sql.DataSource(数据源)接口来表示连接池规范.
 
> 注意:
1. DataSource(数据源)和连接池(Connection Pool)是同一个概念.
2. DataSource和JDBC一样,仅仅只是接口,SUN公司自己不提供实现,由第三方组织提供.
 
> 常见的DataSource的第三方实现: 

1.　DBCP:  Spring推荐的.
　

2.　druid: 阿里巴巴提供的连接池(德鲁伊,为监控而生的数据库连接池),是世界上最牛逼的连接池没有之一．官网:https://github.com/alibaba/druid/wiki/%E9%A6%96%E9%A1%B5

3.　C3P0:  Hibernate推荐的,在2007年开始就没有再更新了,性能比较差.(不讲)
 
 
### 使用连接池和不使用连接池的区别在哪里?
1. 获取Connection的方式不同:
      没有使用连接池:Connection conn = DriverManager.getConnection(url,username,password);
      使用连接池:Connection conn = DataSource.getConnection();
2. 释放Connection的方式不同:
      没有使用连接池: 是和数据库服务器断开(Connection.close())
      使用连接池: 是把Connection对象返还给连接池中,并没有和数据库服务器断开.
 
   (可以通过System.out.println(connection.getClass());看连接池对Connection的具体实现,并看它对close方法进行了重写)
--------------------------------------------------------------------
 
 
> 如何学习连接池

   学习连接池,主要是如何创建DataSource对象(不同的数据库连接池,其实就是在创建DataSource的方式上有所不同),
   
   然后从DataSource对象中获取Connection对象,有了Connection对象之后后面的操作就和以前一模一样.
   ```
Connection conn =  DataSource对象.getConnection();
 
 ```
#### 使用DBCP连接池(不支持自动关闭,所以还是需要关闭的)
1. 先把commons-dbcp-1.4.jar和commons-pool-1.5.6.jarcopy到项目的lib项目(可以在Apache的Commons项目去下载)
  
2. 撰写db.properties 数据库连接信息和连接池信息

db.properties
```

#连接字符串
url=jdbc:mysql://localhost:3306/jdbcdemo
#用户名
username=root
#密码
password=admin
#驱动的类路径
driverClassName=com.mysql.jdbc.Driver
# 下面的需要的才需要设置
#连接池启动时的初始值
#initialSize=1
#连接池的最大值
#maxActive=50
#连接池的最大空闲数
#maxIdle=20

```
DBCPUtil.java
```
package com.shanjiancao.smis.util;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSourceFactory;

/**
 * JDBCUtil.java
 * @version
 * @date 2018年5月24日 下午9:07:26
 * @author jeesk
 * @since 1.0
 *
 */
/**
 * @author s3296
 *
 */
public enum DBCPUtil {

	INSTANCE;

	private static DataSource ds = null;

	static {
		// 加载资源文件
		InputStream inStream = Thread.currentThread().getContextClassLoader().getResourceAsStream("db.properties");
		Properties p = new Properties();
		try {
			p.load(inStream);

			ds = BasicDataSourceFactory.createDataSource(p);

		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	/**
	 * 创建一个实例
	 * @return
	 * @throws Exception
	 */
	public static Connection getConnection() {

		try {
			return ds.getConnection();
		} catch (SQLException e) {
			e.printStackTrace();
			throw new RuntimeException("数据库连接失败!!!");
		}

	}

	// ,每次查询后,必须关闭数据库的连接
	/**
	 *   关闭流
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

#### 使用Druid

> Druid

1. Druid是阿里巴巴开源平台上的一个项目，整个项目由数据库连接池、插件框架和SQL解析器组成。该项目主要是为了扩展JDBC的一些限制，可以让程序员实现一些特殊的需求，比如向密钥服务请求凭证、统计SQL信息、SQL性能收集、SQL注入检查、SQL翻译等，程序员可以通过定制来实现自己需要的功能。 
该项目在阿里巴巴内部得到了广泛的部署，在外部也有大量的用户群。
 
2. github介绍
https://github.com/alibaba/druid/wiki/%E9%A6%96%E9%A1%B5
 
https://github.com/alibaba/druid/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98
 
3. 从DBCP迁移
DruidDataSource的配置是兼容DBCP的。从DBCP迁移到DruidDataSource，只需要修改数据源的实现类就可以了。


DBCP的数据库连接池的实现是：
org.apache.commons.dbcp.BasicDataSource
替换为：
com.alibaba.druid.pool.DruidDataSource

> tip:
Druid会自动跟url识别驱动类名，如果连接的数据库并非常见数据库，需要配置属性driverClassName



 
 



 

 

