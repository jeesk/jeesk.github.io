---
layout:	post
title: Hmily-Tcc 分布式事务框架源码解析-01
subtitle:   "不适合人类阅读，非常水的自我笔记"
copyright: true
date: 2019-03-10 14:00:28
author: 	"jeesk"
tags:
	-分布式事务
---



> 温馨提示: 
>
> 1. 源码阅读不可能debug一次 , 就弄懂了.  调试源码需要反复调试(debug 10次甚至是20次),并且有一定的耐心.
> 2. 源码阅读非常枯燥, 需要带着问题去读, 然后找答案.
> 3. 比如本章:   项目启动到底干了什么事?   为什么要干这些事儿?     初始化用了Spring 那些特性. 或者是用了那些设置模式的.
> 4.  切记,    耐心是学习的最好的方式. 

## 1.搭建源码调试环境

> 这是使用的idea开发工具.



1. 打开idea ,点击Check out from  Version Control, 然后点击git , 输入项目地址 :

   [https://github.com/yu199195/hmily.git](https://github.com/yu199195/hmily.git)

   然后导入项目后,Maven自动编译.

   2.下载zookeeper [点击下载](https://mirrors.tuna.tsinghua.edu.cn/apache/zookeeper/), 下载后修改zk配置.

3. 修改项目中的hmily-demo下面的hmily-demo-dubbo 中的三个子模块, 主要是修改application.yml中mysql的数据库账号相关配置. 和spring-dubbo.xml 中 zookeeper中的服务地址, 一般情况下填写localhost即可.

   

   项目目录解释:

   ```java
   hmily-admin                     分布式事务后台管理系统
   hmily-annotation				事务框架核心注解
   hmily-common					公共类
   hmily-core						框架核心代码,以及
   hmily-dashboard					vue编译项目
   hmily-demo						Hmily内置事务场景(支持Dubbo,Sring_cloud,Motan)
   hmily-dubbo                     Dubbo的核心代码
   hmily.iml
   hmily-motan						motan核心代码
   hmily-spring-boot-starter		
   hmily-springcloud				springcloud核心代码
   logs
   pom.xml
   README.md
   script
   .travis.yml
   ```



##	2.项目启动调试

- 启动zookeeper

- 执行sql文件(hmily-demo>sql>hmily-demo.sql)   可以生成account, inventory,order的三个库和表

- 点击hmily 中hmily-demo > hmily-demo-dubbo >  启动account,inventory, order 三个项目项目.

  ```
  http://127.0.0.1:8888/hmily-admin/#/manage        分布式事务后台管理系统
  
  http://127.0.0.1:8087/swagger-ui.html#/order-controller     订单调试下单
  ```

- 在浏览器中 打开 http://127.0.0.1:8087/swagger-ui.html#/order-controller 

- 可以看到**Swagger API**  的页面, 然后

  点击   /order/mockInventoryWithTryException  这一个接口 ,   Try it out, 体验一下. 分布式事务的魅力.

 







##	Demo项目启动做了什么

在hmily-core 模块中找到下面的核心引导类

`org.dromara.hmily.core.bootstrap.HmilyTransactionBootstrap`

```java
public class HmilyTransactionBootstrap extends HmilyConfig implements ApplicationContextAware {

    private final HmilyInitService hmilyInitService;

    @Autowired
    public HmilyTransactionBootstrap(final HmilyInitService hmilyInitService) {
        this.hmilyInitService = hmilyInitService;
    }
    @Override
    public void setApplicationContext(final ApplicationContext applicationContext) throws BeansException {
        // 启动Spring的时候, 会将容器上下文作为参数传入.
        // 将上下文对象设置到Spring Bean工具类中
        SpringBeanUtils.getInstance().setCfgContext((ConfigurableApplicationContext) applicationContext);
        // 执行事务相关初始化
        start(this);
    }
    private void start(final HmilyConfig hmilyConfig) {
        hmilyInitService.initialization(hmilyConfig);
    }
}

```



HmilyTransactionBootstrap 核心引导类:

1. 执行HmilyTransactionBootstrap的构造方法的时候, 会执行 **HmilyAutoConfiguration.java**类中的**自动装配**, 自动装配主要是将配置文件中的值设置到 HmilyTransactionBootstrap类的一些属性中.  这些属性值,用于后面的spi和一些初始化相关需要的. 



2.  首先继承了HmilyConfig, 实现了ApplicaitonContextAware,那么实现ApplicationContextAware, 有什么意义.



>在Web应用中，Spring容器通常采用声明式方式配置产生：开发者只要在web.xml中配置一个Listener，该Listener将会负责初始化Spring容器，MVC框架可以直接调用Spring容器中的Bean，无需访问Spring容器本身。在这种情况下，容器中的Bean处于容器管理下，无需主动访问容器，只需接受容器的依赖注入即可。
>
>但在某些特殊的情况下，Bean需要实现某个功能，但该功能必须借助于Spring容器才能实现，此时就必须让该Bean先获取Spring容器，然后借助于Spring容器实现该功能。为了让Bean获取它所在的Spring容器，可以让该Bean实现ApplicationContextAware接口。
>--------------------- 



简单的说: HmilyTransactionBootstrap 这个类需要获得Spring 容器. 	Spring 在启动的时候会扫描容器的bean的时候, 如果发现了某一个类实现了ApplicationContextAware接口, 会将容器作为本身作为参数传入.



调用初始化: hmilyConfig 作为参数传入,进行初始化.

```
hmilyInitService.initialization(hmilyConfig);
```

```java
 @Override
    public void initialization(final HmilyConfig hmilyConfig) {
     // 增加钩子进程, 当进程被kill的时候 , 打印 "hmily shutdown now "
        Runtime.getRuntime().addShutdownHook(new Thread(() -> LOGGER.info("hmily shutdown now")));
        try {
            loadSpiSupport(hmilyConfig);
            hmilyCoordinatorService.start(hmilyConfig);
        } catch (Exception ex) {
            LogUtil.error(LOGGER, " hmily init exception:{}", ex::getMessage);
            System.exit(1);
        }
        new HmilyLogo().logo();
    }
```



1.   **loadSpiSupport(hmilyConfig);  初始化 持久层和序列化方式** 

   >   加载Spi原理  [https://www.jianshu.com/p/46b42f7f593c](https://www.jianshu.com/p/46b42f7f593c)

  ```java
private void loadSpiSupport(final HmilyConfig hmilyConfig) {
        //spi serialize
        // 从获得数据的序列化编码,hmilyConfig 默认的序列化是kyro
        final SerializeEnum serializeEnum = SerializeEnum.acquire(hmilyConfig.getSerializer());
        // 通过 spi 加载所有的序列化类.
        final ServiceLoader<ObjectSerializer> objectSerializers = ServiceBootstrap.loadAll(ObjectSerializer.class);
        
        // 通过序列化serializeEnum   从objectSerializers 中获得对应的序列化方式实现. 
        final ObjectSerializer serializer = StreamSupport.stream(objectSerializers.spliterator(), false)
                .filter(objectSerializer -> Objects.equals(objectSerializer.getScheme(), serializeEnum.getSerialize()))
                .findFirst().orElse(new KryoSerializer());
        
        //spi repository
        // 拿到的持久层编码
        final RepositorySupportEnum repositorySupportEnum = RepositorySupportEnum.acquire(hmilyConfig.getRepositorySupport());
        
        // 通过spi 加载 所有的持久层方式
        final ServiceLoader<HmilyCoordinatorRepository> recoverRepositories = ServiceBootstrap.loadAll(HmilyCoordinatorRepository.class);
        
        // 通过 repositorySupportEnum  拿到具体的实现
        final HmilyCoordinatorRepository repository = StreamSupport.stream(recoverRepositories.spliterator(), false)
                .filter(recoverRepository -> Objects.equals(recoverRepository.getScheme(), repositorySupportEnum.getSupport()))
                .findFirst().orElse(new JdbcCoordinatorRepository());
        // 持久层设置序列化方式
        repository.setSerializer(serializer);
        // 将 Hmily持久层注册到 到 Spring容器中
        SpringBeanUtils.getInstance().registerBean(HmilyCoordinatorRepository.class.getName(), repository);
    }
  ```

2.  **初始化持久层**

   ```java
     // 拿到持久层前缀, 如果没有hmilyConfig.getRepositorySuffix()) 为空, 那么返回Dubbo的应用名
           final String repositorySuffix = buildRepositorySuffix(hmilyConfig.getRepositorySuffix());
           coordinatorRepository = SpringBeanUtils.getInstance().getBean(HmilyCoordinatorRepository.class);
           // 初始化持久层
           coordinatorRepository.init(repositorySuffix, hmilyConfig);
   ```

   

   点击init()会根据coordinatorRepository 的具体实现类跳转到不同的init方法 , 这里我们以JdbcCoordinatorRepository的init() 为例子,

   ```java
   @Override
       public void init(final String modelName, final HmilyConfig txConfig) {
           try {
               // 获取 应用 的数据前缀. 这里可以在applicaiton.yml 中配置数据库相关的
               final HmilyDbConfig hmilyDbConfig = txConfig.getHmilyDbConfig();
               if (hmilyDbConfig.getDataSource() != null && StringUtils.isBlank(hmilyDbConfig.getUrl())) {
                   dataSource = hmilyDbConfig.getDataSource();
               } else {
                   // 初始化HikariDataSource
                   HikariDataSource hikariDataSource = new HikariDataSource();
                   hikariDataSource.setJdbcUrl(hmilyDbConfig.getUrl());
                   hikariDataSource.setDriverClassName(hmilyDbConfig.getDriverClassName());
                   hikariDataSource.setUsername(hmilyDbConfig.getUsername());
                   hikariDataSource.setPassword(hmilyDbConfig.getPassword());
                   hikariDataSource.setMaximumPoolSize(hmilyDbConfig.getMaxActive());
                   hikariDataSource.setMinimumIdle(hmilyDbConfig.getMinIdle());
                hikariDataSource.setConnectionTimeout(hmilyDbConfig.getConnectionTimeout());
                   hikariDataSource.setIdleTimeout(hmilyDbConfig.getIdleTimeout());
                   hikariDataSource.setMaxLifetime(hmilyDbConfig.getMaxLifetime());
               hikariDataSource.setConnectionTestQuery(hmilyDbConfig.getConnectionTestQuery());
                   if (hmilyDbConfig.getDataSourcePropertyMap() != null && !hmilyDbConfig.getDataSourcePropertyMap().isEmpty()) {
                       hmilyDbConfig.getDataSourcePropertyMap().forEach(hikariDataSource::addDataSourceProperty);
                   }
                   dataSource = hikariDataSource;
               }
               // 根据  模块名 拼接事务表名, 
               this.tableName = RepositoryPathUtils.buildDbTableName(modelName);
               //save current database type
               this.currentDBType = DbTypeUtils.buildByDriverClassName(hmilyDbConfig.getDriverClassName());
               // 创建表  当前应用服务的表名
               executeUpdate(SqlHelper.buildCreateTableSql(hmilyDbConfig.getDriverClassName(), tableName));
           } catch (Exception e) {
               LogUtil.error(LOGGER, "hmily jdbc log init exception please check config:{}", e::getMessage);
               throw new HmilyRuntimeException(e);
           }
       }
   
   ```

   

   > ​	总结: Hmily 的account 初始化做了那些事:

   - 初始化当前应用的持久层
   - 创建当前应用服务的表.(表的用途后面再说)







