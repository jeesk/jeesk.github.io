---
title: Mysql 数据库入门第一章
copyright: true
date: 2018-05-22 01:00:28
categories: 数据库
tags:
---




  ## 什么是数据库 (==强迫症请跳过==)
#### 常见概念:
1. 数据库(DataBase:DB)：
==数据库是按照数据结构来组织、存储和管理数据的仓库==。---->存储和管理数据的仓库.其本质就是一个按特定格式存储数据的文件系统+对这些文件的管理
<!-- more -->

2. 数据库管理系统（Database Management System:DBMS）：
是专门用于管理数据库的计算机系统软件。数据库管理系统能够为数据库提供数据的定义、建立、维护、查询和统计等操作功能，并完成对数据完整性、安全性进行控制的功能。

3. 我们一般说的数据库,指的就是DBMS: 数据库服务器

---

### 前言

> 不 要 失 去 希 望 . 即 使 是 微 弱 的 灯 火 也 好 . 让 希 望 之 灯 常 明 吧. 只 要 有 希 望 , 多 么 严 酷 都 能 忍 耐.


---

## 数据库的发展历程 (==强迫症请跳过==)

#### 数据库技术发展历程：
1. 层次数据库和网状数据库技术阶段；
    使用指针来表示数据之间的联系。
2. 关系数据库技术阶段；(关系其实就是表,关系型数据库其实就是用二维表格来表示各类事物间的关系并进行存储)
    经典的里程碑阶段。代表DBMS:Oracle、DB2、MySQL、SQL Server、SyBase等。
3. 后关系数据库技术阶段；
    关系型数据库存在数据模型，性能，拓展伸缩性的缺点，出现了：
    ORDBMS：面向对象数据库技术。
    NoSQL ：非结构化数据库技术。

- 随着大数据的不断发展，非关系型的数据库现在成了一个极其热门的新领域，非关系数据库产品的发展非常迅速，涌现出很多出色的NoSQL数据库
常见的NoSQL数据库分为四大类：
1. 键值存储数据库：Oracle BDB,Redis,BeansDB
2. 列式储数数据库：HBase,Cassandra,Riak
3. 文档型数据库：MongoDB,CouchDB
4. 图形数据库：Neo4J,InfoGrid,Infinite Graph

- NewSQL: 是对各种新的可扩展/高性能数据库的简称，这类数据库不仅具有NoSQL对海量数据的存储管理能力，还保持了传统数据库支持ACID和SQL等特性。

## 常见的关系类数据库 (==强迫症请跳过==)
          
数据库系统 | 所属公司
---|---
Oracle | Oracle 
DB2| IBM
SQL Server | MS
Mysql | AB --> SUN -->Oracle 
---------------------------------------------------------------------
- Oracle: 运行稳定，可移植性高，功能齐全，性能超群！适用于大型企业领域。
- DB2：速度快、可靠性好，适于海量数据，恢复性极强。适用于大中型企业领域。
- SQL Server: 全面，效率高，界面友好，操作容易，但是不跨平台。适用于于中小型企业领域。C#、.net等语言常使用。
- MySQL: 开源，体积小，速度快。适用于于中小型企业领域。已经被Oracle收购了.MySQL6.x版本也开始收费。
- SQLite:  嵌入式的小型数据库，一般应用在手机端。
- H2: 纯java实现的关系数据库,同时支持网络版和嵌入式版本，另外还提供了内存版，常用来做开发测试使用

## 数据库的一些概念
#### 表-->table
> 什么是表(table)？
```
我们说MySQL是一种关系型数据库。关系数据库最重要的概念就是表。  
数据库中的表就是一个多行多列的表格。在创建表时，需要指定表的列数，以及列名称，列类型等信息。而不用指定表格的行数，行数是没有上限的。
表具有固定的列数和任意的行数，在数学上称为“关系”。
表中的列我们称之为字段，表中的行我们称之为一条记录/一条数据。
用我们熟悉的java程序来与关系型数据对比，就会发现以下对应关系。
表	-------	类	
表中的列	-------	类中属性
表中一条记录	-------	类的一个对象
```

