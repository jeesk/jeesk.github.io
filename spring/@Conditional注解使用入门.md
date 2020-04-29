**本章大纲：**

（1）例子说明
（2）编码思路
（3）编写条件类WindowCondition和LinuxCondition
（4）编写接口CmdService以及两个实现类
（5）编写配置类，根据条件进行注入不同的类
（6）编写测试代码
（7）Spring提供的Condition
（8）题外话：怎么在Condition中获取application.properties的配置项



  接下里看下具体的内容：

**（1）例子说明**

​    	在java中这种情况，调用系统的cmd命令，但是我们知道在window和linux下命令有些有些时候是不一样的，那么我们以前一般是这么处理；

Java代码 [![收藏代码](https://www.iteye.com/images/icon_star.png)](javascript:void())

伪代码： 

```java
 if(window){ 
 	​    //具体的处理代码 
 }else if(Linux){ 
 	​    //具体的处理代码. 
 } 
```

​    当具体的处理代码很多的时候，我们会放到另外一个处理类来进行处理，比如：WindowService和LinuxService。你有没有发现这里如果我们使用了@Service进行注解WindowServie和LinuxService的话，那么内存中就会存在两个Service，而实际上有一个service根本一次都不会执行到。好了，针对于这个问题@Conditional就可以解决。当然它还有其它强大的地方。

 

**（2）编码思路**

​    （a）首先这里的话，有一个条件表达式的编写，满足什么条件下返回true，这个是接口Condition，我们需要去实现它；

​    （b）当满足条件的时候，进行做什么事情，这里使用的是@Conditional，当@Conditional（条件类.class）中的条件类返回true的时候，@Conditional所注解的类或者方法就会执行。

 

**（3）编写条件类WindowCondition和LinuxCondition**

**WindowCondition**：

Java代码 [![收藏代码](https://www.iteye.com/images/icon_star.png)](javascript:void())

```java
package com.kfit.demo.condition;  
   
import org.springframework.context.annotation.Condition;  
import org.springframework.context.annotation.ConditionContext;  
import org.springframework.core.type.AnnotatedTypeMetadata;  
   
/** 
 * window操作系统的条件：当在Window系统下运行的时候，matches方法会返回true,否则返回false. 
 * @author Angel --守护天使 
 * @version v.0.1 
 * @date 2017年8月23日 
 */  
public class WindowCondition implements Condition{  
   
    /** 
     * 这里写自己的逻辑，只有返回true，才会启用配置 
     */   
    @Override  
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {  
       return context.getEnvironment().getProperty("os.name").contains("Windows");  
    }  
}  
```



window操作系统的条件： 当在Window系统下运行的时候，matches方法会返回true,否则返回false.

LinuxCondition:

Java代码 [![收藏代码](https://www.iteye.com/images/icon_star.png)](javascript:void())

```
package com.kfit.demo.condition;  
   
import org.springframework.context.annotation.Condition;  
import org.springframework.context.annotation.ConditionContext;  
import org.springframework.core.type.AnnotatedTypeMetadata;  
   
/** 
 * Linux操作系统的条件：当在Linux系统下运行的时候，matches方法会返回true,否则返回false. 
 * @author Angel --守护天使 
 * @version v.0.1 
 * @date 2017年8月23日 
 */  
public class LinuxCondition implements Condition{  
   
    /** 
     * 这里写自己的逻辑，只有返回true，才会启用配置 
     */   
    @Override  
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {  
       return context.getEnvironment().getProperty("os.name").contains("Linux");  
    }  
     
}  
```

Linux操作系统的条件： 当在Linux系统下运行的时候，matches方法会返回true,否则返回false.



**（4）编写接口CmdService以及两个实现类**

CmdService

Java代码 [![收藏代码](https://www.iteye.com/images/icon_star.png)](javascript:void())

```java
package com.kfit.demo;  
   
public interface CmdService {  
    public void print();  
}  
```

​    接口类，具体实现代码有两个service，WindowCmdService和LinuxCmdService。

WindowCmdService：

Java代码 [![收藏代码](https://www.iteye.com/images/icon_star.png)](javascript:void())

```java
package com.kfit.demo.service;  
   
import com.kfit.demo.CmdService;  
   
public class WindowCmdService implements CmdService{  
   
    @Override  
    public void print() {  
       System.out.println("Window cmd...");  
    }  
     
} 
```

LinuxCmdService:

Java代码 [![收藏代码](https://www.iteye.com/images/icon_star.png)](javascript:void())

```java
package com.kfit.demo.service;  
   
import com.kfit.demo.CmdService;  
   
public class LinuxCmdService implements CmdService{  
   
    @Override  
    public void print() {  
       System.out.println("Linux cmd...");  
    }  
     
}  
```



​    注意：以上的两个实现类WindowCmdService和LinuxCmdService这里我们并没有使用@Service注解进行注入，下面我们使用配置类根据不同的系统注入不同的类。

 

**（5）编写配置类，根据条件进行注入不同的类**

CmdServiceConditionConfig：

Java代码 [![收藏代码](https://www.iteye.com/images/icon_star.png)](javascript:void())

```java
package com.kfit.demo.config;  
   
import org.springframework.context.annotation.Bean;  
import org.springframework.context.annotation.Conditional;  
import org.springframework.context.annotation.Configuration;  
   
import com.kfit.demo.CmdService;  
import com.kfit.demo.condition.LinuxCondition;  
import com.kfit.demo.condition.WindowCondition;  
import com.kfit.demo.service.LinuxCmdService;  
import com.kfit.demo.service.WindowCmdService;  
   
/** 
 * 条件配置类. 
 * @author Angel --守护天使 
 * @version v.0.1 
 * @date 2017年8月23日 
 */  
@Configuration  
public class CmdServiceConditionConfig {  
     
    /** 
     * 当WindowCondition方法中的matches返回true的时候， 
     * WindowCmdService会被注入，否则不注入。 
     */  
    @Bean("cmdService")  
    @Conditional(WindowCondition.class)  
    public CmdService windowCmdService(){  
       return new WindowCmdService();  
    }  
     
     
    /** 
     * 当LinuxCondition方法中的matches返回true的时候， 
     * LinuxCmdService会被注入，否则不注入。 
     */  
    @Bean("cmdService")  
    @Conditional(LinuxCondition.class)  
    public CmdService LinuxCmdService(){  
       return new LinuxCmdService();  
    }  
}
```

​    这里使用@Conditional根据满足不同的条件注入不同的类，在Linux下会注入实现类LinuxCmdService,在Window下会注入WindowCmdService。

 

**（6）编写测试代码**

在启动类的main方法中编写测试代码：

Java代码 [![收藏代码](https://www.iteye.com/images/icon_star.png)](javascript:void())`

```java
public static void main(String[] args) {  
       ApplicationContext ctx =  (ApplicationContext) SpringApplication.run(App.class, args);  
       CmdService cmdService = ctx.getBean(CmdService.class);  
       cmdService.print();  
    }  
```



​    在Window下运行控制台打印信息：

Window cmd...

 

​    在Linux下运行控制台打印信息（亲测）：

Linux cmd...

 

**（7）Spring提供的Condition**

除了自己自定义Condition之外，Spring还提供了很多Condition给我们用

 

**（a）@ConditionalOnBean**

仅仅在当前上下文中存在某个对象时，才会实例化一个Bean。

**（b）@ConditionalOnClass**

​    某个class位于类路径上，才会实例化一个Bean

**（c）@ConditionalOnExpression**

​    当表达式为true的时候，才会实例化一个Bean。

比如：

```java
@ConditionalOnExpression("true")

@ConditionalOnExpression("${my.controller.enabled:false}")
```



**（d）@ConditionalOnMissingBean**

​    仅仅在当前上下文中不存在某个对象时，才会实例化一个Bean

**（e）@ConditionalOnMissingClass**

某个class类路径上不存在的时候，才会实例化一个Bean

**（f）@ConditionalOnNotWebApplication**

​    不是web应用





**（8）题外话：怎么在Condition中获取application.properties的配置项**

​    在实际开发中，我们的条件可能保存在application.properties中，那么怎么在Condition中获取呢，这个很简单，主要通过ConditionContext进行获取，具体代码如下：

Java代码 [![收藏代码](https://www.iteye.com/images/icon_star.png)](javascript:void())

```
String port = context.getEnvironment().getProperty("server.port");  
System.out.println(port); 
```

> ​	原文 : [Spring Boot @Conditional、@ConditionalOnClass【从零开始学Spring Boot】](https://www.iteye.com/blog/412887952-qq-com-2395065)

