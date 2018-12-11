
---
title: 简单模拟hibernate的save方法
copyright: true
date: 2018-05-25 01:00:28
categories: 数据库
tags:
---




传入一个JavaBean对象, 向数据库插入这一个对象

如果: 
1. 类的字段名和数据库的列名不同可以使用注解来区别
2. 类的名字和表的名字不同也可以使用注解来标注

<!-- more -->
下面的代码会判断类和字段上面是否有相应的注解

> 表名字的的注解
```

```
package com.shanjiancao.smis.domain;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Colum.java
 * @version
 * @date 2018年5月25日 下午2:46:17
 * @author jeesk
 * @since 1.0
 *
 */
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Colum {
	String value();
}

```
> 列的名字的注解
```
package com.shanjiancao.smis.domain;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Table.java
 * @version
 * @date 2018年5月25日 下午2:39:24
 * @author jeesk
 * @since 1.0
 *
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Table {
	String value();
}

```

> 主键的注解
```
package com.shanjiancao.smis.domain;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Id.java
 * @version
 * @date 2018年5月25日 下午2:47:43
 * @author jeesk
 * @since 1.0
 *
 */
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface Pk {
	String value();
}

```

package com.shanjiancao.smis.util;

import static org.junit.Assert.*;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.annotation.Annotation;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

import com.shanjiancao.smis.domain.Colum;
import com.shanjiancao.smis.domain.Pk;
import com.shanjiancao.smis.domain.Student;
import com.shanjiancao.smis.domain.Table;

/**
 * HibernateMOck.java
 * @version
 * @date 2018年5月25日 下午2:33:55
 * @author jeesk
 * @since 1.0
 *
 */
public class HibernateMock {
	public static int save(Object obj) throws NoSuchFieldException, SecurityException {

		// 1. 拼接sql字符串,表名和类名相同,使用,列名和属性名相同

		StringBuilder sql = new StringBuilder(40);

		sql.append("INSERT INTO ");
		Class<? extends Object> clazz = obj.getClass();
		// 获得类名  ,如果没有注解就使用类的简单名字作为表名
		if (clazz.isAnnotationPresent(Table.class)) {
			// 是否有表table这一个标签
			String tableName = clazz.getAnnotation(Table.class).value();
			sql.append(" ").append(tableName).append("(");
		} else {
			String tableName = clazz.getSimpleName();
			sql.append(tableName).append("(");

		}
		StringBuilder signList = new StringBuilder(40);
		List<Object> valueList = new ArrayList<Object>();

		try {
			BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass(), Object.class);
			PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();

			for (PropertyDescriptor propertyDescriptor : propertyDescriptors) {
				String name = propertyDescriptor.getName();
				String columName = name; // 默认列名和属性名相同
				// 获得该字段
				Field field = clazz.getDeclaredField("name");
				// 判断该字段上面是否有Colum标签  没有主键这一个标签,才拼sql
				if (!field.isAnnotationPresent(Pk.class)) {

					if (field.isAnnotationPresent(Colum.class)) {
						// 如果这一个字段上面 的Colum这一个注解,获得注解上面 的值,来作为数据库的列
						String value = field.getAnnotation(Colum.class).value();

						columName = value;

					}

					Method readMethod = propertyDescriptor.getReadMethod();
					// 读取这一个字段上面 的属性
					Object value = readMethod.invoke(obj);
					valueList.add(value);
					signList.append("?").append(",");
					sql.append(columName).append(",");
				}

			}
		} catch (IntrospectionException e) {
			e.printStackTrace();
		} catch (IllegalArgumentException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} catch (InvocationTargetException e) {
			e.printStackTrace();
		}

		sql.deleteCharAt(sql.length() - 1); // 删除逗号
		sql.append(")").append(" ").append("VALUES").append(" ");
		sql.append("(");
		sql.append(signList);
		sql.deleteCharAt(sql.length() - 1); // 删除逗号
		sql.append(")");
		// 成功拼接sql语句,执行修改方法
		return update(sql.toString(), valueList.toArray());

	}

	@Test  // 测试
	public void test() throws Exception {

		Student student = new Student();
		student.setAge(18);
		student.setName("digu");

		save(student);
	}

	// 将参数依次添加到sql语句中
	public static int update(String sql, Object... parms) {
		Connection conn = DBCPUtil.getConnection();
		PreparedStatement prepareStatement = null;
		int count = 0;
		try {
			prepareStatement = conn.prepareStatement(sql);

			for (int i = 0; i < parms.length; i++) {
				prepareStatement.setObject(i + 1, parms[i]);
			}

			count = prepareStatement.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		} finally {
			DBCPUtil.close(prepareStatement, null, conn);
		}

		return count;
	}
}


package com.shanjiancao.smis.domain;

import lombok.Data;

/**
 * Student.java
 * @version
 * @date 2018年5月25日 上午9:22:10
 * @author jeesk
 * @since 1.0
 *
 */

@Data
@Table("t_student")
public class Student {
	private Long id;
	private String name;
	private int age;
}
```