#### sql语句的注释和书写规则 :
1. 在数据库中，SQL语句大小写不敏感,SELECT / select /SeLeCt (关键字建议大写)
2. 为了提高可读性，一般关键字大写，其他小写，例如： SELECT * FROM user;
3. SQL语句可单行或多行书写,一整条语句结束用 ; 分号结尾
4. 在SQL语句中，关键字不能跨多行或缩写
5. 可以使用空格和缩进使程序易读
6. 可以使用#、-- 、/**/的方式完成注释
7.  使用#注释 
8.    --  注释
9.   /*
     注释
      */

#### SQL：结构化查询语言(Structured Query Language)。
> 是关系型数据库标准语言。
> 特点：简单，灵活，功能强大。
----------------------------------------------------
###### SQL包含6个部分：
1. ==数据定义语言（DDL）==：
用来定义数据库对象：数据库，表，列等，例如创建、删除、修改数据库和表结构、为表加入索引等。其语句包括动词CREATE、ALTER、DROP、TRUNCATE。等。
2. ==数据操作语言（DML）==：
用来对数据库中表的记录进行更新，例如：增、删、改表记录。其语句包括动词UPDATE、INSERT、DELETE。它们分别用于添加，修改和删除表中的行。
3. ==数据查询语言（DQL）==：
用来查询数据库中表的记录。也称为“数据检索语句”。保留字SELECT是DQL（也是所有SQL）用得最多的动词，其他DQL常用的保留字有WHERE，ORDER BY，GROUP BY和HAVING。
4. 数据控制语言（DCL）：
用来定义数据库的访问权限和安全级别，及创建用户；它的语句通过GRANT或REVOKE获得许可，确定单个用户和用户组对数据库对象的访问。某些RDBMS可用GRANT或REVOKE控制对表单个列的访问。
5. 事务处理语言（TPL）：
用于确保被DML语句影响的表的所有行及时得以更新。TPL语句包括BEGIN TRANSACTION，COMMIT和ROLLBACK。
6. 指针控制语言（CCL）：
用于对一个或多个表单独行的操作。像DECLARE CURSOR，FETCH INTO和UPDATE WHERE CURRENT

>DDL是对数据库或表的结构进行操作，而DML是对表的记录进行操作(增、删、改)。我们以后最常用的就是DQL、DDL、DML。

###### 数据库的存储引擎
> MySQL中的数据用各种不同的技术存储在文件（或者内存）中。这些技术中的每一种技术都使用不同的存储机制、索引技巧、锁定水平并且最终提供不同的功能和能力。
通过选择不同的技术，你能够获得额外的速度或者功能，从而改善你的应用的整体功能。

```
MyISAM：拥有较高的插入，查询速度，但不支持事务，不支持外键。
InnoDB  ：支持事务，支持外键，支持行级锁定，性能较低。

InnoDB 存储引擎提供了具有提交、回滚和崩溃恢复能力的事务安全。但对比MyISAM，处理效率较差，且会占用更多的磁盘空间以保存额外数据和索引。
```

## 启动和连接MySQL

启动和连接MySQL
> 数据库操作流程模式：
1. 启动服务
2. 建立连接（认证身份）
3. 客户端向服务器端发送SQL命令
4. 服务器端执行SQL，并返回执行的结果
5. 客户端接收结果（并显示）
6. 断开连接
--------------------------------------
> 启动MySQL服务:(需要使用管理员身份运行)
- 打开数据库连接之前:一定要保证MySQL服务已经开启了.
- net start 命令名字:开启一个服务，如：net start mysql
- net stop  命令名字:关闭一个服务器，如：net stop mysql
---------------------------------------
> 连接MySQL数据库:
  1. 进入MySQL, 在命令行中输入密码； 
  2. 在命令行中
  
 ```
  格式:   mysql -u账户 -p密码 -h数据库服务器安装的主机 -P数据库端口
  mysql -uroot -padmin   -h127.0.0.1 -P3306
  
  若连接的数据库服务器在本机上，并且端口是3306。
  则可以简写： mysql -uroot -padmin
  ```
 ## 数据库和数据库对象					

> 数据库对象：存储，管理和使用数据的不同结构形式，如：表、视图、存储过程、函数、触发器、事件等。

