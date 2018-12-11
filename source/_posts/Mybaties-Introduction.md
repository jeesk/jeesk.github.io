
---
title: Mybaties入门详解
copyright: true
date: 2018-05-29 15:03:54
categories: java
tags:
---




##  JDBC编程存在的问题

#### 原始JDBC编程存在的问题

1. 代码繁琐，重复
2. 资源频繁创建和销毁(虽然可以使用连接池解决)
3. sql语句写死在代码中，不方便维护
4. ?占位符参数设置当参数较多时比较麻烦
5. 封装处理结果集很麻烦(封装结果集)
<!-- more -->
#### 分析问题
> 问题分析与解决
 
- 资源的创建和销毁
	同样使用连接池来管理,并且也使用配置文件来配置数据库相关的连接信息,比如配置在config.xml中(使用xml作为配置文件能够表达层级关系,比properties强大)
- sql语句硬编码
	将sql语句也配置在配置文件中,与Java代码相分离,提高可维护性,比如配置在xxxMapper.xml文件中
- ?占位符参数设置参数数量过多
	将参数统一封装、传递、设置-->需要编写参数解析器
- 对结果集封装处理的限制条件
	对结果集统一处理,需要编写结果集处理器(对于名称和类型不一致的字段/属性使用ORM思想解决)
 
(这些问题早已有人帮我们解决了,并把解决方案封装成了一个叫作MyBatis的框架供我们拿过来直接使用！)



#### 前奏

学习Mybaties框架之前先来学习一下ORM思想

 
●对象关系映射（Object Relational Mapping，简称ORM）：
是一种为了解决面向对象与关系数据库存在的互不匹配的问题的技术。 
简单的说，ORM是通过使用描述对象和数据库之间映射的元数据，将Java程序中的对象自动持久化到关系数据库中。
 
ORM 主要解决对象到关系的映射：
面向对象概念    	面向关系概念
----------------------------------------------------------------------
类                  		表
属性             		表的列（字段）
对象            	 	表的行（记录）
 

类 | 表
---|---
属性  | 表的列(字段)
对象 | 表的行(记录)

 
●常见ORM框架
1. JPA：本身是一种ORM规范,不是ORM框架。由各大ORM框架提供实现。
2. Hibernate：目前最流行的ORM框架。设计灵巧,性能优秀,文档丰富。
3. MyBatis目前最受欢迎的持久层解决方案。
 
##### 框架本质：
1. 框架是一系列jar包，其本质是对JDK功能的拓展。
2. 框架是一组程序的集合，包含了一系列的最佳实践，作用是解决某一个领域的问题。
 
##### 最佳实践（Best Practice）：
实际上是无数程序员经历过无数次尝试之后，总结出来的处理特定问题的特定方法。
如果把程序员的自由发挥看作是一条通往成功的途径，最佳实践就是其中的最短路径，能极大的解放生产力。

> Web开发中的最佳实践：根据职责的纵向划分：控制层、业务层、持久层：

- 控制层 ：web/mvc:   负责处理与界面交互的相关操作       (Spring MVC/Struts2)
- 业务层 ：service:   负责复杂的业务逻辑计算和判断       (Spring)
- 持久层 ：dao:       负责将业务逻辑数据进行持久化存储    (MyBatis/Hibernate)


#### 简单认识Mybaties


认识MyBatis

> 介绍 :

MyBatis   是支持普通SQL查询，存储过程和高级映射的持久层框架，严格上说应该是一个SQL 映射框架。其前身是iBatis，也就是淘宝使用的持久层框架。
几乎所有的 JDBC代码和参数的手工设置以及结果集的处理都可以交给MyBatis完成，而这只需要简单的使用XML或注解配置就可以完成。和Hibernate相比更简单、更底层、性能更优异，因此更深入人心，更受企业的青睐。

