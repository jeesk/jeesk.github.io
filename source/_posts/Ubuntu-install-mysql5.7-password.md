---
layout:	post
title: Ubuntu 安装mysql5.7无密码解决方案
subtitle:   "不适合人类阅读，非常水的自我笔记"
copyright: true
date: 2019-03-10 12:00:28
author: 	"jeesk"
tags:
	- database
---



> 今年在Deepin上面安装Mysql5.7 ,安装后没有密码.下面提出了一解决的办法

##	没有 密码

```
mysql默认密码为空

但是使用mysql -uroot -p 命令连接mysql时，报错

ERROR 1045 (28000): Access denied for user 'root'@'localhost' 
此时修改root的默认密码即可
```

##	修改密码

```
1.	cd /etc/mysql
2.  sudo cat debian.cnf
```

此时可以看见:

```shell
[sudo] password for jeesk: 
# Automatically generated for Debian scripts. DO NOT TOUCH!
[client]
host     = localhost
user     = debian-sys-maint
password = bdAz1TgrY9Vqc2Qo
socket   = /var/run/mysqld/mysqld.sock
[mysql_upgrade]
host     = localhost
user     = debian-sys-maint
password = bdAz1TgrY9Vqc2Qo
socket   = /var/run/mysqld/mysqld.sock
```

拿到上面的密码帐号后,登录mysql

固定格式:   -u用户名 -p密码

`mysql -udebian-sys-maint -pbdAz1TgrY9Vqc2Qo`

登录后执行下面的命令

```mysql
show databases；
 
use mysql;
  
update user set authentication_string=PASSWORD("自定义密码") where user='root';
  
update user set plugin="mysql_native_password";
  
flush privileges;
  
quit;
```

修改密码后:   重启mysql , 再次登录

```
/etc/init.d/mysql restart;

再次登录
mysql -u root -p 密码;
```



##	Mysql 卸载

```shell
sudo apt purge mysql-*
sudo rm -rf /etc/mysql/ /var/lib/mysql
sudo apt autoremove
```

## 安装	

```
# 安装的时候会提示要设置root密码，如果你没有在卸载的时候去清理残留数据是不会提示你去设置root密码的 ，我的就没提示，可以用上面的方法修改密码
sudo apt-get install mysql-client mysql-server
 
 
#检查mysql是不是在运行
sudo service mysql status
 
 
#一般安装完成之后都是会自动运行的，如果没有运行可以start
sudo service mysql start
```

