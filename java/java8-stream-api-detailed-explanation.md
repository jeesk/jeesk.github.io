---
title: Java8的Stream APi详解
copyright: true
date: 2018-05-22 15:03:54
tags:
 	- Java
---



### Stream Api的四大基流

1. IntStream
2. LongStream
3. DoubleStream
4. Stream<T>
<!-- more -->

> IntStrea,LongStream,DoubleStream 对应的基本类型,
Stream<T>对应是的引用类型

- #### Stream 的定义 :
```
支持数据处理操作的源生成的元素序列.
```
- #### Stream 的特点: 
1. 元素序列: 集合讲的是数据存储,流讲的是计算(处理)
2. 源: 流从源获得的数据和源数据的顺序是相同的
3. 拥有数据操作: 类似于数据库的操作
4. 流水线 :链式编程，可以在一条线上拥有多个操作
5. 使用的是内部迭代，可以并行
6. 

- #### String Api拥有延迟加载的功能
> 比如说日志记录功能 
```
public void test(){
    
    String str1  = "有错";
    String str2  = "Iphone";
    String str3  = "1000.2";
    
    log("info",str1+str2+str3)
}
```

```
// 日志记录函数
public void log(String level, String msg){
    
    if("debug".equls(level)){
        System.out.println(msg);
    }
}

```
> **使用Lambda表达式来优化**

```
public void test(){
    String str1  = "有错";
    String str2  = "Iphone";
    String str3  = "1000.2";
    log("error",() ->{
        System.out.pritnln("条件不满足,不会执行");
        return str1+str2+str3;
        
    });
    
}

// 使用Lambda表达式的时候,先判断,再确定执不执行
public void log(String level,Supplier<String> sup){
    if("debug".equals(level)){
        
        System.out.pritnln(sup.get());
    }
    
    
}

```

- #### 过滤,去重,取前几个,跳过几个
```
List<String> list = Arrays.asList("Lambda","pk","hello","sister","pk","hello","213","2341","dasfasd");
			Stream<String> listStream = list.stream();
			
			//使用Stream的fillter()方法过滤
			Stream<String> filter = listStream
					.filter(x -> x.length()>2)  //满长度大于2才不会被过滤
					.distinct()  //去重
					.limit(5) // 限定保存几个数据
					.skip(1); //跳过前面几个数据
			filter.forEach(System.out::println);
```

- #### StreamApi 的映射Map和flatMap
```
@Test 使用Stream Api 的map映射功能 

public void test1() throws Exception {
	List<Person> list1 = Arrays.asList(new Person("name",12),new Person("小明",123));
	
	// 使用Map(),T类型的Stream转换成R类型的Stream,类型可以不同
	Stream<String> map = list1.stream().map((Person p) -> p.getName());
	
	List<Person> list2 = Arrays.asList(new Person("name",12),new Person("小明",123));
	List<Person> list3 = Arrays.asList(new Person("大明",12),new Person("小红",123));
	
	// 使用flatMap  将集合的流,转换成集合内装的对象的流 
	Stream<List<Person>> of = Stream.of(list2,list3);
	Stream<Person> flatMap = of.flatMap(x -> x.stream());

}
```
- #### 使用Stream Api排序
```
@Test   排序
public void testSorted() throws Exception {

	List<Integer> list = Arrays.asList(1,2,5,65,1234,2534,6,1232,26,21,34);
	// 使用sorted 默认不带参数,使用的是自然排序
	 Stream<Integer> sorted = list.stream().sorted();  
	 sorted.forEach(System.out::println);
	
	// 自己定制排序Comparator
	// 使用Sorted(Compator<Integer> com) 
	// list.stream().sorted((u1,u2) -> Integer.compare(u1, u2));
	 
	Stream<Integer> sorted2 = list.stream().sorted(Comparator.comparing((Integer u) -> u).reversed());
	sorted2.forEach(System.out::println);
}

```
- #### 是否匹配(bool)和 返回第一个值,和任意一个值(Optional)
```

@Test  // 匹配,返回是一个boolean, 返回第一个元素,和任意一个元素,返回的是一个返回的是一个Optional
public void testFindAndMathch() throws Exception {
	List<Integer> list = Arrays.asList(1,2,5,65,1234,2534,6,1232,26,21,34);
	Stream<Integer> stream = list.stream();
	
	// 所有的元素都匹配 allMatch()
	System.out.println(stream.allMatch(x -> x>1000));
	
	// anyMatch()  是否有一个匹配
	System.out.println(list.stream().anyMatch(x -> x>1000));
	
	//  noneMathch() 没有一个匹配 
	System.out.println(list.stream().noneMatch(x -> x <0));
	
	// findFirst() 返回的是一个第一个元素,返回的是一个Optional
	System.out.println(list.stream().findFirst().get());
	
	// 返回任意一个元素  findAny()  返回的是一个Optional
	System.out.println(list.stream().findAny().get());
}

```

