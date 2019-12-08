---
layout:	post
title: Redis 简单入门教程
subtitle:   "原创"
copyright: true
date: 2019-08-12 20:00:28
author: 	"jeesk"
tags:
	- redis
---

####	什么是Redis

Redis是一个开源（BSD许可），内存数据结构存储，用作数据库，缓存和消息代理。它支持数据结构，如字符串，散列，列表，集合，带有范围查询的排序集，位图，超级日志，具有半径查询和流的地理空间索引。Redis具有内置复制，Lua脚本，LRU驱逐，事务和不同级别的磁盘持久性，并通过Redis Sentinel提供高可用性并使用Redis Cluster自动分区。



####	安装Redis

1. **Window**

   1. **下载地址：**https://github.com/MSOpenTech/redis/releases。

   Redis 支持 32 位和 64 位。这个需要根据你系统平台的实际情况选择，这里我们下载 **Redis-x64-xxx.zip**压缩包到 C 盘，解压后，将文件夹重新命名为 **redis**。

   2. 解压后, 在目录下面执行

   `redis-server.exe redis.windows.conf`

2. **Linux** 

   ​	1.	**下载地址：**http://redis.io/download，下载最新稳定版本。

   本教程使用的最新文档版本为 2.8.17，下载并安装：

   ```
   $ wget http://download.redis.io/releases/redis-5.0.5.tar.gz
   $ tar xzf redis-5.0.5.tar.gz
   $ cd redis-5.0.5
   $ make
   ```

    2. make完后 redis-2.8.17目录下会出现编译后的redis服务程序redis-server,还有用于测试的客户端程序redis-cli,两个程序位于安装目录 src 目录下：

       下面启动redis服务.

       ```
       $ cd src
       $ ./redis-server
       ```

       注意这种方式启动redis 使用的是默认配置。也可以通过启动参数告诉redis使用指定配置文件使用下面命令启动。

       ```
       $ cd src
       $ ./redis-server ../redis.conf
       ```

       **redis.conf** 是一个默认的配置文件。我们可以根据需要使用自己的配置文件。

       启动redis服务进程后，就可以使用测试客户端程序redis-cli和redis服务交互了。 比如：

####	redis 常用命令

> 在redis 的目录下面执行 ./redis-cli  打开redis 的客户端

```
DUMP key 序列化该key , 并返回序列化的值
EXISTS key 检查给定的key 是否存在
EXPIRE key second  设置过期时间
EXPIREAT key time  设置key 在什么时间过期 (不同在于 EXPIREAT 命令接受的时间参数是 UNIX 时间戳(unix timestamp)。)

KEYS pattern   获得所有符合给定模式的key
PPTL key 返回 key剩余的过期时间
TYPE key 
```



> ​	Redis支持五种数据类型：string（字符串），hash（哈希），list（列表），set（集合）及zset(sorted set：有序集合)。

####	string 类型常用命令

```shell
SET key 设置指定 key 的值
GET key 获取指定 key 的值
127.0.0.1:6379> set hello 12345
OK
127.0.0.1:6379> get hello
"12345"

GETRANGE key start end  获得某个key 指定的范围的值
127.0.0.1:6379> getrange hello 0 1
"1"
127.0.0.1:6379> 


GETSET key value 给给定的key 设置value, 并且返回key 的旧值.
127.0.0.1:6379> getset hello world
"1"
127.0.0.1:6379> 


SETNX key value 如果key 不存在, 那么设置值. 设置成功返回1, 设置失败返回0.
127.0.0.1:6379> set key1 foo
OK
127.0.0.1:6379> mget hello key1
1) "world"
2) "foo"
127.0.0.1:6379> setnx key1 boo
(integer) 0
127.0.0.1:6379> get key1
"foo"
127.0.0.1:6379> 

STRLEN key  获得制定key 存储的字符串长度
127.0.0.1:6379> strlen key1
(integer) 3
127.0.0.1:6379> 



MSET key value [key value]  同时设置多个键值对
MGET key1 key2 获得多个给定key 的值
127.0.0.1:6379> mset key1 val1 key2 val2
OK
127.0.0.1:6379> mget key1 key2
1) "val1"
2) "val2"
127.0.0.1:6379> 


INCR  key 给定key的存储的数字自增1
DECR key   将 key 中储存的数字值减去1
127.0.0.1:6379> set key1 100
OK
127.0.0.1:6379> incr key1
(integer) 101
127.0.0.1:6379> get key1
"101"
127.0.0.1:6379> DECR key1
(integer) 100
127.0.0.1:6379> get key1
"100"
127.0.0.1:6379> 


INCRBY key increment 将key 所存储的数字加上给定的增量
DECRBY key decrement key 所储存的值减去给定的减量值（decrement)
127.0.0.1:6379> INCRBY key1 6
(integer) 106
127.0.0.1:6379> DECRBY key1 100
(integer) 6
127.0.0.1:6379> get key1
"6"
127.0.0.1:6379> 


APPEND key value  如果key 已经存在, 将会追加到指定的value 到该key存储的value 的末尾
127.0.0.1:6379> set key1 helloworld
OK
127.0.0.1:6379> APPEND key1 iloveu
(integer) 16
127.0.0.1:6379> get key1
"helloworldiloveu"
127.0.0.1:6379> 
```

