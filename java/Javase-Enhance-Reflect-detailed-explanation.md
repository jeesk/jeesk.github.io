---
title: javaSe基础加强之反射
copyright: true
date: 2018-05-22 06:03:54
tags:
	- Java
---

#### 类加载机制(强迫症请跳过)
1. ##### 什么是类加载机制
当一个class文件被加载进内存时，在JVM中将形成一份描述该class文件结构的元信息对象Class，通过该对象可以获知class文件的结构信息：如构造器，字段，方法等。
<!-- more -->

虚拟机把描述类的数据从class文件加载到内存，并对数据进行校验，转换解析和初始化，最终形成可以被虚拟机直接使用的Java类型，这就是虚拟机的类加载机制。
简而言之：class文件被虚拟机加载进内存生产Class对象的过程就是类加载机制。


##### 2. 类加载机制的流程

> 当程序要使用到某个类时，如果该类还未被加载进内存中，则系统会通过加载，连接，初始化三个步骤来对该类进行初始化操作.

1. 加载:查找和导入class文件
类加载时指将类的class文件(字节码文件)载入到内存中，并为之创建一个java.lang.Class对象，我们称之为字节码对象.

2. 连接:把类的二进制数据合并到Java运行环境JRE(Java Runtime Environment))中
   1>:验证:检测被加载的类是否有正确的内部结构.
   2>:准备:负责为类的static变量分配内存，并设置默认值.
   3>:解析:把类的二进制数据中的符号引用替换为直接引用(深入分析JVM).

==(需要说明的是：这时候进行内存分配的仅包括类变量(被static修饰的变量)，而不包括实例变量，实例变量将会在对象实例化时随着对象一起分配在Java堆中;并且这里所说的初始值“通常情况”是数据类型的零值，例如:public static int value = 123;value在准备阶段过后的初始值为0而不是123，而给value赋值的指令将在初始化阶段才会被执行)==

3. 初始化:将符号引用转成直接引用(就是我们以前讲过的初始化步骤)
在此阶段，JVM负责对类进行初始化，主要就是对static变量进行初始化.
    类的初始化一个类包含以下几个步骤:
    1>:如果该类还未被加载和连接，则程序先加载并连接该类.
    2>:如果该类的直接父类还未被初始化，则先初始化其父类.
    3>:如果类中有初始化语句(静态代码块)，则系统依次执行这些初始化语句.

(扩展:符号引用:符号引用是一个字符串，它给出了被引用的内容的名字并且可能会包含一些其他关于这个被引用项的信息——这些信息必须足以唯一的识别一个类、字段、方法。这样，对于其他类的符号引用必须给出类的全名。)

 

##### 3.  类初始化的时机
下列几种情况能够触发类的初始化
使用new关键字实例化对象的时候
操作类的静态字段的时候（被final修饰、已在编译期把结果放入常量池的静态字段除外）
调用类的静态方法的时候。
初始化子类的时候，先初始化其父类。
用户指定运行一个主类（包含main()方法的那个类），虚拟机会先初始化这个主类。
直接使用java.exe命令来运行某个主类
使用java.lang.reflect包的方法对类进行反射调用的时候，如果类没有进行过初始化，则需要先触发其初始化。


#### 反射的概述 (强迫症请跳过)
1. 引入

>到目前为止我们已经知道了当一个class文件被类加载器加载进内存时，会在JVM中将形成一份描述该class文件结构的元信息对象Class，通过该对象JVM就可以获知class文件的结构信息：如构造器，字段，方法等。
那么，问题来了：
Class类到底是什么？
我们该如何通过API去创建Class类的实例对象？
又该如何去获取Class对象中的构造器，字段，方法这些信息呢？
这就是接下来的反射要研究的内容。

2. 由面向对象引发的思考

> 在学习面向对象阶段的课程中我们了解到Java是一门面向对象的编程语言，并且在Java中，万物皆对象！（比如：基本数据类型也都有相应的包装类），那么问题来了：“类”这类事物是不是对象呢？又该如何表示呢？
既然万物皆对象，那么类名、构造器、字段、方法等这些信息当然也需要封装成一个对象，这就是Class类、Constructor类、Field类、Method类。
而通过Class类、Constructor类、Method类、Field类等类的实例对象就可以得相应的信息，甚至可以不用new关键字就创建一个实例，并设置或获取字段的值，执行对象中的方法，这就是反射技术。




3. 什么是反射
>　通过上面的画图分析我们可以用自己的话总结一下什么是反射：反射就是在运行时期，动态的获取类中成员信息(构造器，字段，方法)的过程! 那么有了反射我们可以做些什么呢？
对于任意一个类，都能够知道这个类的所有构造器、字段和方法；
对于任意一个对象，都能够调用它的任意一个方法；