- #### Optional类(NullPointer)
```
@Test  // Optional 的使用方法(只有0个或则是一个值)
public void testOptional() throws Exception {
	
	    // 创建一个Optional
		Optional<Integer> of = Optional.of(1);
		System.out.println(of.get());
		
		// isPresent() 判断容器是否有值 (boolean)
		System.out.println(of.isPresent());
		
		// ifPresent 如果有值就打印
		of.ifPresent(System.out::println);
		
		// T orElse(T) 如果为空,返回参数的值
		Integer orElse = of.orElse(1);
		// 还有其它的方法
	}
```

- #### 统计函数
```
@Test // 统计函数
public void testCount() throws Exception {
	List<Integer> list = Arrays.asList(1,2,5,65,1234,2534,6,1232,26,21,34);
	Stream<Integer> stream = list.stream();
	
	// count() 统计个数
	long count = stream.count();
	
	// 求最大的值 max
	list.stream().max(Comparator.comparing(x -> x));
	
	//求最小的值
	list.stream().min(Comparator.comparing(x -> x));
}
```
- #### 规约复杂操作
```
@Test // 归约(将每一个元素)依次相操作,生成一个值
public void testReduce() throws Exception {
	List<Integer> list = Arrays.asList(1, 2, 5, 6, 7, 8, 9);
	Stream<Integer> stream = list.stream();
	Integer reduce1 = stream.reduce(20, (x, y) -> x + y);
	Integer reduce2 = stream.reduce(20, (x, y) -> x - y);
	Integer reduce3 = stream.reduce(20, (x, y) -> x * y);
	Integer reduce4 = stream.reduce(20, (x, y) -> x / y);

	// collect:将流转换为其他形式:list
	List<Integer> collect = list.stream().collect(Collectors.toList());

	// collect:将流转换为其他形式:set
	Set<Integer> collect2 = list.stream().collect(Collectors.toSet());
	
	// collect:将流转换为其他形式:TreeSet(在Coolectors没有构造TreeSet,那么就创建一个TreeSet)
	list.stream().collect(Collectors.toCollection(TreeSet::new));
	
	// collect:将流转换为其他形式:map   // 
	list.stream().collect(Collectors.toMap(x -> x + 1, a -> a));
	
	// collect:将流转换为其他形式:sum
	list.stream().collect(Collectors.summarizingInt(x -> x));
	//	collect:将流转换为其他形式:avg
	list.stream().collect(Collectors.averagingInt(x -> x));
	
	//  collect:将流转换为其他形式:max
	list.stream().collect(Collectors.maxBy(Comparator.comparing(x -> x)));
	
	//	 collect:将流转换为其他形式:min
	list.stream().collect(Collectors.minBy(Comparator.comparing(x -> x)));

}


```

- #### 分组和分区
```
@Test  
// groupBy和partitioningBy 
// 分组是分成多个(比如类别) 
// 分区是分成两个(partitioningBy))
public void testGroupByAndGroup() throws Exception {
	List<Integer> list = Arrays.asList(1, 2, 5, 6, 7, 8, 9);
	
	list.stream().collect(Collectors.groupingBy(x -> x));
	
	list.stream().collect(Collectors.partitioningBy(x -> x >5));
}
```