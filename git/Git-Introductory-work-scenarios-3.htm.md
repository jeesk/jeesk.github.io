
##  **仓库的操作**

```
列出每个远程库的简短名字，Git 默认使用这个名字来标识你所克隆的原始仓库。加上 -v 选项，显示对应的克隆地址。
git remote
git remote -v
git remote show [remote-name]
```

由于我们一个项目有多个版本, 这个时候我们要更新本地的所有版本, 可以执行下面的命令

```
git fetch [remote-name]       更新仓库内容(更新所有的分支变化)
```

##  **分支管理**

   >分支在实际中有什么用呢？假设你准备开发一个新功能，但是需要两周才能完成，第一周你写了 50% 的代码，如果立刻提交，由于代码还没写完，不完整的代码库会导致别人不能干活了。如果等代码全部写完再一次提交，又存在丢失每天进度的巨大风险。
   >现在有了分支，就不用怕了。你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。
   >
   >其他版本控制系统如 SVN 等都有分支管理，但是用过之后你会发现，这些版本控制系统创建和切换分支比蜗牛还慢，简直让人无法忍受，结果分支功能成了摆设，大家都不去用。
   >但 Git 的分支是与众不同的，无论创建、切换和删除分支，Git 在 1 秒钟之内就能完成（快）！无论你的版本库是 1个文件还是 1 万个文件。

   - Git 中的分支，其实本质上仅仅是个指向 commit 对象的可变指针。Git 会使用 master 作为分支的默认名字。在若干次提交后，你其实已经有了一个指向最后一次提交对象的 master 分支，它 在每次提交的时候都会自动向前移动。
   - Git 是如何知道你当前在哪个分支上工作的呢？是因为它保存着一个名为 HEAD 的特别指针，它是一个指向你正在工作中的本地分支的指针。
   - Git 创建一个分支很快，因为除了增加一个 testing 指针，改变 HEAD 的指向。
   - 比如说在testing 分支开发,对工作区的修改和提交就是针对 testing 分支了，比如新提交一次后，testing 指针往前移动一步，而 master 指针不变。
   - 在 testing 上的工作完成了，就可以把 testing 合并到 master上。Git 怎么合并呢？最简单的方法，就是直接把 master 指向 testing 的当前提交，就完成了合并：所以 Git 合并分支也很快！就改变指针。
   - 合并完分支后，甚至可以删除 testing 分支。删除 testing 分支就是把 testing 指针给删掉。

```bash
查看分支：git branch    查看跟踪的远程分支：git branch -r
创建分支：git branch <name>
切换分支：git checkout <name>
创建+切换分支：git checkout -b <name>
合并某分支到当前分支：git merge <name>
删除分支：git branch -d <name>
checkout远程的dev分支，在本地起名为dev分支，并切换到本地的dev分支
git checkout -b dev origin/dev 

git checkout -b release origin/release作用参见上一步解释


合并分支: 当前比如说,当前dev1 分支开发完成,这个时候要合并到,master分支;
 检查dev1 分支是否干净, 然后将dev1的修改提交到本地仓库.
 git status
 git add .
 git commit -m "xxx功能开发完成"
 切换到master 
 git chechout master 
 将dev1 分支合并到当前分支, 当前就是在Master分支,也就是说如果你是在dev2分支,那么执行下面的命令就是合并到dev1分支.
 
 
 git merge dev1


当 Git 无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。
用 git log --graph 命令可以看到分支合并图。

```

Tips: 温馨提示  

`工作区暂存是分支公用的,切换分支要保存工作区和暂存干净`, 也就是说在切换分支的时候一定要将改变的内容Commit一下. 不然会将修改的文件变化带到另外一个分支, 严重警告这种行为.



##   **修改或合并Commit**

1. 修改commit

   > 有的时候我们提交commit 的备注的时候可能没有写备注,或者是备注写错了,这个时候我们需要修改commit, 这个时候--amend 计算非常有用了. 无论是否提交到远端服务器 git commit --amend 都可以修改最近一次的提交.

   ```bash
   一、如果已经push到远端服务器，想修改已经提交过的commit信息  
   1.保存:Ctrl + o; 回车 ;退出:Ctrl + x   
   # git commit --amend  
   2.重新提交gerrit审批  
   # git push --no-thin origin HEAD:refs/for/master  
   
   二、如果已经push到远端服务器,有漏掉的test.txt文件想提交到上一次的commit信息  
   1.添加test.txt  
   # git add test.txt  
   2.修改commit信息;保存:Ctrl + o; 回车 ;退出:Ctrl + x   
   # git commit --amend  
   3.重新push到远端服务器  
   # git push --no-thin origin HEAD:refs/for/master 
   ```

   

