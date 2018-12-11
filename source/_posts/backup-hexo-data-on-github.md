---
title: 在github备份Hexo超级详细教程
copyright: true
date: 2017-12-13 23:38:56
categories: 生活随笔
tags:
---

>  linux 用户请讲命令前面的$符号删除即可

<!-- more -->
Hexo在发布之后在github的仓库中我们只能找到生成的静态文件，而我们的博客的源文件：主题，文章之类的，都还在本地，并没有备份。这样很危险，万一那天电脑坏了或者是出现一些其他问题，就得从头再来。正好，我们可以利用github的分支思想来备份我们的源文件。
备份之前，先来看一看我们的博客根目录下面有那些内容：


```

.deploy_git		网站静态文件(git)
node_modules 		插件
public 			网站静态文件
scaffolds 		文章模板
source			博文等
themes 			主题
_config.yml		网站配置文件
package.json 		Hexo信息
db.json

```

#### 添加过滤内容

备份的时候我们把master分支放生成的静态文件，Hexo-Blog（此处文件夹必须和存储分支名字一致）放我们要备份的源文件。
实际备份中，.deploy_git、public文件夹和我们的master分支内容重复，所以略过。而_config.yml为我们的站点配置文件，安全起见，这个文件也不备份。所以，我们在根目录下面建一个.gitignore文件来建立“黑名单”：
文件内容：

1. /.deploy_git
2. /public  
3. /_config.yml
好了，准备工作完成。现在开始备份。

#### 备份

打开git-bash

1. $ git init
2. $ git remote add origin git@github.com:username/username.github.io.git		
3. $ git add .
4. $ git commit -m "blog"
5. $ git push origin master:Hexo-Blog

现在你会发现github你的博客仓库已经有了一个新分支Hexo-Blog，我们的备份工作完成。
后续

以后，本地写好博文之后，可以先执行

1. $ git add .
2. $ git commit -m "blog"
3. $ git push origin master:Hexo-Blog

进行备份，然后

1. $ hexo d -g

进行更新静态文件。
这里推荐先进行备份，因为万一更新网站之后不小心丢失了源文件，就又得重新再来了。

