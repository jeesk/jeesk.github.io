---
layout:	post
title: 使用shell 操作Redis数据库
subtitle:   "不适合人类阅读，非常水的自我笔记"
copyright: true
date: 2019-02-02 01:00:28
author: 	"jeesk"
tags:
	-Linux
	-Shell
---





## 业务需求:

> 将Redis数据库里面的一些key大10倍(其实这不止是这么简单的需求)

```shell
#!/bin/bash

# Redis客户端的执行路径
REDISCLI=/home/jeesk/openSource/redis-5.0.2/src/redis-cli


if [ ${#} -eq 0 ];then
   echo "missing params, please tell me which keys would be remove!"
   exit;
fi

HOST='127.0.0.1'
PORT=6379
keyPrefix=''


if [ ${#} -gt 2 ];then
   HOST=$1
   PORT=$2
   keyPrefix=$3
elif [ ${#} -gt 1 ];then
   HOST=$1
   keyPrefix=$2
else
   keyPrefix=$1
fi

echo "connecting to ${HOST}....."
sleep 5


#列出所有的keys
#${CLIENT} keys ${keyPrefix}
#  将需要操作的Key到一个临时文件里面, 根据自己的需求, 也可以自己手动将Key写到文本文件里面
echo 'keys * ' | $REDISCLI > redisValue.txt

FILE=redisValue.txt

#  循环读取文本文件里面的每一行内容
while read -r line
do	

	#获得指定Key的value, 当然你也可以使用mget 批量获得value, 或者是将所有的key读取到一个数组里面即可
	result=$(echo "get $line" | $REDISCLI)
	
	echo "result : ${result}"
       # 判断 key 不0 也为空	
	if [[ $result -ne 0 && $result -ne "(nil)" ]];then
		
		# 放大10倍
		let result=$((result*10))
		# 写入Redis数据裤里面
		echo "set $line $result " | $REDISCLI
	fi

done < $FILE

#开始删除
#${CLIENT} keys ${keyPrefix} | xargs ${CLIENT} del
#echo "redis_key:[${keyPrefix}] have been removed....."

```



> ​	Shell执行io操作的效率非常低小, 不建议大批量操作地生产环境数据库. 至于执行速度我也没有做过对比, 谨慎使用.