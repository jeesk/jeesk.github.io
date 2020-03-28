##	**查看操作历史**

> 实际工作中，我们脑子里怎么可能记得一个几千行的文件每次都改了什么内容，不然要版本控制系统干什么。版本控制系统肯定有某个命令可以告诉我们历史记录，在 Git 中，我们用 git log 命令查看：

```bash
git log
git log 2
```

git log 命令显示从最近到最远的提交日志，如果嫌输出信息太多，看得眼花缭乱的，可以试试加上 --pretty=oneline 参数。

```bash
git log --pretty=oneline
```


2. ##	**git的每次commit 都有一个唯一的版本号码**

   > 当两个人同时在一个代码上工作时候，分别往各自的本地的版本库提交时，相同的提交号对应着不同的修改，如果使用 1，2，3 这样的数字不能保证唯一性，所以 Git 使用 SHA-1 算法产生唯一标识符，保证全球唯一。
   > 比如程序员甲和乙负责共同开发一个聊天软件，使用 Git 来版本控制。 Git 是分布式版本控制，每个人都有一个版本库。如果 Git 版本控制用 1，2，3 这样的数字来生成版本号，那么程序员甲和乙代码合并的时候就会出现问题。版本 1 到底是谁的？
   > SVN 是集中式的版本控制，只有一个版本库，所以版本号可以从 1，2，3 开始。Git 是分布式版本控制，每个人都有一个版本库，所以不能从 1，2，3 开始。
   > 看不懂可以跳过去，以后用多了，就明白了

3. ## **查看文件差异**

   > 如果一个文件知道他修改了,但如果能看看具体修改了什么内容，自然是很好的。
   > 比如你休假两周从国外回来，第一天上班时，已经记不清上次怎么修改的 readme.txt，所以，需要用 git diff 这个命令看看：

   ```bash
   git diff [file]
   git diff HEAD 工作区和仓库
   git diff --staged  缓存区和仓库
   git diff –cached	比较的是暂存区和版本库的差别
   ```

4. ## **回退版本**

   > 我们不断修改文件，不断的往版本库中提交文件。就好比玩 RPG 游戏时，每通过一关就会自动把游戏状态存盘，如果某一关没过去，你还可以选择读取前一关的状态。有些时候，在打Boss 之前，你会手动存盘，以便万一打 Boss 失败了，可以从最近的地方重新开始。Git 也是一样，每当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在 Git 中被称为 commit。一旦你把文件改乱了，或者误删了文件，还可以从最近的一个 commit 恢复，然后继续工作，而不是把几个月的工作成果全部丢失。

   ​     Tips:   Git的版本指向类似于指针, 如果要改变当前版本的内容, 只需要改变当前HEAD的指向即可, 这也就是Git速度比SVN,CVS快的原因.

   ```bash
      如果想回到上一个版本，应该怎么做呢?
      首先，Git 必须知道当前版本是哪个版本，在 Git 中，用 HEAD 表示当前版本，上一个版本就是 HEAD^，上上一个版本就是 HEAD^^。
      当然往上 100 个版本写 100 个 ^ 比较容易数不过来，所以写成 HEAD~100。
      
      现在，我们要把当前版本回退到上一个版本，就可以使用 git reset 命令：
      git reset --hard HEAD^
      
      回到指定版本（只要写前几位就可以了）：
      git reset --hard <commit id>
      
      用 git reflog 查看命令历史
      
      可以查看所有分支的所有操作记录（包括（包括 commit 和 reset 的操作），包括已经被删除的 commit 记录。
   ```

5. ## **撤销修改**

   > 当 我们修改了一个文件的时候, 发现我们已经不需要修改这个文件了. 那么这个时候怎么撤销呢?

   ```bash
   1、取消对文件的修改（还没存到暂存区域）
   
   git checkout -- file 可以丢弃工作区的修改：
   
   命令 git checkout -- readme.txt 意思就是，把 readme.txt 文件在工作区的修改全部撤销，撤销修改就回到和版本库一模一样的状态，让这个文件回到最近一次 git commit 状态。
   
   2、取消已经暂存的文件（已暂存，但还未提交）
   
   git reset HEAD file 的方式取消暂存，再通过上面的命令取消文件修改；抑或直接回退到指定 commit（git reset --hard <最近一次commitID>）。
   
   注意：git checkout -- file命令中的 -- 很重要，没有 --，就变成了“切换到另一个分支”的命令，我们在后面的分支管理中会再次遇到 git checkout 命令。
   ```

6. ## **删除文件**

   ```bash
   一般情况下，你通常直接在文件管理器中把没用的文件删了，或者用 rm 命令删了：rm test.txt 这个时候，Git 知道你删除了文件，因此，工作区和版本库就不一致了，git status 命令会立刻告诉你哪些文件被删除了。
   
   rm test.txt
   git add test.txt;
   
   上面两条命令等价于  git rm test.txt, 删除完成后需要 commit。
   
   ```

