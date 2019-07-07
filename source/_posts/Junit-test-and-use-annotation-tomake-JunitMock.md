---
title: java软件测试JUnit
copyright: true
date: 2018-05-22 06:03:54
categories: 开发和测试
tags:
---
# 使用Junit进行单元测试

> Java的单元测试:Junit,存在两个版本.

1. junit3.x   针对于Java5之前的版本,没有注解,得按照规范来写测试.,Android中使用junit3.x (不研究).
2. junit4.x   针对于Java5以及之后的版本,使用注解,推荐.
<!-- more -->

> Tip: Junit 的@Test方法只能是公共无参无返回的参数,该类最多有一个无参的构造器,不能有任何的有参数构造器

##### 测试标签
- @Test 这是一个测试的标签
- @Before 这是在@Test标签执行的方法(每执行一个@Test,执行一次)
- @After 这是一个在@Test标签之后执行的(每执行一个@Test执行一次)
- @BeforeClass 这是一个在所有的@Before标签执行之前的标签,用于静态的方法,只使用一次

- @AfterClass  这是一个在所有的@After标签执行之后执行的标签方法,用于的静态的方法,只执行一次




#### 步骤:
把junit4.x的测试jar,添加到该项目中来; (现在的版本的eclipse自带了Junit的Jar)

定义一个测试类的名字: XxxTest,如EmployeeDAOTest
在EmployeeDAOTest中编写测试方法:如
```
       @Test
       public void testXxx() throws Exception {
       }
       注意:方法是public修饰的,无返回的,该方法上必须贴有@Test标签,XXX表示测试的功能名字.
```
选择某一个测试方法,鼠标右键选择 [run as junit],或则选中测试类,表示测试该类中所有的测试方法.


#### 使用junit断言(推荐使用)

- Assert.assertEquals(断言失败的消息,期望值,实际结果);  当断言失败的时候会抛出失败的的消息
- Assert.assertSame(message, expected, actual) 断言是否相同
- Assert.assertNotSame(message, expected, actual) 断言是否不同
- Assert.assertTrue(message, condition)  断言是否为true
- Assert.assertFalse(message, condition)  断言是否为true
- Assert.assertNull(message, object)  断言为空
- Assert.assertNotNull(message, object)  断言不为空
- @Test(expected="ArithmeticException") 期待获得一个异常
- @Test(timeout=400)   期待这一个测试在多少秒完成
- @Ignore 忽略某一个测试方法


# 练习: ==简单模拟JUnit==

```
public class JunitMock {
	
	
	@MyFirst
	public void myFirst() {
		System.out.println("在所有的@MyTest标签方法之前执行");
	}
	
	
	@MyTest
	public void myTest1() {
		System.out.println("执行测试1");
		
	}

	@MyTest
	public void myTest2() {
		System.out.println("执行测试2");
		
	}

	@MyTest
	public void myTest3() {
		System.out.println("执行测试3");
		
	}

	@MyTest
	public void myTest4() {
		System.out.println("执行测试4");
		
	}
	@MyAfter
	public void myAfter() {
		System.out.println("在所有的@MyTest标签方法之后执行");
	}
}

```
> 现在我们要模拟的是执行myTest1~myTest4方法,而且在执行每一个myTest方法之前执行@Myfirst,在每一个myTest方法之后的执行@MyAfter

> 创建3个注解
```
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)   //可以保留在运行时期 指定这一个注解可以被保存的范围
@Target(ElementType.METHOD) // 可以放在方法上,注解可以放在什么地方()
public @interface MyFirst {

}
```
```
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface MyAfter {

}
```
```
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)   // 指定这一个注解可以被保存的范围
@Target(ElementType.METHOD) // 这一个注解可以放在什么地方
public @interface MyTest {

}
```
```
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

/**
 * @author jeesk // 模拟测试一个测试类的所有方法的执行
 *
 */
public class TestDemo {
	public static void main(String[] args) throws Exception {
		// 获得测试类的Class对象
		Class<JunitMock> clazz = JunitMock.class;
		// 创建这一个类的对象
		JunitMock newInstance = clazz.newInstance();
		// 获得这一个类中申明的方法
		Method[] methods = clazz.getDeclaredMethods();
		Method myFirstMethod = null;
		Method myAfterMethod = null;
		List<Method> methodList = new ArrayList<>();
		for (Method method : methods) {
			if (method.isAnnotationPresent(MyFirst.class)) {
				// 判断这一个方法上面 是否有MyFirst这一个注解
				myFirstMethod = method;
			}
			if (method.isAnnotationPresent(MyAfter.class)) {
				// 判断这一个方法上面 是否有MyAfter这一个注解
				myAfterMethod = method;
			}
			if (method.isAnnotationPresent(MyTest.class)) {
				// 判断这一个方法上面 是否有MyTest这一个注解,有就添加到集合中去
				methodList.add(method);
			}
		}
		// 执行这些方法 测试方法必须为public void 无参数
		for (Method method : methodList) {

			// 先执行方法MyFirst
			myFirstMethod.invoke(newInstance);

			// 执行测试方法
			method.invoke(newInstance);

			// 最后执行MyAfter
			myAfterMethod.invoke(newInstance);
			System.out.println("____________分割线_____________");
		}

	}
}

```

#### ==执行结果==
```
 在所有的@MyTest标签方法之前执行
    执行测试4
在所有的@MyTest标签方法之后执行
____________分割线_____________

在所有的@MyTest标签方法之前执行
    执行测试2
在所有的@MyTest标签方法之后执行
____________分割线_____________

在所有的@MyTest标签方法之前执行
    执行测试3
在所有的@MyTest标签方法之后执行
____________分割线_____________

在所有的@MyTest标签方法之前执行
    执行测试1
在所有的@MyTest标签方法之后执行
____________分割线_____________
```