2. 合并commit

   > ​	由于我们可能为了保持工作空间clean, 会commit多次,但是很多时候commit的内容是没有什么意义的. 这个时候我们需要合并commit. 
   >
   > 被合并过的commit 是不能再次被合并的I 

   ```
   HEAD~ 后面表示最近多少次提交
   git rebase -i HEAD~3   
   
   ```

   ```bash
   pick d6d290e 123123
   pick 5c7ee5a 12321
   pick 2e4ed64 12321
   
   # Rebase dffb9cd..2e4ed64 onto dffb9cd (3 commands)
   #
   # Commands:
   # p, pick <commit> = use commit
   # r, reword <commit> = use commit, but edit the commit message
   # e, edit <commit> = use commit, but stop for amending
   # s, squash <commit> = use commit, but meld into previous commit
   # f, fixup <commit> = like "squash", but discard this commit's log message
   # x, exec <command> = run command (the rest of the line) using shell
   # d, drop <commit> = remove commit
   # l, label <label> = label current HEAD with a name
   # t, reset <label> = reset HEAD to a label
   # m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
   # .       create a merge commit using the original merge commit's
   # .       message (or the oneline, if no original merge commit was
   # .       specified). Use -c <commit> to reword the commit message.
   #
   # These lines can be re-ordered; they are executed from top to bottom.
   #
   # If you remove a line here THAT COMMIT WILL BE LOST.
   #
   #       However, if you remove everything, the rebase will be aborted.
   #
   #
   # Note that empty commits are commented out
   
   ```

   简单的解释一下:

   前面三行是我们需要操作的三个 Commit，每行最前面的是对该 Commit 操作的 Command。关于每个 Command 具体做什么，下面的注释写得非常清楚。为了完成我们的需求，我们可以关注到这两个命令：

   1. s, squash = use commit, but meld into previous commit

   2. f, fixup = like "squash", but discard this commit's log message

      翻译:

   - squash：使用该 Commit，但会被合并到前一个 Commit 当中
   - fixup：就像 squash 那样，但会抛弃这个 Commit 的 Commit message

   看样子两个命令都可以完成我们的需求，那么让我们先试一下 squash！由于我们是想把三个 Commit 都合并在一起，并且使 Commit Message 写成 Commit-1，所以我们需要把 5c7ee5a(12321) 和 2e4ed64(12321) 前面的 pick 都改为squash，于是它看起来像这样：

   ```bash
   pick d6d290e 123123
   pick 5c7ee5a 12321
   pick 2e4ed64 12321
   当然，因为我很懒，所以通常我会使用它的缩写：
   pick d6d290e 123123
   s 5c7ee5a 12321
   s 2e4ed64 12321
   
   然后执行 :wx ,保存. git又会打开合并备注的vim操作
   ```

   ```bash
   # This is a combination of 3 commits.
   # This is the 1st commit message:
   
   123123
   
   # This is the commit message #2:
   
   12321
   
   # This is the commit message #3:
   
   12321
   
   # Please enter the commit message for your changes. Lines starting
   # with '#' will be ignored, and an empty message aborts the commit.
   #
   # Date:      Sun Mar 17 13:16:13 2019 +0800
   #
   # interactive rebase in progress; onto dffb9cd
   # Last commands done (3 commands done):
   #    squash 5c7ee5a 12321
   #    squash 2e4ed64 12321
   # No commands remaining.
   # You are currently rebasing branch 'master' on 'dffb9cd'.
   #
   # Changes to be committed:
   #       new file:   123123
   #       new file:   78
   #       modified:   hello.txt
   
   ```

   

这个时候我们就可以修改上面的备注, 然后执行   : wx.

然后查看提交记录:

```bash
git log
```

就会发现提交记录已经被合并了.