#### 反射操作第一步-获取Class对象	
> 要想使用反射获取类的信息，就必须先获得该类的字节码对象Class。通过Class提供的方法对类的信息进行进一步的获取，从而实现各种操作。

1. 通过API查看Class类

   Class类可以表示任意类的字节码对象,那么到底怎么区分Class类此时表示的那一个类的字节码对象呢?查看API我们发现为了解决该问题,Class类的设计提供了泛型:Class<T>
比如:
```
java.lang.String类的字节码类型:  Class<java.lang.String>;
java.util.Date类的字节码类型:  Class<java.util.Date>;
java.util.ArrayList类的字节码类型:  Class<java.util.ArrayList>;
```




2. 三种方式获取Class对象

通过阅读Class的API类得知，Class 没有公共构造方法。无法直接new，但是接续往下看我们发现了其他的几种方式可以获取Class对象
 ```
①对象.getClass()
②数据类型.class
③Class.forName(“类的全限定名”)
 
 
准备工作:先创建一个Person类,我们等一下就使用反射来获取这个Person类的信息
public class Person {
    
}
 ```

代码实现

> 注意：
第三种和前两种的区别：
前两种你必须明确具体的类的类型.
第三种后面是指定这种类型的字符串形式就行.这种方式扩展更强。后面学习框架，配置文件中都是使用中字符串,也就是类的全限定名(全类路径/包类路径),这样解析读取配置文件中类的全限定名就可以通过反射创建对象了

3. 获取基本类型的Class对象(了解)
基本数据类型不能表示为对象,也就不能使用getClass的方式,基本类型没有类名的概念,也不能使用Class.forName的方式,但是所有的数据类型都有class属性。可以使用Class clz = 数据类型.class获取

九大内置Class实例: JVM中预先提供好的Class实例byte,short,int,long,float,double,boolea,char,void.

 

//注意:Integer和int是不同的数据类型
System.out.println(clazz1 == clazz2);//false 
//在8大基本数据类型的包装类中,都有一个常量:TYPE,用于返回该包装类对应基本类的字节码对象.
System.out.println(Integer.TYPE == int.class);//true 


##### 获得构造器的几种方式
```
  获得多个构造器
 1. clazz.getConstructors();   获得所有的公共的构造器
 2. clazz.getDeclaredConstructors(); 获得所有的构造器,与访问权限无关的
  获得单个构造器
 1. clazz.getConstructor(指定构造器的参数类型Class);// 如果为空可以不写
 2. clazz.getDeclaredConstructor();   // 获得指定的构造器(可以获得私有的)

 直接使用constructor.newInstance(构造器的参数,如果没有可以不写); 可以创建对象 
```
##### 获得方法
```
获得多个方法
1. clazz.getMethods(); // 获得公共的方法
2. clazz.getDeclaredMethods();  // 获得所有的方法,与访问权限无关的
获得单个方法
1. clazz.getMethod(方法名,方法参数的Class);
2. clazz.getDeclaredMethod(方法名,方法参数的Class);
> 如果方法是是私有的,请使用暴力破击,setAccessable(true);
```
##### 获得字段
```
获得多个字 
1. clazz.getFields(); // 获得所有的公共的字段
2. clazz.getDeclaredField(); // 获得所有的字段(与访问权限没有关系的)
获得单个的字段
1. clazz.getField(字段的名字)i;
2. clazz.getDeclaredField(字段的名字);
#####  获得指定字段的值 
field.get(指定对象,字段的名字);
#### 设置字段的名字
field.set(指定的对象, 设置的值);
```



#### java反射练习

> 先创建下Person类
```
public class Person{
    
    private String name;
    String age;
    int age;
    
    setter(){
        // 三个字段的set方法
    }
    getter(){
        // 三个字段的get方法
    }
    
}
```
> 获得Class对象 练习

```
@Test  // 获得引用类型的Class对象 
public void testGetClass(){
    
    // 类名.class
    Class clazz = Person.class;
    // 对象.getClass()
    Class clazz2 = new Person().getClass();
    // Class.forName()静态方法
    Class clazz3 = Class.forName(Person);
    
}
```

> Tips:  &nbsp;&nbsp;&nbsp;第三种和前两种的区别：
前两种你必须明确具体的类的类型.
第三种后面是指定这种类型的字符串形式就行.这种方式扩展更强。后面学习框架，配置文件中都是使用中字符串,也就是类的全限定名(全类路径/包类路径),这样解析读取配置文件中类的全限定名就可以通过反射创建对象了