> 数据库：存储数据库对象的容器。
-----------------------------------------------------------------------------
> 数据库分两种：

   1. 系统数据库（系统自带的数据库）：前三个不能修改
        information_schema:存储数据库对象信息，如：用户表信息，列信息，权限，字符，分区等信息。
        performance_schema:存储数据库服务器性能参数信息。
        mysql:存储数据库用户权限信息。
        test:任何用户都可以使用的测试数据库。
          
   2. 用户数据库（用户自定义的数据库）：一般的，一个项目一个用户数据库。
        
## ==数据库两种最常用用储存引擎==
- MyISAM：==拥有较高的插入，查询速度，但不支持事务，不支持外键。==
- InnoDB  ：==支持事务，支持外键，支持行级锁定，性能较低。==

## 数据库的操作语句

#### 数据库和表相关
> 创建数据庫:  ``` creat database mydb; ```

> 删除数据庫 ``` drop database 数据库名字; ```

> 删除数据不删除表 ``` truncate table db_name ```

> 如果数据库存在才删除 ``` DROP TABLE IF EXISTS table_name;  ```

> 查看数据库服务器存在哪些数据库：```  show  databases; ```

> 查看某个数据库的定义信息: ``` show create database 数据库名; ```

> 查看表的结构 :               ``` DESC table-name ```

> 使用指定的数据库： ``` use 数据库名; ```

> 查看正在使用的数据库:  ``` select database(); ```

> 查看指定的数据库中有哪些数据表:  ``` show tables; ```


> 查看表有那些表 ``` SHOW TABLES; ```

> 删除表 ```drop table table_name; ```

> 创建指定名称的数据库 :  ``` create database [if not exists] 数据库名称 [character set 字符集] [collate 校对规则];   ```

> 使用指定的编码创建数据库 ``` create database 数据库名称 character set utf8;  ```


> 使用指定的编码和校对规则创建数据库  ``` create database 数据库名称 character set utf8 collate utf8_general_ci;  ```

#### 数据库导入和导出
> 导出: mysqldump -uroot -padmin jdbcdemo > F:\test.sql

数据库存在才能导入

> 导入:  mysql -uroot -padmin jdbcdemo < F:\test.sql

> window的cmd中mysql中文乱码  ```set charset gbk; ```


## ==建表练习== (如果想学习Mysql的同学请练习下面的习题吧)
1. 先创建数据库:

``` drop DATABASE IF EXISTS jdbcdemo;  -- 可以先判断数据库 是否存在,存在就删除 ```

``` CREATE DATABASE jdbcdemo; -- 创建数据库 ```

``` USE jdbcdemo; -- 进入这一个数据库 ```

2. 建表语法
``` DROP TABLE IF EXISTS 表名; -- 判断这一个表是否存在, 存在就删除 ```

```
CREATE TABLE 表名(
	列名1 类型 [约束],
	列名2 类型 [约束],
	列名3 类型 [约束],
	列名4 类型 [约束]
); 
```


3.  建表练习
-- 需求定义一张学生信息表(t_student),包含id,name,email,age列
-- 注意: 最后一行没有逗号
```
CREATE TABLE t_student(
	id INT,
	name VARCHAR(20),
	email VARCHAR(20),
	age INT
	

);
```
> 注意:

- 若在建表中使用到了数据库的关键字.
- 比如:使用order来表示订单,但是order是SQL中的关键字,表示排序之意,不可以使用关键字做表名.
>  解决方案:
- 避免使用关键字,换一个单词.
-  如果是表名,有人习惯于使用t_作为前缀.
- 使用反引号`括起来. `order`

#### 表的约束

> 作用：用来保证数据库表中数据的完整性/正确性/合法性...

- 表的约束(针对于某一列):
1. 非空约束：NOT NULL，不允许某列的内容为空null。
2. 唯一约束：UNIQUE，在该表中，该列的内容必须唯一,不可重复,但是对null值无效。
3. 主键约束：PRIMARY KEY， 非空且唯一:PK。每一行唯一的标识.
4. 外键约束：FOREIGN KEY，A表中的外键列. A表中的外键列的值必须参照于B表中的某一列(B表主键).

- 其他设置
1. 主键自增长：AUTO_INCREMENT，从1开始，步长为1(这样插入数据的时候id列可以不写,写的时候写null)
2. 设置列的默认值：DEFAULT。
 
#### 主键设计：
> 分类方式一:

单列主键，单列作为主键(推荐使用)

复合主键，使用多列充当主键(不推荐使用)
> 分类方式二:

代理主键:使用没有业务含义的列作为主键(推荐使用)
自然主键:使用有业务含义的列作为主键(不推荐使用)


> 创建表并指定约束,
```
DROP TABLE IF EXISTS t_student;
CREATE TABLE t_student(

	id INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(20),
	email VARCHAR(20) NOT NULL,
	age INT DEFAULT 18
);
```


>  DML准备工作:  在命令行中执行下面的语句

```
DROP TABLE IF EXISTS `t_student`;
CREATE   TABLE  t_student(
         id        BIGINT,
         name      VARCHAR(20),
         email     VARCHAR(40),
         age       INT
);
```


> DML 语句都会返回一个受影响的行数,表示成功操作了多少条数据
 
## ==插入语句==:
 
-- 基本语法格式:INSERT INTO  表名 [(列名1,列名2....)]  VALUES(值1,值2...);
 
-- 需求:插入一条学生信息
```
INSERT INTO t_student (id,name,email,age) VALUES (NULL,'bob','s3287@',19);
```
 
1. 插入全部列值
- 格式:insert into 表名(列名1,列名2,...) values(值1,值2,...);
- 注意:表名后面是当前表中所有字段(列),多个字段之间使用逗号分隔,字段值必须使用引号（建议单引号）,如果是整型数据引号可以省略。
> 示例:
```
INSERT INTO t_student (id,name,email,age) values (NULL,'coc','ddf@173.com',13);
```
 
 
2.不指定列插入(了解)
- 格式:insert into 表名 values(值1,值2,...);
- 注意:没有给出要插入的列，表示插入所有列；值的个数和顺序，必须与表创建时一致
>  示例:
```
INSERT INTO t_student VALUES (NULL,'不错','23432@QMIN.COM',14);
``` 
 
3. 插入指定列值
- 格式:insert into 表名(列名1,列名2,...) values(值1,值2,...);
- 注意:表名后面是当前表中部分列名称
> 示例:
 
``` INSERT INTO t_student (name,email) VALUES ("qob",'qob@173.com');  ``` 年龄没有插入为默认的
 
4.插入多条数据记录（MySQL特有）
- 格式:INSERT INTO 表名 [(列名1,列名2,...)] VALUES (值1,值2,...),(值1,值2,...), (值1,值2,...)..;
> 示例:

```		INSERT INTO t_student (id,name,email,age) values (NULL,'coc','ddf@173.com',13),(NULL,'erqr32','sss@qq.com',NULL); ```
 
5. 插入查询结果(了解)
- 格式:INSERT INTO 表名 (列名1,列名2,...) SELECT 列名1,列名2...FORM  表名
> 示例:  可以把一个sql查询的结果看做是一个临时的表

```	INSERT INTO t_student(name,email,age) SELECT name,email,age from t_student; ```
 
 
6. 插入NULL和’’
- 注意:null和’’是不同的, null表示没有值, ’’表示有值但是值没有内容
> 示例:
```	
INSERT INTO t_student (name,email,age) VALUES ('杰克','',22);
```
 

## 修改和删除语句

> 格式: UPDATE 表名  SET  列名1 = 值1,列名2 = 值2,... [ WHERE 条件]
> 注意:
1. 如果没有 WHERE 条件,则修改全表.
2. 主键是不能被修改的(因为通过原来的主键再也找不到该条数据了,类比身份证号不能修改).
 
> 需求1:修改杰克的名字为杰克马

```
UPDATE t_student SET name = '杰克马';

 ```
 
> 需求2:修改id为1的学生,名字改为杰克逊,年龄改为20

 ```
 UPDATE t_student SET name = '杰克逊' , age = 12 WHERE id = 1;
 ```

- 删除语句:
- 格式: DELETE FROM  表名 [WHERE 条件]  -- 删除符合条件的数据
-注意: FROM不要写成 FORM. 如果没有 WHERE条件则表示删除所有,会清空表数据.
 
> 需求:删除id为2的学生信息

DELETE FROM t_student WHERE id = 2;
 
-- =========================================================================================

 
> 扩展:删除整张表的内容,两种实现方式:

1. delete FROM 表名;
2. truncate [table] 表名;

区别:
1. delete属于DML语句,truncate属于DDL语句,DML语句会有事务控制,所以如果在一个事务中，delete数据，这些数据可以找回,而truncate删除的数据找不回来.
2. delete是一行一行删除,truncate是将表结构销毁,再重新创建表结构,数据多的时候,效率更高
3. 

## ==查询进阶(新手必学,非常重要)==
[sql文件点击下载](http://http://shanjiancaofu.com/posts/database/sql-statement.html)
> 导入sql(product.sql) 


> ==为了提高体验请使用Navicat或者是Mysql WorkBench等其它的sql客户端==
> ==请复制下面的代码到客户端操作==

```
-- ●查询的最简单的语法:
-- SELECT   列名1,列名2,列名3,....FROM  表名  [WHERE   条件];
-- 可以写成: 
-- SELECT  *   FROM  表名;
-- 此时,查询出来的列的顺序和建立表时列的先后顺序相同.
 
