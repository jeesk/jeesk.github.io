---
layout:	post
title: 分布式事务Tcc原理介绍
subtitle:   "不适合人类阅读，非常水的自我笔记"
copyright: true
date: 2019-03-08 00:00:28
author: 	"jeesk"
tags:
	-分布式事务
---



##	Tcc事务的简单介绍



> TCC 将事务提交分为 Try - Confirm - Cancel 3个操作。

1.  Try  : (预留业务资源/数据效验)
2. Confirm  :(确认执行业务操作)
3. Cancel  :   (取消执行业务操作)

这里我要说一点的,Tcc三阶段操作,  第一步执行Try,第二步看调用2个(3,或这个多个)服务的情况, 看其调用过程中是否有异常,无异常执行Confirm, 有异常执行Calncel. 

## TCC 事务流程分析	

下面是Tcc执行的简单示意图:

![](/img/postimg/tccDestributedTrsa.png)

分析一下Tcc的执行流程:   比如商城用户购买商品,支付订单,并扣减库存为例子

1. 用户前台创建订单并且支付
2. Controller调用Service,Service分别调用A服务扣减余额,将支付的金额冻结,调用B服务扣减库存,并将减少的库存冻结
3. 在调用A,B分服务中, 是否有异常
   - 异常   立刻执行Cancel回滚数据,订单设置支付失败的状态. 
   - 无异常,执行成功,调用Confirm方法,确认订单.

那么问题来了,这里并不是一个数据库, 并不能执行回滚tran.rollback();.那么我们怎么去回滚数据呢?

并且这里是多个服务怎么办,比如说增加C服务, 该用户增加积分,这个时候又怎么执行回滚呢.

##	Tcc的事务如何实现回滚(Cancel和Confirm到底执行了什么)	

1. 当我们调用A服务的时候,记录A服务操作的方法,以及扣减的金额.并且提供A服务回滚的方法
2. 当我们调用B服务的时候,记录下B服务操作的方法,以及扣减的库存. 并且提供B服务回滚的方法
   1. 当我们调用A服务的时候,失败的时候,执行A服务的回滚.
   2. 当我们A服务执行完成,执行B服务的时候失败,执行A,B的回滚即可. 
   3. 同理无论是2个服务,还是3个, 甚至是多个服务调用,只要是在调用服务的时候,执行下调用的方法,并且在失败的时候,执行每个服务的回滚即可.



当事务在Try阶段的时候:

```java 
减少账户金额
Account account= new Account();
account.payment(accountDTO);
update account set balance = balance - #{amount} +
             freeze_amount= freeze_amount + #{amount} ,update_time = now() 
            where user_id =#{userId}  and  balance > 0 
```

 扣减库存

```mysql
InventoryDTO inventoryDTO = new InventoryDTO();
inventoryDTO.setCount(order.getCount());
inventoryDTO.setProductId(order.getProductId());
inventoryService.decrease(inventoryDTO);

update inventory set total_inventory = total_inventory - #{count}, 
lock_inventory= lock_inventory + #{count}  +
where product_id =#{productId}  and  total_inventory >0 
```



 执行Try的时候, 扣除减少的数量/金额,并将金额/数量增加到冻结/锁定的字段里面.那么现在想想,这个操作是否还缺点什么. 
 冻结库存/金额什么时候释放的问题
 当订单支付成功的时候,冻结或者是锁定的资源需要释放,那么对应的sql是

```mysql
 update inventory set  
             lock_inventory=  lock_inventory - #{count}  
             where product_id =#{productId}  and lock_inventory >0
 
 
  update account set freeze_amount= freeze_amount - #{amount} ,update_time = now() 
            where user_id =#{userId}  and  balance > 0 
     
 
```

当订单支付成功的时候,冻结或者是锁定的资源需要释放,那么对应的sql是

```mysql
update account set balance = balance + #{amount} +
             freeze_amount= freeze_amount - #{amount} ,update_time = now() 
            where user_id =#{userId}  and  balance > 0 
 
update inventory set total_inventory = total_inventory + #{count}, lock_inventory= lock_inventory - #{count}  
where product_id =#{productId}  and  total_inventory >0 
```



我们把服务执行成功和执行失败的方法叫做服务的confirm和cancel方法.

我们把多个服务的confirm方法的并集叫Tcc的Confirm, 多个服务的cancel方法叫做Tcc的Cancel操作.

讲道这里,大家明白了Tcc分布式事务Confirm和Cancel方法执行的操作了吗?

当然这里我们不排除,在执行confirm或者是cancel方法失败的情况,对于这种情况,我们可以使用定时器的方式,实现补偿即可.