[GitHub地址](https://github.com/mybatis)

包括了MyBatis很多子项目：
- mybatis-3:             MyBatis框架
- generator：            代码生成器
- spring:                MyBatis和Spring集成的组件
- spring-boot-starter：  MyBatis和Spring Boot集成的组件
- mybatipse：            MyBatis的Eclipse插件
 
> 中文文档：[入门文档](http://www.mybatis.org/mybatis-3/zh/index.html) 和 [Spring整合文档](http://www.mybatis.org/spring/zh/index.html)

#### Mybaties核心组件


■核心组件
1. SqlSessionFactoryBuilder（构建器）：
根据配置信息或Java代码来构建SqlSessionFactory对象。
作用：创建SqlSessionFactory对象。
2. SqlSessionFactory（会话工厂）：
好比是DataSource，线程安全的，在应用运行期间不要重复创建多次，建议使用单例模式。
作用：创建SqlSession对象
3. SqlSession（会话）：
好比是Connection，线程不安全的，每次使用开启新的SqlSession对象，使用完毕正常关闭，默认使用DefaultSqlSession。
作用：提供操作数据库的  增删改查方法，可以调用操作方法，也可以操作Mapper组件。
4. Executor（执行器）：
SqlSession本身不能直接操作数据库，需要Executor来完成，该接口有两个实现：缓存执行器（缺省）、基本执行器。
5. MappedStatement：
映射语句封装执行语句时的信息如SQL、输入参数、输出结果。 
 
> 涉及到的对象(不作要求)：

- SqlSession：表示和数据库交互的会话，完成必要数据库增删改查功能。
- Executor：执行器，是MyBatis 调度的核心，负责SQL语句的生成和查询缓存的维护。
- StatementHandler：语句处理器，封装了JDBC的DML、DQL操作、参数设置。
- ParameterHandler：参数处理器，把用户传入参数转换为JDBC需要的参数值。
- ResultSetHandler：结果集处理器，把结果集中的数据封装到List集合。
- TypeHandler：类型转换器，Java类型和JDBC类型的相互转换。
- MappedStatement：映射语句对象，维护了一条<insert|update|delete|select>节点的封装。
- SqlSource：SQL源，根据用户传入的参数生成SQL语句，并封装到BoundSql中。
- BoundSql：SQL绑定，封装SQL语句和对应的参数信息。
- Configuration：MyBatis全局配置对象，封装所有配置信息。
 
 
 
 
 
 文件目录:
 ![enter description here](http://7s1rrm.com1.z0.glb.clouddn.com/18-5-29/82954557.jpg)
 


#### 准备工件

●创建工程&导入jar包
MyBatis依赖jar包:
1. MySQL驱动包：mysql-connector-java-5.1.*.jar
2. MyBatis核心包：mybatis-3.4.5.jar
3. 其他依赖包：lib目录中的其他jar（需要时，再拷贝）
 
 
●数据表和对象
创建表

 ```
CREATE TABLE `t_user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `salary` decimal(8,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

 ```
创建Java文件

●操作对象：
```
package com.shanjiancaofu.smis.domain;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Product.java
 * @version
 * @date 2018年5月27日 上午11:56:48
 * @author jeesk
 * @since 1.0
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	private Long id;
	private String name;
	private BigDecimal salary;
}
 
 ```
 
 
 #### 主要的配置文件
 
 > 主配置文件(放在Src同级目录下面的Resources目录下,会编译到字节码编译路径)
 
主配置文件主要包括数据库的信息，如:驱动名,url,用户名,密码，如连接池、事务等和全局的配置如关联映射日志、插件等。
命名: 一般使用mybatis-config.xml   
位置: 一般放在编译路径


```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
  PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>

    <!-- 这儿配置的是一个properties资源文件 ,可以使用${key}在的形式配置连接池的value -->
	<properties resource="db.properties" />

	<typeAliases>
<!--     	为某一个包下面配置别名为简单类名,如果是某一个类需要配置单独的别名可以在类止使用@Alias标签      -->
<!-- 	   <package name="com.shanjiancaofu.smis.domain"/> -->
	
        <!--                   配置单个类文件的别名 ,可以在Mapper.xml文件中使用这一些别名-->
		<typeAlias type="com.shanjiancaofu.smis.domain.User" alias="User" />
			<!--   配置某一个包下面的别名为 -->


	</typeAliases>

<!-- configuration表示根标签, environments表示环境,,default 灭表示默认使用那一个 -->
	<environments default="development">
		<environment id="development">
    <!-- transation表示事务管理器  -->
			<transactionManager type="JDBC" />
			<dataSource type="POOLED">  
      <!-- POOLD表示使用的默认的连接池 -->
				<property name="driver" value="${driver}" />
				<property name="url" value="${url}" />
				<property name="username" value="${username}" />
				<property name="password" value="${password}" />

			</dataSource>
		</environment>
	</environments>
	<mappers>
		<mapper resource="com/shanjiancaofu/smis/mapper/UserMapper.xml" />
	</mappers>
</configuration>
```
 

> 映射文件

映射文件主要是包含该对象的CRUD操作的配置和SQL。
命名:xxxMapper.xml    xxx表示要操作的类名   比如要操作User类  就是  UserMapper.xml
位置:一般放在mapper包下


```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
  PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
  "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.shanjiancaofu.smis.mapper.UserMapper">


	<insert id="save" parameterType="User" useGeneratedKeys="true"
		keyColumn="id" keyProperty="id">
    <!-- 插入一个学生对象 -->
		insert into t_user(id,name,salary) values(null,#{name},#{salary})

	</insert>
    <!-- 删除指定Id的学生对象 -->
	<delete id="delete" parameterType="long">

		delete from t_user where id = #{id}

	</delete>
    <!-- 查询指定Id的学生对象 -->>
	<select id="get" parameterType="long" resultType="User">  

		select id,name,salary from t_user where id = #{id}

	</select>
    <!-- 获得所有的学生对象 -->
	<select id="getAll" resultMap="userMap">

		select uid,uname,usalary from t_user;

	</select>
    <!-- 修改某一个学生对象 -->>
	<update id="update" parameterType="User">

		update t_user set name = #{name},salary = #{salary} where id = #{id};

	</update>
	


</mapper>

```

#### 提取Mybaties的SqlSession工具类

```
package com.shanjiancaofu.smis.uitl;
import java.io.IOException;
import java.io.InputStream;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

/**
 * MybatiesUtil.java
 * @version
 * @date 2018年5月27日 下午6:15:00
 * @author jeesk
 * @since 1.0
 * 
 *  Mybaties的SqlSession工具类的设计
 *  1): 在静态代码块中加载配置文件
 *  2); 在静态代码块中创建SqlSeesionFactory相当于DataSource,只需要创建一次就够了
 */
public abstract class MybatiesUtil {

	private static SqlSessionFactory sqlSessionFactory = null;
	static {

		try {
			InputStream resourceAsStream = Resources.getResourceAsStream("mybaties-config.xml");
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);

		} catch (IOException e) {
			e.printStackTrace();
			throw new RuntimeException("服务器忙!");
		}

	}

	public static SqlSession openSession() {

		return sqlSessionFactory.openSession();

	}

}
```
#### DAO通用接口

```
package com.shanjiancaofu.smis.dao;

import java.util.List;

/**
 * IDAO.java
 * @version
 * @date 2018年5月27日 下午6:10:02
 * @author jeesk
 * @since 1.0
 *
 */
public interface IDAO<T> {

	/**  保存操作
	 * @param t
	 */
	void save(T t);

	/** 更新操作
	 * @param t
	 */
	void update(T t);

	/** 删除操作
	 * @param id
	 */
	void detele(Long id);

	/** 查询指定Id的对象
	 * @param id
	 * @return
	 */
	T get(Long id);

	/** 查询所有的对象
	 * @return
	 */
	List<T> getAll();

}

```
#### User类
```
package com.shanjiancaofu.smis.domain;
import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Product.java
 * @version
 * @date 2018年5月27日 上午11:56:48
 * @author jeesk
 * @since 1.0
 *
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
	private Long id;
	private String name;
	private BigDecimal salary;
}

```
#### 测试先行,先写测试类
```
package com.shanjiancaofu.smis.dao;

import java.math.BigDecimal;
import java.util.List;

import org.junit.Test;

import com.shanjiancaofu.smis.domain.User;

/**
 * UserDAOImplTest.java
 * @version
 * @date 2018年5月27日 下午6:24:38
 * @author jeesk
 * @since 1.0
 *
 */
public class UserDAOImplTest {

	private IDAO<User> dao = new UserDAOImpl();

	@Test
	public void testSave() {

		User user = new User(null, "掌上电脑", new BigDecimal("5999"));
		System.out.println(user);
		dao.save(user);
		System.out.println(user);

	}

	@Test
	public void testUpdate() {
		User user = new User(2L, "大在在", new BigDecimal("100000"));

		dao.update(user);
	}

	@Test
	public void testDetele() {
		dao.detele(1L);
	}

	@Test
	public void testGet() {
		User user = dao.get(3L);
		System.out.println(user);
	}

	@Test
	public void testGetAll() {

		List<User> list = dao.getAll();
		list.forEach(System.out::println);

	}

}

```
#### DAO实现类
```
package com.shanjiancaofu.smis.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.shanjiancaofu.smis.domain.User;
import com.shanjiancaofu.smis.uitl.MybatiesUtil;

/**
 * UserDAOImpl.java
 * @version
 * @date 2018年5月27日 下午6:13:52
 * @author jeesk
 * @since 1.0
 *  User的Dao类
 */
public class UserDAOImpl implements IDAO<User> {

	private String getStatement(String str) {

		return "com.shanjiancaofu.smis.mapper.UserMapper." + str;

	}

	@Override
	public void save(User t) {
	// 获得SqlSession对象
		SqlSession openSession = MybatiesUtil.openSession();
	// 获得插入语句
		openSession.insert(getStatement("save"), t);
	// 提交事务
		openSession.commit();
	// 关闭资源
		openSession.close();
	}

	@Override
	public void update(User t) {

		SqlSession openSession = MybatiesUtil.openSession();
		openSession.update(getStatement("update"), t);
		openSession.commit();
		openSession.close();

	}

	@Override
	public void detele(Long id) {
		SqlSession openSession = MybatiesUtil.openSession();
		openSession.delete(getStatement("delete"), id);
		openSession.commit();
		openSession.close();
	}

	@Override
	public User get(Long id) {
		SqlSession openSession = MybatiesUtil.openSession();
		User user = openSession.selectOne(getStatement("get"), id);
		openSession.commit();
		openSession.close();
		return user;
	}

	@Override
	public List<User> getAll() {
		SqlSession openSession = MybatiesUtil.openSession();
		List<User> list = openSession.selectList(getStatement("getAll"));
		openSession.commit();
		openSession.close();
		return list;
	}

}

```


#### 简单配置Mybaties的日志记录
[官方配置文档](http://www.mybatis.org/mybatis-3/zh/logging.html)

1. 先把log4j-1.2.17.jar导入lib目录,build path.
2. 在resources 目录下导入log4j.properties
```
# Global logging configuration
log4j.rootLogger=ERROR, stdout
# MyBatis logging configuration...
# 这里的 com.shanjiancaofu.smis.mapper可以换成任意包mapper包,mapper包里放的xml文件
log4j.logger.com.shanjiancaofu.smis.mapper=TRACE
# Console output...
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=%5p [%t] - %m%n

```
#### Mybaties的两个核心Xml文件约束DtD的导入

mapper.xml的约束文件 
``` 
"http://mybatis.org/dtd/mybatis-3-mapper.dtd">
```
mybaties-config.xml的约束文件 : 
```
"http://mybatis.org/dtd/mybatis-3-config.dtd">

```

可以直接把这两个网址复制到浏览器中直接下载

导入方式: 

打开Eclispe的window > preference > xml > XML Catelog 
点击ADD 
1. localtiont选择FileSystem的是你的dtd文件的位置
2. Key Type 选择URI
3. KEY就是对应的dtd网址,请直接复制

#### 下一次我们来讲讲Mybaties的${}和#{}的区别,再聊聊如何解决使用Mybaties的时候,表的列名和类的属性名不同的问题