-- 说明：
   -- SELECT   选择查询列表
   -- 如果为 * 和创建表时的顺序一致,
   -- 可以自己调整顺序，也可以在SELECT后边加上要查询的列名。
   -- FROM    提供数据源(表、视图或其他的数据源) 
 
-- 注意:SELECT 查询出来的结果可以看作是一张临时表
 
```
# > Tip:  -- 是注释, # 也是注释 , /* 注释 */这一写也是注释
 
 ```
-- ●简单数据查询
-- 语法：
-- SELECT{*|列名 [alias],...}  FROM   表名;
-- 需求:查询所有商品信息
 
-- 需求:查询商品的id,productName,salePrice
```


```
SELECT id,productName,salePrice FROM product;
```
```
-- =================================分割线========================================================
```
 ```
-- ●避免重复数据
-- 语法：
-- SELECT    DISTINCT  列名，... FROM  table_name;
-- 说明:DISTINCT用来去除重复记录
-- 需求:查询商品的分类编号。
```


```
	SELECT DISTINCT dir_id FROM product;
```
```
-- ====================================分割线=====================================================  ```
 
 
 
## 实现数学运算
```
-- 对NUMBER型数据可以使用算数操作符创建表达式（+  -  *  /）
-- 对DATE型数据可以使用部分算数操作符创建表达式 （+  -）
-- 运算符优先级：
-- 1、乘法和除法的优先级高于加法和减法
-- 2、同级运算的顺序是从左到右
-- 3、表达式中使用"括号"可强行改变优先级的运算顺序
-- 扩展:在对数值类型的列做运算的时候，如果做运算的列的值为null的时，运算结果都为null，
-- 为了解决这个问题可以使用ifnull函数,使用方法  ifnull(字段,0)
```

 ```
-- 需求:查询所有商品的id，名称和折扣价(折扣价=卖价*折扣) 
``` 



```

	SELECT id,productName,salePrice*cutoff  折扣价 FROM product;
```
```
-- 需求:查询所有商品的id，名称，和各进50个的成本价(成本=costPirce)
```


```
SELECT id,productName 产品名, 50*costPrice 各进50个的成本价 FROM product;
```
```
-- 需求:查询所有商品的id，名称，成本价，各进50个每个加1元运费的成本 ```


```
		SELECT id,productName 产品名, 50*(costPrice+1) 各进50个的成本价 FROM product;
```
```
-- =========================================================================================  ```

```
-- ●设置列的别名
-- 作用:
-- 1、改变列的标题头；
-- 2、用于表示计算结果的含义；
-- 3、作为列的别名；
-- 注意:如果别名中使用特殊字符，或者是强制大小写敏感，或有空格时，都需加引号；
 
-- 需求:查询所有商品的id，名称，成本价，各进50个每个加1元运费的成本(使用别名)

-- AS可以省略:


-- ●过滤查询:使用WHERE子句限定返回的记录(进行条件筛选/过滤)：
-- 语法：
-- SELECT 列名 FROM  表名  WHERE  条件;
-- 注意：
-- WHERE子句在 FROM 子句后
-- 字符串和日期要用引号扩起来.
```
```
-- =========================================================================================

```

```
-- ●过滤查询:使用WHERE子句限定返回的记录(进行条件筛选/过滤)：
-- 语法：
-- SELECT 列名 FROM  表名  WHERE  条件;
-- 注意：
-- WHERE子句在 FROM 子句后
-- 字符串和日期要用引号扩起来.
 
-- =========================================================================================
 
-- ●比较运算符
-- 运算符            含义
-- -------------------------------------------------
-- =                 等于
-- >                 大于
-- >=                大于或等于
-- <                 小于
-- <=                小于或等于
-- !=  或<>          不等于
-- ---------------------------------------------------

```
-- 需求: 查询商品零售价为119的所有商品信息.

```
```
SELECT * FROM product WHERE salePrice = 119;
```
 ```
-- 需求: 查询商品名为罗技G9X的所有商品信息. ``` 
```
```
SELECT * FROM product WHERE productName = '罗技G9X'; 
```
 ```
-- 需求: 查询商品名 不为 罗技G9X的所有商品信息.
```
```
SELECT * FROM product WHERE productName != '罗技G9X';
SELECT * FROM product WHERE NOT productName = '罗技G9X';
```
 ```
-- 需求: 查询分类编号不等于2的商品信息
```
```

SELECT * FROM product WHERE dir_id != 2;
```
 ```
-- 需求: 查询商品名称,零售价小于等于200的商品
```
```
SELECT productName FROM product WHERE salePrice <= 200;
```
```
 
-- 需求: 查询id，商品名称，批发价大于350的商品
```
```

SELECT id,productName FROM product WHERE costPrice> 350;
```
 ```
-- 思考：使用WHERE后面使用别名行不行? 总结SELECT和WHERE的执行顺序
	不能作用,因为WHERE先于SELECT 执行
 
-- 上面的是错误的,因为WHERE在SELECT之前执行,不知道SELECT中起的别名是啥
 
 
-- 结论:SQL中不同子句执行先后顺序:
-- 1):首先执行FROM子句. 明确从哪一张表中做查询.
-- 2):其次执行WHERE子句. 筛选符合条件的数据.
-- 3):接着执行SELECT子句. 选择出要显示哪些列的数据.
 
-- ---------------------------------------------------
-- 扩展:要让MySQL查询区分大小写，可以使用BINARY：
```
```
 
-- =========================================================================================
```
```
-- ●逻辑运算符
-- 运算符             含义
-- ----------------------------------------
-- AND(&&)          如果组合的条件都是TRUE,返回TRUE
-- OR(||)         如果组合的条件之一是TRUE,返回TRUE
-- NOT(!)         如果后面的条件是FALSE,返回TRUE.
```
```
 
-- 需求: 查询商品信息，批发价在300-400之间的货品
```
```
	SELECT * FROM product WHERE costPrice >= 300 and costPrice <=400;
 ```
 ```
-- 需求: 查询商品信息，分类编号为2,4的所有货品
```
```
 SELECT * FROM product WHERE dir_id IN (2,4);
 SELECT * FROM product WHERE dir_id =2 OR dir_id = 4;
 ```
 ```
--
需求: 查询商品信息，分类编号不为2的所有商品
```
```
	SELECT * FROM product WHERE dir_id != 2;
	SELECT * FROM product WHERE NOT dir_id = 2;
 ```
 ```
-- 需求: 查询商品信息，零售价大于等于250或者是成本大于等于200
```
```
	SELECT * FROM product WHERE salePrice > 250 OR costPrice >=200;
 ```
 ```
-- =========================================================================================
```
```
-- ●优先级规则
-- 优先级         运算符
-- ------------------------------------
-- 1              所有比较运算符
-- 2              NOT
-- 3              AND
-- 4              OR
-- 不用记,因为用()可以改变运算顺序
```
```
-- 分析SQL：
```
```
SELECT * FROM product WHERE (NOT productName LIKE '%M%'  AND salePrice > 100) OR (dir_id = 2)
```
 ```