####	Hash 的常用命令(类似于Java 中的 Map 数据类型)

```
HSET key filed 设置指定字段的值
HGET key filed 获得制定字段的值
127.0.0.1:6379> hset map1 name xiaoming
(integer) 1
127.0.0.1:6379> hget map1 name
"xiaoming"
127.0.0.1:6379> 

HMSET key filed [key filed] 设置 一个键值对和设置多个键值对
HMGET key filed [filed] 获得指定key 下面的多个字段的值
127.0.0.1:6379> hmset map2 name xiaoming age 12
OK
127.0.0.1:6379> hmget map2 name age
1) "xiaoming"
2) "12"
127.0.0.1:6379> 

HGETALL key 获得hash表中制定key 的所有字段和值
HKEYS Key 获得哈希表中的所有的字段
HVALS key 获得哈希表中所有的值
127.0.0.1:6379> hgetall map2
1) "name"
2) "xiaoming"
3) "age"
4) "12"
127.0.0.1:6379> hkeys map2
1) "name"
2) "age"
127.0.0.1:6379> hvals map2
1) "xiaoming"
2) "12"
127.0.0.1:6379> 


HEXISTS key filed 判断给定的key 是否存在给定的字段
HDEL key field1 [field2] 删除 给定 key 下面的字段( 如果是删除key 请使用del)
127.0.0.1:6379> HEXISTS map2 name
(integer) 1
127.0.0.1:6379> HDEL map2 name
(integer) 1
127.0.0.1:6379> HEXISTS map2 name
(integer) 0
127.0.0.1:6379> 
```

####	Redis 列表(List)

```
LPUSH key value [value2] 将一个值或者是多个值插入到列表头部
LINDEX key index  通过索引读取列表中的元素
LLEN 获取列表长度
127.0.0.1:6379> lpush list1 hello
(integer) 1
127.0.0.1:6379> LINDEX list1 0
"hello"
127.0.0.1:6379> llen list1
(integer) 1
127.0.0.1:6379> 


LPOP 移除并且获得列表中的第一个元素
LRANGE key start stop 获得制定范围内的元素
LREM 移除列表元素
127.0.0.1:6379> LRANGE lis1 0 -1
(empty list or set)
127.0.0.1:6379> LRANGE lis1 0 6
(empty list or set)
127.0.0.1:6379> LRANGE lis1 0 3
(empty list or set)
127.0.0.1:6379> LRANGE list 0 -1
(empty list or set)
127.0.0.1:6379> LRANGE list1 0 -1
1) "world"
2) "hello"
127.0.0.1:6379> LREM list1
127.0.0.1:6379> LREM list1 1 hello
(integer) 1
127.0.0.1:6379> 

RPOP 移除列表中最后一个元素
RPUSH key value1 [value2] 列表尾部添加一个 或者是多个值
127.0.0.1:6379> RPOP list1
"world"
127.0.0.1:6379> rpush list1 world3
(integer) 1
127.0.0.1:6379> rpop list1
"world3"
127.0.0.1:6379> 
```

####	Redis 集合(Set)

