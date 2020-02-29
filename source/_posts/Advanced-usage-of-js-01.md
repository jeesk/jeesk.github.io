---
layout:	post
title: js的高级用法-1
subtitle:   "不适合人类阅读，非常水的自我笔记"
copyright: true
date: 2020-01-01 22:00:28
author: 	"jeesk"
tags:
	- JavaScript
---



###	 1.如何获得 js 函数的参数相关信息

```
 function print(a,b,c,d){
        if(arguments.length == 1){
            console.log(arguments[0]);
        }
        if(arguments.length == 2){
            console.log(arguments[0],arguments[1]);
        }
        if(arguments.length == 3){
            console.log(arguments[0],arguments[1],arguments[2]);
        }
        if(arguments.length == 4){
            console.log(a,b,c,d);
        }
 }
```

控制台输出 :

```
print(10);
print(10,20);
print(10,20,30);
print(10,20,30,40);
```

>
>
>js 的参数的个数可以通过arguments 来获得.  arguments 也是一个伪数组, 可以通过 arguments来获得调用函数的参数.  那么再想一想, 既然能通过 arguments 来获得调用函数的参数. 那么就有下面的几个问题,请思考一下 .

- Q:  函数不申明参数, 调用方法的时候填写了参数,那么可以使用arguments 来获得参数吗?

  A:  可以

- Q: 函数申明了3 个参数, 但是调用方法的时候填写了4个,参数, 这个时候能获取到参数吗?

  A:  使用使用arguments[3], 来获得第四个参数

- Q:  函数申明了3 个参数, 但是实际调用方法的时候 填写了2 个参数,那么第三个参数是什么呢?

  A: 第三个没有申明,那么就是undefined

  ```
   function test() {
          if (arguments.length > 0) {
              console.log(arguments[0])
          }
   }
  
    test("hello world !");
    console.log("---------------");
  
      function test2(a, b, c) {
          console.log(a);
          console.log(b);
          console.log(c);
          if (arguments.length == 4) {
              console.log(arguments[3]);
          }
      }
  
      console.log("---------------");
      test2('hello', 'world !', ' ni', 'hao');
  
      function test3(a, b, c) {
          console.log(a);
          console.log(b);
          console.log(c);
  
      }
  
      console.log("---------------");
      test3('hello', 'world !');
  ```

  控制台输出 :

  ```
   hello world !
   ---------------
   ---------------
   hello
   world !
    ni
   hao
   ---------------
   hello
   world !
   undefined
  ```

  >
  >
  >总结:
  >
  >函数的形参和实参:
  >1,形参个数=实参个数,函数正常执行
  >2,形参个数>实参个数,函数正常执行,没有被赋值的形参为undefined,如果有使用到,结果可能会出现错误
  >3,形参个数<实参个数,函数正常执行,多余的实参直接被忽略掉

###	2. 函数的申明的几种方式,函数类型,函数作为参数及返回值

```
    /*普通函数申明*/
    function s1() {
        console.log("function s1");
    }

    /*函数表达式申明*/
    var s2 = function () {
        console.log("function s2");
    }
    s1();
    s2();
    // 函数自调用,只会调用一次,申明的同时直接调用
    (function () {
        console.log("function s4");
    })();
    // 如何把局部变量变为全局变量, 使用window 对象
    (function (obj) {
        obj.num = 10;
    })(window);
    console.log(window.num);
    //将浏览器的window对象传入匿名函数,同时赋值制给window.num. 这里的实参是window, 形参是obj
```

控制台输出 :

```
function s1
function s2
function s4
```

上面说到函数可以作为表达式放在 = 的右边,那么js对象可以赋值函数吗? 或者说, 函数也算是js中的什么类型呢?  可以使用typeof() 方法获得js的类型

```
    var demo = {};
    demo.test = function () {
        console.log("test");
    }
    // 调用函数
    demo.test();
    // 打印这个函数, 如果 demo.test 加上() 表示调用这个函数
    console.log(demo.test)
    console.log(typeof (demo.test));

```

答案

```
test
f (){
	console.log("test");
}
function
```

从上面我们知道函数 也是一种类型,那么函数的参数也可以是函数吗? 看看下面的代码

```
    function f(obj) {
        if (typeof (obj) == "function") {
            obj();
        }else{
        	console.log(obj);
        }
    }
    f(function () {
        console.log("is function!!!")
    });
    f(123);
```

控制台输出 :

```
is function!!!
123
```

没错,函数的参数也可以是 函数. 所以我们在使用 jquery 的时候,使用了大量的类似于下面的方法. 

