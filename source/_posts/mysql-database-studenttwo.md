
---
title: Mysql 数据库入门第三章
copyright: true
date: 2018-05-23 01:00:28
categories: 数据库
tags:
---



#### Mysql的多表查询简介

> Tips: 本章使用的s数据库文件

●单表查询和多表查询
单表查询:从一张表中查询数据
多表查询:从多张表中联合查询出数据
 <!-- more -->
●为什么要有多张表?
Java中：一个类中描述一类事物的特征，不同的事物使用不同的类型(类)来表示.
数据库中：一张表中存储一类事物的数据,不同事物使用不同的表存储.
 
●为什么需要多表查询?
因为有的时候不同类别的数据存在于不同的表中，我们通过一张表不能查询出我们想要的完整的数据，那么就需要联合查询多张表以获得我们想要的数据
 
●语法单表查询:
SELECT 列名1,列名2,列名3...FROM  表名
------------------------------------
> 多表查询(最简单的): -- 会有笛卡尔积
SELECT 列名1,列名2,列名3... FROM  表名A , 表名B    -- 会有笛卡尔积

##### 需求:查询商品名称及其对应的分类名称
```
select productName,dirName from product,productdir;
 
```
思考为什么产生了88条数据:

##### 笛卡尔积		

●什么是笛卡尔积
假设集合A={a,b}，集合B={0,1,2}，则两个集合的笛卡尔积为{(a,0),(a,1),(a,2),(b,0),(b,1),(b,2)}。
笛卡尔积的现实意义:如果A表示学生的集合，B表示所有课程的集合，则A与B的笛卡尔积表示所有可能出现的选课情况。
A(张三,李四)
B(Java,PHP,C++)
AXB(张三,Java), (张三,PHP), (张三,C++), (李四,Java), (李四,PHP), (李四,C++),

●如何避免笛卡尔积
但是在进行多表查询时,没有连接条件的表关系返回的笛卡尔积大多数时候是无意义的。我们在开发中，应避免使用笛卡尔积，如何避免？
解决方案: 在WHERE加入有效的连接条件---->等值连接
注意:连接 n张表,至少需要 n-1个连接条件。
多表查询(最简单的): 
SELECT 列名1,列名2,列名3... FROM  表名A , 表名B  where 条件  -- 使用where条件去除笛卡尔积
 
-- 再次完成需求:查询商品名称及其对应的分类名称
```
select productName,dirName from product,productDir where product.dir_id = productDir.id;
```
出现了88条数据

#### 外键约束
● 什么是外籍约束
主键约束(PRIMARY KEY): 约束在当前表中,指定列的值非空且唯一(主键列).
外键约束(FOREIGN KEY): A表中的外键列的值必须来源于于B表中的主键列.(理解)
 
● 注意:在MySQL中,InnoDB支持事务和外键.
 
● 如何修改表的存储引擎
1) 使用命令: ALTER TABLE 表名 ENGINE='InnoDB';
2) 使用图形化界面:

● 给表设置外键(先修改两张表的存储引擎为InnoDB)
（在实际开发中如果对效率要求比较高，那么一般不会给表加外键约束）

● tips:在开发中，外键列起名字一般是所引用表名_引用列名：productdir_id，有时候也运行简写： dir_id

● 增加外键  增加外键之前要确定是否满足约束条件,否则不能关联
``` 
ALTER TABLE `product` ADD CONSTRAINT `productdir_id` FOREIGN KEY (`dir_id`) REFERENCES `productdir` (`id`);

```

●  删除外键
```
ALTER TABLE `product` DROP FOREIGN KEY `productdir_id`;
```

##### 隐式内连接


-- 内连接查询
-- 内连接：分为隐式内连接和显示内连接(高级部分讲)，它们的查询效果相同。有内连接肯定有外连接(高级部分讲)。
 
-- -----------------------------------------------
-- ●隐式内连接：
-- SELECT列名1,列名2... FROM 表A ,表B  WHERE 表A.列名 = 表B.列名
 
 
-- 需求: 查询商品的商品id,商品名称和分类名称:
 
 
-- 需求: 查询零售价大于200的无线鼠标(使用表的别名)
 
 
-- 需求: 查询每个货品对应的分类以及对应的库存(三张表)
 
 
-- 需求: 如果库存货品都销售完成,按照利润从高到低查询货品名称,零售价,货品分类（三张表）. 销售完成利润 : (售价-成本价)*库存
 
 
 
-- ---------------------------------------------------------------------
 
-- 总结:
-- 可以使用表名前缀区分多个表中的相同列。
-- 可以使用别名可以简化查询。
-- 如果使用了表的别名，则不能再使用表的真名
-- 使用表名前缀可以提高执行效率。


##### 答案在下面,请粘贴到sql客户端工具执行
```
-- 内连接查询
-- 内连接：分为隐式内连接和显示内连接(高级部分讲)，它们的查询效果相同。有内连接肯定有外连接(高级部分讲)。
 
-- -----------------------------------------------
-- ●隐式内连接：
-- SELECT列名1,列名2... FROM 表A ,表B  WHERE 表A.列名 = 表B.列名
 
 
-- 需求: 查询商品的商品id,商品名称和分类名称:

	select p.id,p.productName,pd.dirName from product p,productdir pd where p.dir_id = pd.id;
 
 
-- 需求: 查询零售价大于200的无线鼠标(使用表的别名)
 select * from product,productdir where product.dir_id = productdir.id and product.salePrice > 200 and dirName='无线鼠标';
#使用内连接查询
select productName,dir_id,product.id from product JOIN productdir ON product.dir_id = productdir.id AND dirName = '无线鼠标' AND product.salePrice > 200;
 
-- 需求: 查询每个货品对应的分类以及对应的库存(三张表)
	
select product.id,product.productName,productdir.dirName,productstock.storeNum from product,
productdir,productstock where product.dir_id = productdir.id 
AND product.id = productstock.id
 #使用内连接查询

select product.id,product.productName,productdir.dirName,productstock.storeNum from product JOIN 
productdir ON product.dir_id = productdir.id JOIN productstock ON productstock.id = product.id;

-- 需求: 如果库存货品都销售完成,按照利润从高到低查询货品名称,零售价,货品分类（三张表）. 销售完成利润 : (售价-成本价)*库存
 
SELECT	p.productName,p.salePrice,p.salePrice,(p.salePrice-costPrice) * ps.storeNum from product p,productdir pd,productstock ps where p.dir_id = pd.id and p.id = ps.id 
 
# 内连接查询

SELECT	p.productName,p.salePrice,p.salePrice,(p.salePrice-costPrice) * ps.storeNum  from product p JOIN productdir pd ON p.dir_id = pd.id JOIN productstock ps ON p.id= ps.id;



-- ---------------------------------------------------------------------
 
-- 总结:
-- 可以使用表名前缀区分多个表中的相同列。
-- 可以使用别名可以简化查询。
-- 如果使用了表的别名，则不能再使用表的真名
-- 使用表名前缀可以提高执行效率。

```
 