``` 
@Test // 获得基本类型和数组类型的Clazz对象
public void testGetPrimitiveClass(){
    
        int num = 2;
        Class clazz = num.class;
        // 包装类有对应的基本类型的Class对象
        Class clazz1 = Integer.TYPE;
        // clazz1 和clazz相等
        long num1 = 5L;
        Class clazz2 = num1.class;
        // 所有基本类型都有Class对象
        //  方式1:  数组类型.class;
                int[] nums = {1,2,45,64,4};
                int[] nums2 = {1,5,3,100};
                Class intArrayClass = int[].class;
        //    方式2:  数组对象.getClass();
                Class intArrayClass2 =  nums2.getClass();
                System.out.pritnln(intArrayClass == intArrayClass2); // 相等为true
        //    注意:所有的具有相同的维数和相同元素类型的数组共享同一份字节码对象,和元素没有关系.

}

```
> 获得构造器(请练习者在Person类中创建下面的构造器,然后使用反射来获得)
使用反射来获取类的构造器的步骤:
1. ):获取该类的字节码对象.
2. ):从该字节码对象中获取需要的构造器.

> 需求:
- 获取所有public构造器
- 获取所有构造器包括private
- 获取无参数public构造器
- 获取带有指定参数的public构造器
- 获取带有指定参数的private构造器
- 不使用Declared获取带有指定参数的private构造器会报错

>　调用构造器创建对象	
为什么要使用反射创建对象
构造器最大的作用就是用来创建对象，
为什么不直接用new关键字来创建对象？而是通过反射来创建对象呢？
因为在后面学习的框架中，配置文件中写的都是类的全限定名，需要使用反射才可以创建对象

＞　常用API:

public T newInstance(Object... initargs)
参数:initargs:表示调用构造器的实际参数
返回:返回创建的实例,T表示Class所表示类的类型

如果使用public空参构造创建对象,那么可以直接使用Class类中的newInstance方法创建对象.

注意：
调用私有的构造器前需要设置开启暴力访问:constructor.setAccessible(true);


＞　使用反射创建对象的步骤:
1．　):找到构造器所在类的字节码对象.
2．　):获取构造器对象.
3．):使用反射,创建对象

==练习==

- 调用空参构造
- 获取带参数构造并创建对象
- 获取私有构造并创建对象



>获得方法练习
常用API:
######　获取多个
```
	public Method[] getMethods():获取本类和继承过来的所有的public方法
	public Method[] getDeclaredMethods():获取本类中所有的方法(不包括继承的,和访问权限无关)
```
######　获取单个
```
	public Method getMethod(String methodName, Class<?>... parameterTypes):获取指定public的方法(包括继承的)
                   	    	methodName: 表示方法名
                      	 	parameterTypes:表示方法参数的Class类型如String.class
```
 ```
	public Method getDeclaredMethod(String name,Class<?>... parameterTypes):获取指定方法(包括private,不包括继承的)
                     	 	 methodName: 表示方法名字
                       		 parameterTypes:表示方法参数的Class类型如String.class
 
 ```
使用反射获取类中的方法步骤:
1):获取方法所在类的字节码对象
2):获取方法.

练习(请练习者自己在Peron中创建各种方法)
1. )获取所有public方法,包括继承的
2. )获取所有方法,包括private,不包括继承的
3. )获取指定方法,包括继承的
4. )获取指定方法,包括private,不包括继承的

> 执行方法
>常用API:
```
public Object invoke(Object obj,Object... args):表示调用当前Method所表示的方法
      参数:
            obj: 表示被调用方法所属对象
            args:表示调用方法是传递的实际参数
      返回:
            方法的返回结果
```
```

调用私有方法:
  在调用私有方法之前开启暴力访问:Method.setAccessible(true);
```

使用反射调用方法的步骤:
1. ):获取方法所在类的字节码对象.
2. ):获取方法对象.
3. ):使用反射调用方法.

练习(请练习者自己创建方法)
- 执行无参无返回的方法
- 执行有参无返回的方法
- 执行无参有返回的方法
- 执行有参有返回的方法
- 执行私有方法



##### 调用静态方法&数组参数的方法								
使用反射调用静态方法:

   静态方法不属于任何对象,静态方法属于类本身.
   此时把invoke方法的第一个参数设置为null即可.



使用反射调用数组参数方法(可变参数):使用反射调用带有数组的方法时候,会将参数自动解包,所以需要new Object[]{数组/对象}来封装一下

  王道:调用方法的时候把实际参数统统作为Object数组的元素即可.
  ``` 
  Method对象.invoke(方法所属对象,new Object[]{所有实参 });
  ```

##### 
> 这里了解即可,因为以后我们很少直接操作Field,都是通过getter/setter方法来操作属性(后面会详细学习Introspector专门用来操作属性的)

API
> 获取多个

