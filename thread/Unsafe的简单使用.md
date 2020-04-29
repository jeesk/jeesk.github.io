我们在研究 atomic类型中的一下方法的时候, 总会发现使用了UnSafe 这个类, 并且这个类非常奇怪,那么我们今天就来研究一下.



```java
private Unsafe()
    {
    }

    public static Unsafe getUnsafe()
    {
        Class class1 = Reflection.getCallerClass();
        if(!VM.isSystemDomainLoader(class1.getClassLoader()))
            throw new SecurityException("Unsafe");
        else
            return theUnsafe;
    }
        
}
    
```

调用构造函数的时候, 会判断是不是系统引导类加载器, 如果不是直接就直接跑出异常

```
public class Test {

    public static void main(String[] args) {
        sun.misc.Unsafe u = sun.misc.Unsafe.getUnsafe();
        System.out.println(u);
    }
}
```

控制台

```
Exception in thread "main" java.lang.SecurityException: Unsafe
	at sun.misc.Unsafe.getUnsafe(Unsafe.java:90)
	at com.shanjiancaofu.index.safethread.Test.main(Test.java:6)
```