-- =========================================================================================
```
#### ==-- ●范围查询-BETWEEN AND==
```
 

-- 使用BETWEEN运算符查询某一值域范围的记录，常使用在数字类型数据的范围上，但对于字符类型数据和日期类型数据同样可用。
-- 格式：
-- WHERE 列名 BETWEEN minvalue AND maxvalue：闭区间。
```
```
 
-- 需求: 查询商品信息，批发价在300-400之间的商品
```
```
SELECT * FROM product WHERE costPrice BETWEEN 300 AND 400;
SELECT * FROM product WHERE costPrice <=400 AND costPrice >=300;
```
```
 
-- 需求: 查询商品信息，批发价不在300-400之间的商品
```

```
SELECT * FROM product WHERE NOT costPrice BETWEEN 300 AND 400;
 ```
 ```
-- =========================================================================================
```



#### ==-- ●集合查询==
```

-- 使用IN运算符，判断列的值是否在指定的集合中。
-- 格式： WHERE 列名 IN (值1，值2....);
```
```
 
-- 需求:查询商品信息，分类编号为2,4的所有货品
```
```

	SELECT * FROM product WHERE dir_id IN (2,4);
```
 ```
-- 需求:查询商品信息，分类编号不为2,4的所有货品
```
```
	SELECT * FROM product WHERE NOT dir_id IN(2,4);
	SELECT * FROM product WHERE dir_id NOT IN(2,4);
```
```	

-- =========================================================================================
```
 
#### ==-- ●空值查询==
```
-- IS NULL:判断列的值是否为空。
```
```
--先增加一个Null值的数据
```
```
INSERT INTO `product` (`productName`) VALUES (NULL);
```
```
-- 格式：WHERE  列名 IS NULL;
```
```
-- 需求:查询商品名为NULL的所有商品信息。
```
```

	SELECT * FROM product WHERE productName IS NULL;
```
 ```
-- =========================================================================================
```
 
####  ==-- ●模糊查询==
```
-- 使用LIKE运算符执行通配查询，查询条件可包含文字字符或数字：
-- %:通配符：表示零或多个字符,即匹配任意字符。
-- _:通配符：表示一个字符。
-- 通配符：用来实现匹配部分值得特殊字符。
-- 注意:模糊查询不是搜索引擎. 后面我们会学习Lucene来解决搜索问题 
-- -----------------------------------------------------
```
```
-- 需求: 查询商品信息，商品名称匹配以罗技M9开头的 '罗技M9%' ```
```
```
SELECT * FROM product WHERE productName LIKE '罗技M9%'; ```
```
 
-- 需求: 查询商品信息，商品名称包含火星的  '%火星%' ```
```

 SELECT * FROM product WHERE productName LIKE '%火星%'; ```
 ```

-- 需求: 查询商品信息，商品名称包不含火星的  '%火星%'  (not LIKE) ```
```

  SELECT * FROM product WHERE productName not LIKE '%火星%'; ```
```
-- 需求: 查询商品信息 , 零售价大于等于80 并且商品名称以罗技开头 并且名称总长度为4个字符的 '罗技__' 

-- 一个下划线表示一个字符
```
```
	SELECT * FROM product  WHERE salePrice >= 80 AND productName LIKE '罗技--';
```






####  ==-- ●结果排序==
```
-- ●使用ORDER BY子句将记录排序
-- 格式：SELECT 列名  FROM 表名 WHERE 条件 ORDER BY 列名1 [ASC/DESC],列名2 [ASC/DESC]...;
-- ASC : 升序，缺省(默认)。
-- DESC: 降序。
-- ORDER BY 子句出现在SELECT语句的最后。
```

 
#### ==-- ●按单列排序==
```
-- 需求:查询商品信息,并且按零售价降序排序
```
```
	SELECT * FROM product ORDER BY salePrice DESC;
	```
 
####　==-- ●按多列排序==
```
-- 需求: 查询商品信息,先按分类编号排序,再按零售价排序
```
```
SELECT * FROM product ORDER BY dir_id desc, salePrice desc;
 ```
 