```
SADD key member1 [member2] 向集合增加一个或者多个成员
SCARD key 获取集合的成员数
SDIFF key1 key2 返回给定集合的差集
SINTER key1 key2 返回给定集合的交集
127.0.0.1:6379> sadd teams m1 m2 m3
(integer) 3
127.0.0.1:6379> scard teams
(integer) 3
127.0.0.1:6379> sadd teams m3 m4
(integer) 1
127.0.0.1:6379> sadd teams1 m4 m5
(integer) 2
127.0.0.1:6379> sdiff teams1 teams
1) "m5"
127.0.0.1:6379> sinter teams teams1
1) "m4"
127.0.0.1:6379> 

SMEMBERS key 返回继承中的所有成员
SISMMBER key member 判断 member 判断是否是集合key 的成员
SREM key member [ member1] 移除 给定集合中的成员
127.0.0.1:6379> SISMEMBER teams1 m5
(integer) 1
127.0.0.1:6379> SISMEMBER teams1 m5
(integer) 1
127.0.0.1:6379> srem teams1 m5
(integer) 1
127.0.0.1:6379> SISMEMBER teams1 m5
(integer) 0
127.0.0.1:6379> 

```

####	Redis 有序集合(sorted set)

Redis 有序集合和集合一样也是string类型元素的集合,且不允许重复的成员。

不同的是每个元素都会关联一个double类型的分数。redis正是通过分数来为集合中的成员进行从小到大的排序。

有序集合的成员是唯一的,但分数(score)却可以重复。

```
ZADD key score member1 [score2 member2] 向有序集合中添加一个或者是多个成员, 或者更新已经存在成员的分数
ZCARD key  获得有序集合的成员数量
ZCOUNT key min max 获得有序集合 制定区间分数的成员数量
ZRANGE key start stop [WITHSCORES]  通过索引区间返回有序集合中制定区间的成员
ZSCORE key member 返回有序集合中成员的分数值

127.0.0.1:6379> ZADD foo 1 p1 2 p2 0.5 p3
(integer) 3
127.0.0.1:6379> ZCARD foo
(integer) 3
127.0.0.1:6379> ZCOUNT foo 1 2
(integer) 2
127.0.0.1:6379> ZRANGE foo 1 2 
1) "p1"
2) "p2"
127.0.0.1:6379> zscore foo p1
"1"
127.0.0.1:6379> zscore foo p3
"0.5"
127.0.0.1:6379> 

```

####	Redis HyperLogLog

Redis HyperLogLog 是用来做基数统计的算法，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定 的、并且是很小的。 一般用来记录数量

```
PFADD key ele1 ele2 添加指定元素到 hyperloglog 中去
PFCOUNT key [key1] 返回给定Hyperloglog 的技术估量值
PFMERGE destkey sourcekey [sourcekey] 多个 hyperloglog 合并为一个Hyperloglog
127.0.0.1:6379> PFADD key1 1 2 34 4 5 6 7 78
(integer) 1
127.0.0.1:6379> PFCOUNT key1
(integer) 8
127.0.0.1:6379> pfadd key2 12 234 5 5 4 4
(integer) 1
127.0.0.1:6379> PFMERGE key3 key1 key2
OK
127.0.0.1:6379> PFCOUNT key3
(integer) 10
127.0.0.1:6379> 

```

####	Redis GEO

```
GEOADD KEY 经度 维度 mem [经度 维度 mem]  給指定key 增加成员的经度和维度
GEODIST key mem1 mem2 获得指定key 的两个成员的距离

127.0.0.1:6379> GEOADD china 12 25 xiaoming
(integer) 1
127.0.0.1:6379> GEOADD china 89 78 daxiaoming
(integer) 1
127.0.0.1:6379> GEODIST china xiaoming daxiaoming
"6994515.5814"
127.0.0.1:6379> 
GEOHAHS key mem1 mem2  获得给定key 成员的字符串hash (表明一个矩阵位置. 有足于保证隐私)

127.0.0.1:6379> GEOHASH china xiaoming daxiaoming
1) "sk2w1p45s30"
2) "vvz79pryfm0"

GEOPOS key mem1 [mem1] 获得给定key 的成员的位置

127.0.0.1:6379> GEOPOS china xiaoming daxiaoming
1) 1) "12.00000196695327759"
   2) "24.99999915218035795"
2) 1) "89.00000005960464478"
   2) "77.99999963605176845"
127.0.0.1:6379> 

GEORADIUS key 经度 维度 半径距离 withdist  返回给定经度维度 半径距离的成员

127.0.0.1:6379> GEOADD Sicily 13.361389 38.115556 "Palermo" 15.087269 37.502669 "Catania"
(integer) 2
127.0.0.1:6379> GEORADIUS Sicily 15 37 200 km WITHDIST
1) 1) "Palermo"
   2) "190.4424"
2) 1) "Catania"
   2) "56.4413"

```