##  **保存工作空间现场**	

   > 在开发中，会经常碰到bug问题，那么有了bug就需要修复，在Git中，分支是很强大的，每个bug都可以通过一个临时分支来修复，修复完成后，合并分支，然后将临时的分支删除掉。
   >
   > 　　比如我在开发中接到一个bug时候，我们可以创建一个bug1分支来修复它，但是，当前的dev分支上的工作还没有提交。比如如下：
   >
   > 并不是我不想提交，而是工作进行到一半时候，我们还无法提交，比如我这个分支bug要2天完成，但是我bug1需要5个小时内完成(分支是可以提交的,不过增加了多余的commit信息, 这时候就可以使用stash 命令)。怎么办呢？还好，Git还提供了一个stash功能，可以把当前工作现场 ”隐藏起来”，等以后恢复现场后继续工作。如下：
   >
   > 

   ```bash
   git stash apply    恢复，恢复后，stash内容并不删除，你需要使用命令git stash drop来删除。
   
   另一种方式是使用git stash pop,恢复的同时把stash内容也删除了。
   
   
   需注意上面那句话所对作用范围的定义，如果你的文件没add，即没有“被跟踪”和“暂存”，stash是不会帮你保存的。
   ```

   ```bash
   （1）git stash save "save message"  : 执行存储时，添加备注，方便查找，只有git stash 也要可以的，但查找时不方便识别。
   
   （2）git stash list  ：查看stash了哪些存储
   
   （3）git stash show ：显示做了哪些改动，默认show第一个存储,如果要显示其他存贮，后面加stash@{$num}，比如第二个 git stash show stash@{1}
   
   （4）git stash show -p : 显示第一个存储的改动，如果想显示其他存存储，命令：git stash show  stash@{$num}  -p ，比如第二个：git stash show  stash@{1}  -p
   
   （5）git stash apply :应用某个存储,但不会把存储从存储列表中删除，默认使用第一个存储,即stash@{0}，如果要使用其他个，git stash apply stash@{$num} ， 比如第二个：git stash apply stash@{1} 
   
   （6）git stash pop ：命令恢复之前缓存的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash,即stash@{0}，如果要应用并删除其他stash，命令：git stash pop stash@{$num} ，比如应用并删除第二个：git stash pop stash@{1}
   
   （7）git stash drop stash@{$num} ：丢弃stash@{$num}存储，从列表中删除这个存储
   
   （8）git stash clear ：删除所有缓存的stash
   ```

   

##   **.gitignore 文件的使用**

   > ​	在项目中,有些文件不需要上传, 比如java的字节码文件 , log日志文件是不需要上传到git服务器器的,那么这个时候,就可以在项目的根目录下面创建.gitignore 文件, 把不需要上传的文件忽略掉即可.

   

   ```bash
   .在使用Git管理代码的过程中，可以修改.gitignore文件中的标示的方法来忽略开发者想忽略掉的文件或目录，如果没有.gitignore文件，可以自己手工创建。在.gitignore文件中的每一行保存一个匹配的规则例如：
   # 此为注释 – 将被 Git 忽略
   *.a       # 忽略所有 .a 结尾的文件
   !lib.a    # 但 lib.a 除外
   /TODO     # 仅仅忽略项目根目录下的 TODO 文件，不包括 subdir/TODO
   build/    # 忽略 build/ 目录下的所有文件
   doc/*.txt # 会忽略 doc/notes.txt 但不包括 doc/server/arch.txt
   
   在填写忽略文件的过程中，我发现.gitignore中已经标明忽略的文件目录下的文件，当我想git push的时候还会出现在push的目录中，原因是因为git忽略目录中，新建的文件在git中会有缓存，如果某些文件已经被纳入了版本管理中，就算是在.gitignore中已经声明了忽略路径也是不起作用的，这时候我们就应该先把本地缓存删除，然后再进行git push，这样就不会出现忽略的文件了。git清除本地缓存命令如下：
   git rm -r --cached .
   git add .
   git commit -m 'update .gitignore'
   ```

    还有一种情况, 就是发现某个文件,已经写到了.gitignore中 , 但是已经上传到了,git服务器上面. 

   那么这个文件, 无论你怎么修改,每次上传都是会被忽略掉的.但是呢, 项目中又存在这种文件, 这种文件一般是本地开发的配置文件. 如果你重新让` .gitignore `文件生效, 那么先前忽略的文件会被删除掉, 也就是说, 以前文件存在,` .gitignore`填写的配置不生效. 但是现在你删除了缓存,`.gitignore`文件生效了, 那么会导致原来的文件丢失.   这个是我亲身经历过的. 一定要注意,这种问题发生, 导致丢失不必要的配置文件.

**参考:**

 -		[git 官方文档](https://git-scm.com/book/zh/v1)
 -		[Git使用详细教程](https://blog.csdn.net/free_wind22/article/details/50967723)