这种使用函数的方法也叫做:  `回调函数`

```
$(function(){
	// 执行一些操作
});
```

上面说到, 函数不仅能够作为函数的参数, 其实还能作为函数的返回值呢. 小伙伴们试一试下面的代码

```
    function f() {
        return function () {
            console.log("return a function !");
        }
    }
    var ff = f();
    ff(); // 或者f()();
```

>
>
>**总结**:
>
>函数的返回值:
>1，如果函数中没有return语句，则函数的返回值为undefined；
>2，如果函数中有return语句，函数的返回值为return语句返回的表达式值；
>
>3,  相同名称的函数,最后一次声明的函数会覆盖之前声明的函数
>
>

###	3.  js 变量的作用域, 和作用域链

​	

- 全局变量 全局变量申明的范围都可以使用,只要当前网页不关闭,内存就不会释放

- 局部变量 申明 在{} 之间的,使用范围也是在 {} 里面.

- 隐式全局变量

  相信很多人都知道全局变量和局部变量,那么知道 [隐式全局变量 ] 吗? 看看下面的代码,心里思考一下结果

```
    function f() {
        number = 1000;
    }

    f()
    console.log("number =" + number)
    console.log("number 的type: " + typeof (number));
    console.log("number+1 = " + number + 1);
    delete number;
    console.log("number 被删除后的类型: " + typeof (number));
    try {
    // number 被删除后,number 不存在,会导致代码执行异常, 使用try catch 捕获异常
        console.log(number);
    } catch (e) {
        console.log(e);
    }
    
    
    var number1 = 123;
    delete number1;
    console.log("number1 的类型: " + typeof(number1));
    console.log("number1: " + number1);
```

控制台 :

```
number = 1000
number 的type: number
number+1 = 1001
number 被删除后的类型: undefined
ReferenceError: number is not defined
    at Arguments.html?_ijt=m9qtp0pfdu3s3ftu43fomus0r8:21
number1 的类型: number
number1: 123
```

从控制台可以看到, 没有使用 var 申明的,种变量我们叫做全局隐式变量, 并且可以通过 delete 删除,但是var 申明的变量却不能被删除. 

```
    var num = 10;
    function f1() {
        var num = 20;
        function f2() {
            var num = 30;
            function f3() {
                var num = 50;
                console.log(num);
            }
            f3();
        }
        f2();
    }
    f1();

```

控制台:

`50`

```
    var num = 10;
    function f1() {
        var num = 20;
        function f2() {
            var num = 30;
            function f3() {
                console.log(num);
            }
            f3();
        }
        f2();
    }
    f1();
```

控制台输出: 

`30`

这个函数每个函数里面都申明了 num 变量, 如果将num 一 一 删除, 就会发现, num 变量的作用域链是就近原则, 谁近就调用谁. 

###	4.   js 的预解析

看看下面的代码

```
console.log(num);
```

控制台输出 :

```
Arguments.html?_ijt=hlglkqf17uei5h5tttrgc52ran:9 Uncaught ReferenceError: num is not defined
```

因为num 并没有申明, 所以找不到

```
    console.log(num);
    var num = 10;
```

控制台输出:

```
undefined
```

这个又是为什么呢, js 的预解析会将会有变量的申明放在作用域的最前面. 也就是把 num 的申明靠前了, 但是并没有赋值.

也就是下面的代码:

```
var num;
 console.log(num);
num = 10;
```

好的, 下面看看函数的调用呢?

```
    f1();
    function f1() {
        console.log("execute f1");
    }
```

控制台输出:

```
execute f1
```

你们也会发现 js 的预解析将函数的申明也提前到了作用域的最前面.

结合先前我们讲到的变量作用域就近原则,和预解析, 再看看下面的代码.

```
    var num = 20;
    function f1() {
        console.log(num);
        num = 30;
    }
    f1();
```

控制台输出:

```
20
30
```

说说上面代码的. 首先 上面的代码变量的申明已经是第一行代码了,这个时候, 已经不需要执行其他的操作了, 就近原则发现 num = 20; 然后变量赋值 = 30, 输出30;

现在再更改一下代码:

```
    var num = 20;
    function f1() {
        console.log(num);
        var num = 30;
        console.log(num);
    }
    f1();
```

控制台输出 :

```
undefined
30
```

说说js 执行的操作, js 预解析会将申明变量的放在作用域的最前面, 在 f1 的{} 里面,将 var num; 放在{} 的第一行, 执行console.log 的时候没有赋值 所以第一次打印出来的结果是 undefined , 第二次赋值后 就是 30.