7. ## **集成Github**

   > 到目前为止，我们已经掌握了如何在 Git 仓库里对一个文件进行时光穿梭，你再也不用担心文件备份或者丢失的问题了。协同修改怎么办？
   >
   > Git 的功能之一：远程仓库。
   >
   > Git 是分布式版本控制系统，同一个 Git 仓库，可以分布到不同的机器上。怎么分布呢？最早，肯定只有一台机器有一个原始版本库，此后，别的机器可以“克隆”这个原始版本库，而且每台机器的版本库其实都是一样的，并没有主次之分。
   >
   > 找一台电脑充当服务器的角色，每天 24 小时开机，其他每个人都从这个“服务器”仓库克隆一份到自己的电脑上，并且各自把各自的提交推送到服务器仓库里，也从服务器仓库中拉取别人的提交。
   >
   > 可以自己搭建一台运行 Git 的服务器，不过现阶段，为了学 Git 先搭个服务器绝对是小题大作。好在这个世界上有个叫 GitHub 的神奇的网站，从名字就可以看出，这个网站就是提供 Git 仓库托管服务的，所以，只要注册一个 GitHub 账号，就可以免费获得 Git 远程仓库。

    1. 配置 SSHKEY, 下面的邮箱要填写你自己的.(**无论是github, 还是公司自己搭建的gitlab, 都是差不多的, 如果不配自SSHKEY ,那么你讲不能使用git协议, 只能使用http协议下载项目**)

       在git bash Here中 执行 `ssh-keygen -t rsa -C "youremail@example.com"`, 执行命令后一直Enter即可.

       在你的Window用户目录下面有一个文件夹, 会生成三个文件.其中id_rsa.pub是你的公钥.id_rsa是你的私钥, 一定不要把你的私钥泄露楼, 因为公钥也是私钥产生的.

       ```bash
       C:\Users\jeesk\.ssh
       	    id_rsa
           id_rsa.pub
           known_hosts
       ```

       前提是你已经注册了 `github`的账号了, 那么打开 [<https://github.com/settings/keys>](https://github.com/settings/keys) , 将你的id_rsa.pub使用文本编辑器打开, 然后复制里面的内容. 然后点击页面上的  `NEW SSH key`, title可以填写你对key的标识, key的输入框中 将你的复制的id_rsa.pub 粘贴即可.

    2. ```bash
       git config --global user.name " 你的名字" 
       
       git congif --global user.mail "你的邮箱"
       ```

   3. Github 创建一个仓库

      打开 [<https://github.com/>](https://github.com/)  ,来到你的首页,前提是你已经登录了github, 然后点击按钮`NEW`, 这个时候会来到创建仓库的页面.

      需要填写的内容

      ```bash
      1. Repository name:  这个是你的仓库名, 根据实际情况填写即可.
      2. Description : 仓库描述, 可以简单的描述一下, 这个仓库是什么情况,是做什么的.
      3. 选择Puclic, 还是Private. 如果你不想你的项目被公开,那么选择Private是一个不错的选择.否则Public也挺好.
      4. Initialize this repository with a README    是否初始化README, 这里我不建议初始化. 这个README文件, 建议由本地创建后, 提交到github即可.
      5.  Add .gitignore  , 这里默认选择`none`即可.  这个文件后面我们会解释的.
      6.  Add a license: , 这里选择none, license, 表示你的项目的许可证. 这个暂时不选, 以后你用多了就知道这个license 的意思了.
      ```

      点击 create repository, 仓库创建完毕. 这个时候页面会提示我摩恩如何操作

      ```bash
      Quick setup — if you’ve done this kind of thing before  or	HTTPS
      SSH
      https://github.com/jeesk/Hello.git
      Get started by creating a new file or uploading an existing file. We recommend every repository include a README, LICENSE, and .gitignore.
      
      ##  在命令行中创建一个仓库.
      …or create a new repository on the command line
      echo "# Hello" >> README.md
      git init
      git add README.md
      git commit -m "first commit"
      git remote add origin https://github.com/jeesk/Hello.git
      git push -u origin master
      
      ## 在命令行中将本地仓库,推送到当前创建的仓库.
      …or push an existing repository from the command line
      git remote add origin https://github.com/jeesk/Hello.git
      git push -u origin master
      
      ## 直接上传文件
      …or import code from another repository
      You can initialize this repository with code from a Subversion, Mercurial, or TFS project.
      ```

      那么现在我们在本地创建一个仓库, 并且将本地仓库和Github的仓库关联起来.

      随便找到一个空的目录, 执行下面的操作:

      右键常创建一个 hello.txt 文件, 内容是 hello world.

      初始化当前目录为git 的工作空间

      ```bash
      git init
      ```

      将当前目录的所有的文件添加到缓存区

      ```bash
      git add .
      ```

      将缓存区的文件提交到本地仓库, -m 后面的内容是你每次提交的备注,在实际工作中, 一般会写上你这次提交做了那些工作, 修改了或者修复操作的解释.方便团队审查.

      ```bash
      git commit -m "firstcommit"
      ```

      将本地仓库和github的远程仓库关联, 下面的地址要填写你自己的地址, 不然关联不上.

      ```bash
      git remote add origin https://github.com/jeesk/Hello.git
      ```

      推送本地仓库内容到远程仓库的主分支.

      ```shell
      git push -u origin master
      ```

      这个时候可以打开你的仓库看见, hello.txt 已经出现在你的github仓库上面了.