```
	public Field[] getFields() 获取所有public 修饰的变量
	public Field[] getDeclaredFields() 获取所有的 变量 (包含私有)
	
```
> 获取单个

```
	public Field getField(String name) 获取指定的 public修饰的变量
	public Field getDeclaredField(String name) 获取指定的任意变量
````

> 通过方法，给指定对象的指定成员变量赋值或者获取值

```
	public void set(Object obj, Object value)在指定对象obj中，将此Field设置为指定值
  	  public Object get(Object obj)返回指定对象obj中，此 Field的值
```

注意：私有成员变量，通过setAccessible(boolean flag)方法暴力访问）

>练习:

- 获取所有public字段
- 获取所有字段包括private
- 获取指定public字段并设置值
- 获取指定private字段并设置值


 ##### 
 ```
String getName()：获取全限定名；
String getSimpleName()：获取简单类名，不包含包名；
Package getPackage():获取该类的包
Class getSuperclass()：获取父类的Class;
getGenericSuperclass():获取泛型
boolean isArray()：是否为数组类型；
boolean isEnum()：是否为枚举类型；
boolean isInterface()：是否为接口类型；
boolean isPrimitive()：是否为基本类型；
boolean isSynthetic()：是否为引用类型；
boolean isAnnotation()：是否为注解类型；
boolean isAnnotationPresent(Class annotationClass)：当前类是否加了指定类型注解；
 ```


> 反射的综合练习

```
package cn.wolfcode.b.exercise;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Student.java
 * @version
 * @date 2018年5月14日 下午9:19:37
 * @author jeesk
 * @since 1.0
 *
 */
@Data
@NoArgsConstructor
@Setter
@Getter
public class Student {
	private String name;
	private int age;

}

```
> 在src同级目录下面创建一个resource一个properties文件(config.properties)
```
# 这是一个类加载 的配置文件
```
student=wolfcode.cn.b.exercise.Student
```
>练习-加载配置文件并创建对象
 
需求:创建一个工厂类BeanFactory提供一个工厂方法Object getBean(String name),调用getBean方法传入一个对象名称会返回对应的实例对象
 
要求:使用反射创建对象并返回
 
提示:对象名称和类对应关系可以使用properties文件来指定
 
步骤分析
1.创建一个配置文件,里面配置好key=value,key是对象的名称,value是类的全限定名
2.编写工厂类,在静态代码快中加载配置文件;编写getBean方法根据传入的name返回相应的对象

```
package cn.wolfcode.b.exercise;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * BeanFactory.java
 * @version
 * @date 2018年5月14日 下午9:13:12
 * @author jeesk
 * @since 1.0
 * 需求 :需求:创建一个工厂类BeanFactory提供一个工厂方法Object getBean(String name),
 * 调用getBean方法传入一个对象名称会返回对应的实例对象

 */
public class BeanFactory {
	static Properties properties = new Properties();
	/*
	 * 	1); 加载资源文件的流对象 
	 * 	2): 从传入的字符串,从Properties中获得全限定名
	 * 	3): 使用反射创建对象;然后返回
	 * 
	 * 
	 * */

	static {
		// 从当前线程获得资源文件的流对象 
		InputStream inputStream = Thread.currentThread().getContextClassLoader().getResourceAsStream("config.properties");
	
		try {
			// 加载 资源文件
			properties.load(inputStream);
		} catch (IOException e) {
			e.printStackTrace();
		}
	
	}
	
	/**
	 * @param name  一个对象的名字
	 * @param t   对象 的Class类型
	 * @return   返回的是一个对象 
	 * @throws Exception  可能 会抛出Exception异常
	 */
	@SuppressWarnings("all")
	public static <T> T getBean(String name, Class<T> t) throws Exception {
		// 创建获得类的全限定名称
		String className = properties.getProperty(name);
		// 获得Class的实例
		T newInstance = t.newInstance();
		// 返回一个实例
		return newInstance;
	
	}
}

```
总结: 
 * 	小结:
 *  加载 Properties的四种方式 
 *  1):  使用绝对路径加载资源文件(路径写死了,不灵活)
 *  	InputStream in = 	new FileINputStream("C:\Users\s3296\Documents\stscode\junitDemo\resource\config.properties");
 *  	p.load(in);
 *  2):使用Class对象 的getResourcesAsStream()方法从当前字节码文件中加载 
 *  	BeanFactory.class.getResourceAsStream("config.properties");
 *  3): 使用类加载 器从当前项目中的编译路径Classpat去加载 	
 *  	BeanFactory.class.getClassLoader().getResourceASStream(""config.properties);
 *  4): 使用线程的方式获得加载路径(推荐第四种方式去加载 )
 *  	Thread.currentThread().getContextClassLoader().getResourceAsStream();
```