####	Redis 的stream

可以简单的理解为一个消息队列, 这个消息队列中 存储的是键值对.  并且每个 key . 都有一个唯一的id. * 标识自动生成.

```
XADD KEY * filed1 value1 [filed2 value2]  
XLEN key 获得制定key 的成员个数

127.0.0.1:6379> XADD mystream * name Sara surname OConnor
"1565103145158-0"
127.0.0.1:6379> XADD mystream * field1 value1 field2 value2 field3 value3
"1565103165475-0"
127.0.0.1:6379> xlen mystream
(integer) 2
127.0.0.1:6379> xrange mystream - +
1) 1) "1565103145158-0"
   2) 1) "name"
      2) "Sara"
      3) "surname"
      4) "OConnor"
2) 1) "1565103165475-0"
   2) 1) "field1"
      2) "value1"
      3) "field2"
      4) "value2"
      5) "field3"
      6) "value3"
127.0.0.1:6379> 

XRANGE key -+
XRERANGE key -+ 
上面的两个key 相反, 虽然都是范围查询的命令. 一个是正序一个是倒序列.

XREAD
127.0.0.1:6379> XREAD BLOCK 1000 STREAMS mystream $
(nil)
(1.04s)
127.0.0.1:6379> XREAD BLOCK 0 STREAMS mystream $


XGROUP 创建和管理消费组
XREADGROUP 消费消费组 从Stream里面读取消息
XACK 确认消息已经消费

127.0.0.1:6379> XADD mystream * hello world
"1545812637199-0"
127.0.0.1:6379> XGROUP CREATE mystream mygroup $
OK
127.0.0.1:6379> XREADGROUP GROUP mygroup GodCOnsumer STREAMS mystream >
(nil)
127.0.0.1:6379> XADD mystream * Michale "I'm Michale"
"1545812666393-0"
127.0.0.1:6379> XREADGROUP GROUP mygroup GodCOnsumer STREAMS mystream >
1) 1) "mystream"
   2) 1) 1) "1545812666393-0"
         2) 1) "Michale"
            2) "I'm Michale"
127.0.0.1:6379> XREADGROUP GROUP mygroup GodCOnsumer STREAMS mystream >
(nil)
127.0.0.1:6379> XREADGROUP GROUP mygroup Michale STREAMS mystream >
(nil)
127.0.0.1:6379> XADD mystream * Michale "I'm Michale"
"1545812693203-0"
127.0.0.1:6379> XREADGROUP GROUP mygroup Michale STREAMS mystream >
1) 1) "mystream"
   2) 1) 1) "1545812693203-0"
         2) 1) "Michale"
            2) "I'm Michale"
127.0.0.1:6379> XREADGROUP GROUP mygroup GodCOnsumer STREAMS mystream >
(nil)
127.0.0.1:6379> XREADGROUP GROUP mygroup GodCOnsumer STREAMS mystream 0
1) 1) "mystream"
   2) 1) 1) "1545812666393-0"
         2) 1) "Michale"
            2) "I'm Michale"
```





####	Redis 事务

Redis 事务可以一次执行多个命令， 并且带有以下三个重要的保证：

- 批量操作在发送 EXEC 命令前被放入队列缓存。
- 收到 EXEC 命令后进入事务执行，事务中任意命令执行失败，其余的命令依然被执行。
- 在事务执行过程，其他客户端提交的命令请求不会插入到事务执行命令序列中。

一个事务从开始到执行会经历以下三个阶段：

- 开始事务。
- 命令入队。
- 执行事务。

```
MULTI 标记一个事务块内的命令
EXEC 执行 所有事务块内的命令
DISCARD 放弃事务块的所有的命令
WATCH key [key1]监视一个 key 或者多个key. 如果是在事务执行之前, key 被其他命令所改动,那么事务将会被打断.
UNWATCH 取消WATCH 命令对所有key 的监视
```

####	Redis 数据备份与恢复

```
BGSAVE 异步备份
SAVE 备份到磁盘
该命令将在 redis 安装目录中创建dump.rdb文件。
```

只需要将dump.rdb 文件移动到安装目录启动服务即可. 会自动恢复数据.