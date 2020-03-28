# Git 关于commit的使用技巧

>用Git的时候commit提交代码后，发现这一次commit的内容是有错误的，或者不想提交了,那么有两种处理方法：
>1、修改错误内容，再次commit一次
>
> 2、使用**git reset** 命令撤销这一次错误的commit
>第一种方法比较直接，但会多次一次commit记录。
> 我个人认为 第二种更加好点, 错误的commit就没有必要提交了.

##	1.如果你只是想撤销 commit, 但是保留 add. (此时文件的变动也会被保留)

```
git reset --soft HEAD^

```

注意了: HEAD^ 上个版本,HEAD~2 上上个版本miced commitId

##	2.删除工作空间改动代码，撤销commit，撤销git add


```
git reset --hard HEAD^
```

##	3.不删除工作空间改动代码，撤销commit，并且撤销git add(常用)

```
git reset --mixed HEAD^ 或者git reset HEAD^
```

##	4.还没有commit, 但是已经 add. , 只想撤销 add

```
-- filename 是指单个文件名
git reset HEAD filename
全部：git reset HEAD
```

## 5.	不想保留本地文件的的改变.

```
git checkout filename
```



##	6.git命令对各个区的影响

  ```
git add. 	将工作区的文件添加到缓存区域

git commit  是将缓存区的内容增加到本地仓库

git checkout --file  是将工作区的内容丢弃

git reset --hard HEAD^    是将当前的index 直接指向上一个版本, 并且将 暂存区,仓库,工作区的内容变动全部删除.

git reset --mixed HEAD^ 或者git reset HEAD^     将缓存区,本地仓库的变动删除, 但是保留工作区的文件的变动.

git reset --soft HEAD^    表示本地仓库的 commit的内容丢弃,保留本地和缓存区的变动.
  ```

