---
layout:	post
title: ThreadLocal部分源码解析与理解
subtitle:   "不适合人类阅读，非常水的自我笔记"
copyright: true
date: 2019-03-06 22:00:28
author: 	"jeesk"
tags:
	-Java
	-多线程
---

> ​	提到ThreadLocal , 大家想到的就是ThreadLocal是一个本地线程副本变量的工具类, 比如方法无参数传值. 主要用于将线程和线程存放的副本对象做一个映射, 并且互不干扰.  等等.ThreadLocal是一个特别的类, 申明一个ThreadLocal成员变量,能够被多个线程共享使用, 还可以达到线程安全的目的. 是不是很神奇?



##		1.ThreadLocal 应用场景

 1. 比如Hirebernate的Session实例, Session是由SessionFactory获得的, 但是Session并不是线程安全的, 也就是说在一个Dao里面,Session是不能作为成员变量的. 为了安全把Session保存在ThreadLocal里面.

    ```java
    private static final ThreadLocal<Session> threadLocal = new ThreadLocal<Session>();
    //获取Session
    public static Session getCurrentSession(){
        Session session =  threadLocal.get();
        //判断Session是否为空，如果为空，将创建一个session，并设置到本地线程变量中
        try {
            if(session ==null&&!session.isOpen()){
                if(sessionFactory==null){
                    rbuildSessionFactory();// 创建Hibernate的SessionFactory
                }else{
                    session = sessionFactory.openSession();
                }
            }
            threadLocal.set(session);
        } catch (Exception e) {
            // TODO: handle exception
        }
        return session;
    }
    ```

    ```java
    使用代理,解决每次调用getCurrentSession(),并且重复释放内存. 
     public Object invoke(Object proxy, Method method, Object[] args)
            throws Throwable{
            	threadLocal.set(session);
                method.invoke(proxy,args); // 
                threadLocal.remove(session);
            }
    ```

    

 2.   连接池, 比如Druid, 里面大量的使用了ThreadLocal.

​    

###	2.ThreadLocal源码分析	

ThreadLocal里面几个重要的方法分析:

`get方法:`

```java
/**
     * Returns the value in the current thread's copy of this
     * thread-local variable.  If the variable has no value for the
     * current thread, it is first initialized to the value returned
     * by an invocation of the {@link #initialValue} method.
     *
     * @return the current thread's value of this thread-local
     */
    public T get() {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            ThreadLocalMap.Entry e = map.getEntry(this);
            if (e != null) {
                @SuppressWarnings("unchecked")
                T result = (T)e.value;
                return result;
            }
        }
        return setInitialValue();
    }
```

首先获得当前的线程, 再从线程中获得ThreadLocalMap. 下面看看getMap()方法.

```java
    ThreadLocalMap getMap(Thread t) {
        return t.threadLocals;
    }
```

getMap(); 返回的就是一个threadLocals; threadLocals就是ThreadLocal.ThreadLocalMap , 是ThreadLocal里面的一个静态内部类.ThreadLoca里面的ThreadLocalMap默认为空. 

由此可见: 每一个线程中维护者一个ThreadLocalMap, 这个Map是独一无二的,Map里面的key是本地对象ThreadLocal,value就是当前线程变量的一个副本. 

如果map == null, 

```java
    private T setInitialValue() {
        T value = initialValue();
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null)
            map.set(this, value);
        else
            createMap(t, value);
        return value;
    }
```

value = initialValue(), value等于空. 再获得当前线程的ThreadLocalMap, 然后map里面维护着key是ThreadLocal, map是要设置的值(这里的value其实是null). 如果map==null, 那么会创建一个ThreadLocalMap,并设置值.

`set方法`

```java
    /**
     * Sets the current thread's copy of this thread-local variable
     * to the specified value.  Most subclasses will have no need to
     * override this method, relying solely on the {@link #initialValue}
     * method to set the values of thread-locals.
     *
     * @param value the value to be stored in the current thread's copy of
     *        this thread-local.
     */
    public void set(T value) {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null)
            map.set(this, value);
        else
            createMap(t, value);
    }
```

 拿到当前线程, 并且获得当前线程中的ThreadLocalMap, 并且设置值. 这里说明一下, 虽然ThreadLocalMap是线程安全的, 但是Object value = ThreadLocal.get() 获得value也可能出现并发问题(如果这个value是一个共享的, 或者其他线程修改了value里面的内容),总而言之:

ThreadLocal的作用是提供线程内的局部变量，这种变量在线程的生命周期内起作用。作用：提供一个线程内公共变量（比如本次请求的用户信息），减少同一个线程内多个函数或者组件之间一些公共变量的传递的复杂度，或者为线程提供一个私有的变量副本，这样每一个线程都可以随意修改自己的变量副本，而不会对其他线程产生影响。

`remove()`

```java
    /**
     * Removes the current thread's value for this thread-local
     * variable.  If this thread-local variable is subsequently
     * {@linkplain #get read} by the current thread, its value will be
     * reinitialized by invoking its {@link #initialValue} method,
     * unless its value is {@linkplain #set set} by the current thread
     * in the interim.  This may result in multiple invocations of the
     * {@code initialValue} method in the current thread.
     *
     * @since 1.5
     */
     public void remove() {
         ThreadLocalMap m = getMap(Thread.currentThread());
         if (m != null)
             m.remove(this);
     }
```

移除当前线程保存的副本变量, 释放内存. 该方法一定显示调用,特别实在高并发的情况下面,否则会造成严重的内存泄露.



这里再次理一下关系, 每个Thread里面维护者一个ThreadLocal.ThreadLocalMap,  ThreadLocal.ThreadLocalMap里面的key又是当前的ThreadLocal对象,这有点相互引用的感觉.  简单的来说这个,每个线程中都有一个map, 这个map是其他线程不能获得的, 避免了其他线程操作这个map的可能性,那么这个map就是线程安全的. map里面的key当前的ThreadLocal对象, 那么说明了, 每个ThreadLocal实例都对应着一个value, 通过get方法就能获取到这个value. 