> 1. js 预解析变量的声明, 提升到作用域的最前面,只提升申明, 不会提升赋值
> 2. js 预解析函数的声明, 提升到作用域的最前面,只提升申明, 不会提升调用
> 3. 先提升 var , 再提升function
>
> 



###	5.  js 的对象和模拟类



- 对象的创建

```
 	// 1. 使用 Object 对象
 	var person = new Object();
    person.age = 12;
    person.eat = function () {
        console.log("吃饭")
    };
    console.log(person.age);
    person.eat();
    console.log("----------------分隔符号-------------");
    
    // 2.或者直接在 {} 里面直接赋值变量, 在 {} 里面也可以直接申明赋值函数, 也可以在{}外面,再次赋值覆盖以前的赋值. 这种也叫字面量变量. 同时也可以在{}外面增加变量和函数.
 	var dog = {
        age: 0,
        eat: function () {
            console.log("dog eating !");
        }
    };
    dog.age = 12;
    dog.eat = function () {
        console.log(this.age + "的小狗正在eat");
    };
    dog.name = "xiaoming";
    dog.play = function () {
        console.log("一个叫:" + this.name + "的小狗正在玩");
    };
    console.log(dog.age);
    dog.eat();
```

- 使用 函数封装创建对象(这个函数是不是有点像 java的构造函数呢, 这种方法也叫工厂模式创建对象)

```
function createPerson() {
        var person = new Object();
        person.age = 12;
        person.eat = function () {
            console.log("吃饭")
        };
        return person;
    }
var person1 = createPerson();
console.log(person1.age);
person1.eat();

var person2 = createPerson();
console.log(person2.age);
person2.eat();
```

- 创建 js 的 模拟类(class)

  > 上面说道,函数创建对象的方法有点像 java 的构造函数,那么简化一下便成为了 js 的类

  ```
      function Person() {
      	// this 当前对象, 使用new 关键字 , 表示将 当前的this 对象返回
          this.age = 12;
          this.eat = function () {
              console.log("吃饭")
          };
      }
      var person1 =new Person();
      console.log(person1.age);
      person1.eat();
  
      var person2 =new Person();
      console.log(person2.age);
      person2.eat();
      if (person1 instanceof Person) {
          console.log("person1 的类型:Person" );
      }
      if (person2 instanceof Person) {
          console.log("person2 的类型:Person");
      }
      
      
      // 类似于java 的有参构造函数
      function Dog(age) {
          // this 当前对象, 使用new 关键字 , 表示将 当前的this 对象返回
          this.age = age;
          this.eat = function () {
              console.log(this.age + " 吃饭")
          };
      }
      var dog = new Dog(12);
      console.log(dog.age);
      dog.eat();
      
  ```

  你们就会发现 js 的 类型 判断和java 一样都是用 instanceof 来判断对象的引用类型的.

- 赋值变量的另外一种方式

  ```
      var dog = {
          age: 0,
          eat: function () {
              console.log("dog eating !");
          }
      };
      dog['age'] = 14;
      dog["eat"] = function () {
          console.log(this["age"]);
      }
      dog.eat();
  
  ```

  控制台输出 :

  ```
  14
  ```

  使用 `[]` 可以访问和赋值对象的属性和方法,  **同时方法中的this, 表示当前调用该方法的对象.**

  **如果是构造器中的this, 表示当前创建的对象.**

  >
  >
  >Tips: 
  >
  > 在js中分两种对象
  > 1.基本类型/原生类型/简单类型(通过字面量赋值的)
  > 2.引用类型(通过new创建的)
  >
  >结论:
  >instanceof 只能判断引用类型,如果判断的是基本类型,结果都为false
  >typeof 一般用来判断基本类型,如果传入的是引用类型,结果都为object  
  >证明arguments不是数组:

### 6. JSON和对象的互转, 及遍历对象

```
    var person = {
        name: 'xiaoming',
        age: 12
    };
    console.log("person: " + person);
    // json 对象转换成字符串, 在我们提交 ajax 请求的时候, 一般需要将 对象转换成字符串提交
    let s = JSON.stringify(person);

    console.log("jsonStr: " + s);
    // 将json字符串转换成 json对象
    var person1 = JSON.parse(s);
    console.log("person1: " + person1);
    // 遍历 json的对象不能使用 fori 循环, 这里的对象可以 简单的当做 java 中的map对象看待, 其实就是键值对
    for (var x in person1) {
        console.log(x + "=" + person1[x]);
    }
```

