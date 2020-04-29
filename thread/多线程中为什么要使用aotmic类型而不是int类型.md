下面看看一段代码:

```java

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;

/*int 类型和  atomic类型的安全对比*/
public class NumberAdd {

    static int numbec = 0;
    public static void main(String[] args) throws InterruptedException {

        /*使用 int 类型测试安全性*/
        long time = System.currentTimeMillis();
        CountDownLatch countDownLatch = new CountDownLatch(2);
        new Thread(() -> {
            for (int i = 0; i < 100000; i++) {
                numbec++;
            }
            countDownLatch.countDown();
            System.out.println("普通int执行完成1");
        }).start();
        new Thread(() -> {
            for (int i = 0; i < 100000; i++) {
                numbec++;
            }
            countDownLatch.countDown();
            System.out.println("普通int 类型执行完成2");
        }).start();
        /*保证上面线程必须全部执行完成,才继续运行*/
        countDownLatch.await();
        System.out.println(String.format("普通int 类型花费时间: %s ,结果 numbec = %s",(System.currentTimeMillis() - time), numbec));

        /*使用AtomicInteger 测试线程安全性*/
        AtomicInteger atomicInteger = new AtomicInteger();
        long time1 = System.currentTimeMillis();
        CountDownLatch countDownLatch1 = new CountDownLatch(2);
        new Thread(() -> {
            for (int i = 0; i < 100000; i++) {
                atomicInteger.incrementAndGet();
            }
            countDownLatch1.countDown();
            System.out.println("AtomicInteger类型执行完成1");
        }).start();
        new Thread(() -> {
            for (int i = 0; i < 100000; i++) {
                atomicInteger.incrementAndGet();
            }
            countDownLatch1.countDown();
            System.out.println("AtomicInteger类型执行完成2");
        }).start();
        countDownLatch1.await();
        System.out.println(String.format("AtomicInteger类型花费时间: %s ,结果 numbec = %s",
                (System.currentTimeMillis() - time1), atomicInteger.get()));
    }

}

```

控制台输出:

```
普通int执行完成1
普通int 类型执行完成2
普通int 类型花费时间: 99 ,结果 numbec = 161472
AtomicInteger类型执行完成1
AtomicInteger类型执行完成2
AtomicInteger类型花费时间: 7 ,结果 numbec = 200000
```

由控制台可以得出,  我们使用了countDownLatch 保证进行所有的自增操作一定会执行完成, 但是使用int 类型和atomicInteger的结果完全不一样, 说明了 int 类型再多线程下面并不安全. 下面我们分析一下 atomic的incrementAndGet() 方法.
下面分析一下

```
 public final int incrementAndGet() {
 		// 这里的 valueOffset 就是偏移量
 		//  每一种类型都有自己的偏移量 获得偏移量的方式 unsafe.arrayBaseOffset(long[].class);
        return unsafe.getAndAddInt(this, valueOffset, 1) + 1;
 }
 public final int getAndAddInt(Object var1, long var2, int var4) {
        int var5;
        do {
        	// 获取当前的 volatile变量的值
            var5 = this.getIntVolatile(var1, var2);
            // 当条件不成立的时候就一直获取 当前的值
        } while(!this.compareAndSwapInt(var1, var2, var5, var5 + var4));

        return var5;
}
```

这里的compareAndSwapInt 是native方法,那么就只能去 openjdk源码里面去找

`openjdk\hotspot\src\share\vm\prims\unsafe.cpp` 的1185 行

```c++
UNSAFE_ENTRY(jboolean, Unsafe_CompareAndSwapInt(JNIEnv *env, jobject unsafe, jobject obj, jlong offset, jint e, jint x))
  UnsafeWrapper("Unsafe_CompareAndSwapInt");
 // 使用jni 解析当前对象
  oop p = JNIHandles::resolve(obj);
  // 拿到对象的地址
  jint* addr = (jint *) index_oop_from_field_offset_long(p, offset);
  // 调用 Atomic.cmpxchg方法
  return (jint)(Atomic::cmpxchg(x, addr, e)) == e;
UNSAFE_END

```

我们继续看 Atomic.cmpxchg的源码(openjdk\hotspot\src\oscpu\windowsx86\vm\ atomicwindowsx86.inline.hpp 216 行)