#### ==-- ●列的别名排序==
```
-- 需求:查询M系列并按照批发价排序(加上别名)
```
```
SELECT id,productName,costPrice 批发价 FROM product WHERE productName LIKE '%M%'  ORDER BY costPrice DESC;
```
 ```
-- 需求:查询分类为2并按照批发价排序(加上别名)
```
```

SELECT * FROM product WHERE dir_id = 2 ORDER BY costPrice DESC;
```
```
 
-- ●注意：不能对使用了引号的别名排序。
```
 
 
 ```
    -- ●SELECT语句执行顺序：
    -- 先执行FROM--->接着执行WHERE--->再执行SELECT--->最后执行ORDER BY
 
 ```







####　==-- ●分页查询==

```
-- 我们讲解MySQL特有的分页方式(LIMIT,在Oracle12C中也提供该语法了).
-- ------------------------------------------------
-- 语法:SELECT  * FROM 表名  [WHERE条件] LIMIT ?,?;
-- 第一个?:beginIndex  表示开始索引,即从哪里开始查(最小索引为0):
-- 第二个?:pageSize    表示每页显示多少条数据
-- ---------------------------------
```
```
-- 如果每页最多3条记录: pageSize = 3,那么
-- 第一页:  SELECT * FROM `product` LIMIT 0, 3
-- 第二页:  SELECT * FROM `product` LIMIT 3, 3
-- 第三页:  SELECT * FROM `product` LIMIT 6, 3
-- 第四页:  SELECT * FROM `product` LIMIT 9, 3
-- 第N页:   SELECT * FROM `product` LIMIT ?, ?
-- ---------------------------------------------------------------
```
```
-- 通过以上分析我们得出规律:
-- beginIndex = (currentPage当前页数 - 1) * pageSize    //第一个问号的值=(页码-1)*第二个问号(每页显示记录数)
-- 那么我们的分页语句公式为:
```
```
-- SELECT * FROM 表名  LIMIT  (currentPage - 1) * pageSize , pageSize;
```
 ```
-- 需求:每页显示5条，查询第3页
```
```

SELECT * FROM product limit 10,5;
```
 
 
 ```
-- =========================================================================================
```
```
-- 思考:带有排序操作的分页查询,是先排序还是先分页?
			# 先排序再分页
 
-- 答案:先排序,再分页.(记住结论limit关键字写在sql语句最后)
--   示例:按照零售价升序排列,设置每页显示5条数据.
 
-- =========================================================================================
```

#### ==-- 总结sql语句执行顺序==
```
-- FROM
-- WHERE
-- SELECT
-- ORDER BY
-- LIMIT
```





#### ==统计函数(聚集函数/聚合函数)==
-- 作用于一组数据，并对一组数据返回一个值。
-- -------------------------------------------------------
-- COUNT:  统计指定列的记录行数,列值为NULL的行不计入；
-- SUM:   统计指定列的数值和，如果指定列类型不是数值类型，那么计算结果为0；
-- MAX:   统计指定列的最大值，如果指定列是字符串类型，那么使用字符串排序运算；
-- MIN:   统计指定列的最小值，如果指定列是字符串类型，那么使用字符串排序运算；
-- AVG:   统计指定列的平均值，如果指定列类型不是数值类型，那么计算结果为0；
 
#### ==-- ●统计总数==
-- 需求:查询商品总记录数(注意在Java中必须使用long接收)
```
SELECT count(*) FROM product;
```
 
#### ==-- ●求和==
-- 需求:查询所有商品零售总价
```
SELECT SUM(salePrice) FROM product;
```
 
#### ==-- ●最值==
-- 需求:查询商品的最小零售价，最高零售价
```
SELECT MIN(salePrice) 最小零售价,MAX(salePrice) 最高零售价 FROM product;
 ```
#### 　==-- ●求平均数==
-- 需求:查询所有商品平均零售价(加了distinct去重)
```
SELECT AVG(DISTINCT salePrice) FROM product;
```
 
 
 
#### 　==-- ●到这里分页查询的原理我们就学会了==
1.使用count查询总记录数(用于计算总页数)
2.使用limit查询结果集


