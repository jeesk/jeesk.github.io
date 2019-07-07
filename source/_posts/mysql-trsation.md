---
layout:	post
title: Mysql4种事务隔离级别案例详解
subtitle:   "不适合人类阅读，非常水的自我笔记"
copyright: true
date: 2019-04-09 20:00:28
author: "jeesk"
tags:
	- database
---

隔离级别

> ​	 ✔   可能出现 		✘	不会出现

|                 | 脏读 | 不可重复读 | 幻读 |
| :-------------: | ---- | :--------: | ---- |
| READ UNCOMMITED | ✔    |     ✔      | ✔    |
| READ COMMITTED  | ✔    |     ✘      | ✘    |
| REPETABLE READ  | ✘    |     ✘      | ✔    |
|  SERIALIZABLE   | ✘    |     ✘      | ✘    |

首先创建创建一张表：

```
CREATE TABLE PERSON (
    id INT PRIMARY KEY,
    name VARCHAR(100)
) Engine=InnoDB CHARSET=utf8;
```

​	插入一条数据：

`INSERT INTO PERSON(id,name) value(1,'小明');`

##	READ UNCOMMITED  

顾名思义， 读未提交。

案例1:	

A 用户执行：

```
在DataGrip开启两个数据库连接(窗口)
A 用户执行
SET TRANSACTION  ISOLATION LEVEL READ UNCOMMITTED;
start transaction;
UPDATE PERSON SET NAME = '大黄' WHERE ID = 1;

```

B 用户执行：

```

SELECT * FROM WHERE ID = 1;

+----+-------+
| id | name  |
+----+-------+
|  1 | HELLO |
+----+-------+
1 row in set (0.00 sec)
```

这个时候 B用户 看到的数据， 竟然是 A   连接  `没有提交的事务`  的数据， 这就叫做 READ UNCOMMITED， 同时读出来的数据还可能产生脏数据。 A 用户执行的时候，设置了事务级别，同时这也时Mysql的默认隔离级别。

这种隔离级别是非常不安全的， 尽量避免使用这种隔离级别。

##	READ COMMITTED

案例2：

A 用户

```mysql
SET TRANSACTION  ISOLATION LEVEL READ COMMITTED ;
start transaction;
UPDATE PERSON SET NAME = '小猫猫' WHERE ID = 1;
```

B 用户

```mysql
mysql> select * from PERSON where id = 1;
+----+--------+
| id | name   |
+----+--------+
|  1 | 大黄   |
+----+--------+
1 row in set (0.00 sec)
```

当前事务隔离级别下面，已经不能独到，另外一个事务没有提交的数据了。

A 用户提交事务后，B 用户继续查询。

```
COMMIT;
```

B 用户 查询

```
mysql> select * from PERSON where id = 1;
+----+-----------+
| id | name      |
+----+-----------+
|  1 | 小猫猫    |
+----+-----------+
1 row in set (0.00 sec)
```

B 用户可以查询到最新别人提交的数据了，这种事务级别就叫  READ COMMITTED

 ##	REPETABLE READ

案例3：

B 用户  开启一个事务后，一直读取 ID = 1 的数据。

```
SET TRANSACTION  ISOLATION LEVEL REPEATABLE READ ;
start transaction;
SELECT * FROM PERSON WHERE ID = 1;
```

A 用户  修改 ID = 1 的这一条数据

```
SET TRANSACTION  ISOLATION LEVEL REPEATABLE READ ;
start transaction;
UPDATE PERSON SET NAME = '小猫猫我爱你' WHERE ID = 1;
## show create table EMPLOYEE;
COMMIT ;
```

B 用户继续查询  ID = 1 的这一条数据,但是不提交数据。

```
SELECT * FROM PERSON WHERE ID = 1;

mysql> select * from PERSON where id = 1;
+----+-----------+
| id | name      |
+----+-----------+
|  1 | 小猫猫    |
+----+-----------+
1 row in set (0.00 sec)
```

你会发现， 在当前事务,  及时另外一个事务修改了数据已经提交事务，但是读到的数据产生了幻觉。 这就叫可以重复读。也叫幻读。

##	SERIALIZABLE

**串行化**， 以上3种隔离级别都允许对同一条记录进行`读-读`、`读-写`、`写-读`的并发操作，如果我们不允许`读-写`、`写-读`的并发操作，可以使用`SERIALIZABLE`隔离级别，示意图如下：

A 用户

```
SET TRANSACTION  ISOLATION LEVEL SERIALIZABLE ;
start transaction;
UPDATE PERSON SET NAME = '我爱你祖国' WHERE ID = 1;
```



B 用户

```
SET TRANSACTION  ISOLATION LEVEL SERIALIZABLE ;
start transaction;
UPDATE PERSON SET NAME = '我爱你祖国' WHERE ID = 1;
```

B 用户执行查询语句， 发现已经被阻塞了。



A 用户 提交事务

```
COMMIT;
```

B 用户 立刻获得数据

```
mysql> select * from PERSON where id = 1;
+----+-----------+
| id | name      |
+----+-----------+
|  1 | 我爱你祖国    |
+----+-----------+
1 row in set (0.00 sec)
```

当`用户 A中的事务更新了`id`为`1`的记录后，之后`用户 B`中的事务再去访问这条记录时就被卡住了，直到`用户 A`中的事务提交之后`，`用户 B`中的事务才可以获取到查询结果。 发现，这 `SERIALIZABLE` 这种事务模式下面的效率非常低， 因为当某条数据被事务占用的时候， 另外的连接无法修改，并且连查询也不能。



> ​	今天的讲解就到这儿， 你明白了数据库的隔离级别了吗？ 