```
inline jint     Atomic::cmpxchg    (jint     exchange_value, volatile jint*     dest, jint     compare_value) {
  // alternative for InterlockedCompareExchange
  int mp = os::is_MP();
  __asm {
    mov edx, dest
    mov ecx, exchange_value
    mov eax, compare_value
    LOCK_IF_MP(mp)
    cmpxchg dword ptr [edx], ecx
  }
}
```

这里看到有一个LOCK_IF_MP，作用是如果是多处理器，在指令前加上LOCK前缀，因为在单处理器中，是不会存在缓存不一致的问题的，所有线程都在一个CPU上跑，使用同一个缓存区，也就不存在本地内存与主内存不一致的问题，不会造成可见性问题。然而在多核处理器中，共享内存需要从写缓存中刷新到主内存中去，并遵循[缓存一致性协议](http://www.cnblogs.com/wewill/p/8098189.html#mesi)通知其他处理器更新缓存。

 intel的手册对lock前缀的说明如下：

1. 确保对内存的读-改-写操作原子执行。在Pentium及Pentium之前的处理器中，带有lock前缀的指令在执行期间会锁住总线，使得其他 处理器暂时无法通过总线访问内存。很显然，这会带来昂贵的开销。从Pentium 4，Intel Xeon及P6处理器开始，intel在原有总线锁的基础上做了一个很有意义的优化：**如果要访问的内存区域（area of memory）在lock前缀指令执行期间已经在处理器内部的缓存中被锁定（即包含该内存区域的缓存行当前处于独占或以修改状态），并且该内存区域被完全 包含在单个缓存行（cache line）中，那么处理器将直接执行该指令。**由于在指令执行期间该缓存行会一直被锁定，其它处理器无法读/写该指令要访问的内存区域，因此能保证指令执行 的原子性。这个操作过程叫做缓存锁定（cache locking），缓存锁定将大大降低lock前缀指令的执行开销，但是当多处理器之间的竞争程度很高或者指令访问的内存地址未对齐时，仍然会锁住总线。
2. 禁止该指令与之前和之后的读和写指令重排序。
3. 把写缓冲区中的所有数据刷新到内存中。

>
>
>总结:  
>
>atomic 类型的 CompareAndSwapInt  使用了是cpu的特性, 进行了总线锁定, 使得其他内存无法访问,就会一直循环执行 compareAndSwap, 直到操作成功为止. 
>
>而int 类型, 没有使用内存屏蔽, 导致读写的的顺序没有重排序, 并且没有缓冲区, 会导致 a b 两个线程同时拿到 变量 c, 如果多个线程对一个对象执行操作,那么 这个时候就会造成, a线程没有感知到b线程对变量的操作,  int 类型的变量在多线程的情况下,有严重的安全问题. 这就是我们在多线程中推荐你使用 atomic类型变量.
>
>i++, 可以分解为  读取i的值, 然后 做加法, 然后赋值. 普通的 i++, 这三个动作并不是 原子, 但是我们可以封装一个方法, 将三个操作同步, 也可以保证 安全.
>
>

```java

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;

/*int 类型和  atomic类型的安全对比*/
public class NumberAdd {
    
    static Integer number3 = 0;
    public static void main(String[] args) throws InterruptedException {

        /*使用 int 类型 加上同步方法测试安全性*/
        long time3 = System.currentTimeMillis();
        CountDownLatch countDownLatch3 = new CountDownLatch(2);
        new Thread(() -> {
            for (int i = 0; i < 100000; i++) {

                add();
            }
            countDownLatch3.countDown();
            System.out.println("普通int执行完成1");
        }).start();
        new Thread(() -> {
            for (int i = 0; i < 100000; i++) {
                add();
            }
            countDownLatch3.countDown();
            System.out.println("普通int 类型执行完成2");
        }).start();
        /*保证上面线程必须全部执行完成,才继续运行*/
        countDownLatch3.await();
        System.out.println(String.format("普通int 加上同步方法 类型花费时间: %s ,结果 numbec = %s",
                (System.currentTimeMillis() - time3), number3));

    }
    public static synchronized void add() {
        number3++;
    }
}
```

```
普通int 执行完成1
普通int 类型执行完成2
普通int 加上同步方法 类型花费时间: 68 ,结果 numbec = 200000
```

虽然效率远远不如 atomic类型 但是也能达到安全的效果.