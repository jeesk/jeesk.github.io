---
title: XML解析详解
copyright: true
date: 2018-05-19 23:38:56
categories: xml
tags:
	- 标记语言
---



# (一) 什么是XML:

### 前言

<!-- more -->
> 假 如 你 的 人 生 有 理 想，那 么 就 一 定 要 去 追，不 管 你 现 在 的 理 想 在 别 人 看 来是 多 么 的 可 笑 ， 你 也 不 用 在 乎 ， 人 生 蹉 跎 几 十 年 ， 如 果 年 轻 的 时 候 计 较 得 失 前 怕 狼 就 后 怕 虎 而 不 去 追 逐， 等 到 了 40， 50 岁 的 时 候 ， 你 唯 一 能 做 的 就 是 感 叹 岁 月 的 消 逝 和 无 情…

---


> Tip: &nbsp;&nbsp;&nbsp;&nbsp;  ==xml的所有节点都可以看做节点,比如<name>小明</name>
想要获得小明,必须使用node.getFirstNode.getNOdevalue()来获==取

XML(eXtensible Markup Language)，==是一种可扩展的标记语言==，类似HTML。
XML技术是W3C组织(World Wide ====Web==== Consortium万维网联盟)发布的，目前遵循的是W3C组织于2000年发布的XML1.0规范。
XML被广泛认为是继Java之后在Internet上最激动人心的新技术。
XML的树状结构简单,清晰，无论是人还是计算机都能轻松解析。
XML作为一种公订的、开放的标准，不受知识产权的限制

- HTML: 显示页面,网页.  学习里面自带的标签(预定义好的)<html>
- XML:  ==传输数据，而非显示数据==。
- XML==标签没有被预定义，需要用户自行定义标签==。


# (二) 为什么要学XML：

- XML是一种通用的数据交换格式，许多项目都采用XML作为数据交换格式（它可以在任何平台下进行传递/解析-异步系统之间的传输数据,目前有一种数据格式渐渐替代xml来做数据传输-> json)
- Struts1.x,Struts2.x,Spring,Hibernate,Mybatis等任意一个JavaEE框架中都可用XML做配置文件。
掌握XML是软件开发人员的一项基本技能


## 文档声明:
在编写XML文档时，需要先使用文档声明来声明XML文档。且必须出现在文档的第一行。
最简单的语法:
	如：<?xml version="1.0"?>
用encoding属性说明文档所使用的字符编码，默认为UTF-8。保存在磁盘上的文件编码要与声明的编码一致。
	如：<?xml version="1.0" encoding="UTF-8"?>
用standalone属性说明文档是否独立，即是否依赖其他文档。yes表示独立文档不依赖，no表示要依赖，可以不写则表示可以依赖可以不依赖
	如：<?xml version="1.0" standalone="no"?>

- 编码:==XML有两个编码:  要保证两个编码相同,都为UTF-8==
==内容编码:文档声明中指定
文件本身的编码:文件另存为时可以选择==

- 元素(标签)<>(可以自定义标签)
XML文档必须有一个根元素.
标签区分大小写的.<a> <A>
有开始标签就必须有结束标签.<linkman></linkman> 或者 自闭合<linkman/>
    不允许标签交叉嵌套

- 属性：
key=value格式
   不能使用空格，冒号特殊字符.
   属性需要以字母开头.
   属性必须使用引号. 

- 注释：   ``` <!-- 注释 --> ```

- 特殊字符:
- 
显示的符号 | 实体符号
---|---
  <  | \&lt;
  >  | \&gt;
  &  | \&amp
  "  | \&quot;
  '  | \&apos;

- CDATA是Character Data的缩写
作用：把里面的内容当做普通文本内容；
语法：<![CDATA[数据内容]]>

## 　XML的约束
XML本身是可扩展的,用户可以写任意的标签都，但是这样一来就可能乱套了，用户的随意会让XML表示的含义不再统一并且解析会变得困难，所以一个框架不应该让用户任意定义标签。==我们需要有约束来规范XML的标签可以出现哪些标签，不能出现哪些标签以及标签之间的顺序、出现的次数，标签有哪些属性等。==
我们编写XML文件的时候有约束的话还可以根据约束给我们提示该怎么写

> 下面是一个Xml文件

```
<?xml version="1.0" encoding="UTF-8"?>
<contacts> 
	<linkman id="1">
		<name>Will</name>
		<email>iwil123@sina.cn</email>
		<address>广州</address>
		<group>XXX团队</group>
	</linkman> 
	<linkman id="2">
		<name>Andy</name>
		<email>Andy@163.com</email>
		<address>广州</address>
		<group>XXX</group>
	</linkman>
	<linkman id="2">
		<name>jack</name>
		<email>Andy@163.com</email>
		<address>四川</address>
		<group>XXX</group>
	</linkman>
</contacts>

```
#### 在contacts.xml文档中引入dtd:

- 当引用的DTD文档在本地时，采用如下方式：
<!DOCTYPE 根元素 SYSTEM “DTD文档路径”>如：

```
<?xml version="1.0" encoding="UTF-8"?>
```
<!DOCTYPE contacts SYSTEM "contacts.dtd">
- 当引用的DTD文档在公共网络上时，采用如下方式：
<!DOCTYPE 根元素 PUBLIC “DTD名称” “DTD文档的URL”>如：
```
<!DOCTYPE struts PUBLIC	"-//Apache Software Foundation//DTD Struts Configuration 2.3//EN"
	"http://struts.apache.org/dtds/struts-2.3.dtd">
```


#### ==DTD约束(比较常用的约束)==
```  
<!-- 这一是一个dtd文件-->
contacts.dtd
<?xml version="1.0" encoding="UTF-8"?>
<!ELEMENT contacts (linkman+)>
<!ELEMENT linkman (name,email,address,group)>
<!ELEMENT name (#PCDATA)>
<!ELEMENT email (#PCDATA)>
<!ELEMENT address (#PCDATA)>
<!ELEMENT group (#PCDATA)>
```
```
语法说明:
----------------------------------------------------------------------
linkman+:>=1、 linkman?:0||1、 linkman*:>=0、linkman:=1
----------------------------------------------------------------------

```

####　XSD约束
在contacts.xml中引入schama:
```
<?xml version="1.0" encoding="UTF-8"?>
<contacts xmlns="http://www.wolfcode.cn"
	xmlns:xs="http://www.w3.org/2001/XMLSchema-instance"
	xs:schemaLocation="http://www.wolfcode.cn contacts.xsd">
```
> contacts.xsd 约束文件

```
<?xml version="1.0" encoding="UTF-8" ?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" 
			targetNamespace="http://www.wolfcode.cn" 
			elementFormDefault="qualified">
	<xs:element name="contacts">
		<xs:complexType>
			<xs:sequence maxOccurs='unbounded'>
				<xs:element name="linkman">
					<xs:complexType>
						<xs:sequence>
							<xs:element name='name' type='xs:string' />
							<xs:element name='email' type='xs:string' />
							<xs:element name='address' type='xs:string' />
							<xs:element name='group' type='xs:string' />
						</xs:sequence>
						<xs:attribute name="id" type="xs:long" use="required" />
					</xs:complexType>
				</xs:element>
			</xs:sequence>
		</xs:complexType>
	</xs:element>
</xs:schema>


-------------------------------------------------------------------------------------------

在contacts.xml中引入schama:

```

## XML文档结构分析

说明 | 解释
---|---
Document | 文档节点(整个文件)
Elements | 元素节点(<>标签)
Attr     | 属性节点(元素上面的属性名=属性值);
Text     | 元素之间的内容


## 使用Java的Dom解析XML文件的几个练习 	
```
    @Test
	public void testDemo1() throws Exception {
		/*●需求1、得到某个具体的文本节点的内容: 取出第二个联系人的名字.
		*/
		File file = new File("contacts.xml");
		// 1: 获得document对象
		Document docuement = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(file);
		// 2: 获得root元素
		Element root = docuement.getDocumentElement();
		// 3: 获得linkman标签的第二个
		Element linkman = (Element) root.getElementsByTagName("linkman").item(2);
		// 4: 获得名字的Content
		Node name = linkman.getElementsByTagName("name").item(0);
		// 打印 
		System.out.println(name.getTextContent());
	}
	
```
```
	@Test
	public void testDemo2() throws Exception {
		/* DOM练习2
		需求1、得到某个元素节点的:  把第一个联系人的的邮箱改掉.*/
		// 1: 获得Document 对象 
		File file = new File("contacts.xml");
		Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(file);
		// 2: 获得root元素
		Element root = document.getDocumentElement();
		// 3: 获得第一个linkman元素
		Element linkman = (Element) root.getElementsByTagName("linkman").item(0);
		// 4: 获得第一个linkman的email 标签
		Element email = (Element) linkman.getElementsByTagName("email").item(0);
		// 5: 给email标签设置值
		email.setTextContent("刚设置的邮箱@173.com");
		// 6: 同步
		Transformer newTransformer = TransformerFactory.newInstance().newTransformer();
		Source xmlSource = new DOMSource(document);
		Result outputTarget = new StreamResult(file);

		newTransformer.transform(xmlSource, outputTarget);

	}
```
```
	@Test
	public void testDemo3() throws Exception {

		/*	●需求4、操作XML元素属性：设置/获取第三个联系人的id属性为4.  */
		// 1:  莉document对象 
		File file = new File("contacts.xml");
		Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(file);
		// 2:  获得root元素
		Element root = document.getDocumentElement();
		// 3:  获得第三个linkman
		Element linkman = (Element) root.getElementsByTagName("linkman").item(2);
		// 4:  给第三个linkman设置属性
		linkman.setAttribute("id", "4");
		// 5:  同步
		Transformer newTransformer = TransformerFactory.newInstance().newTransformer();
		Source xmlSource = new DOMSource(document);
		Result outputTarget = new StreamResult(file);

		newTransformer.transform(xmlSource, outputTarget);

	}
```
```
	@Test
	public void testDemo5() throws Exception {
		/*	●需求5、删除指定元素节点：删除第三个联系人信息.  */
		// 1:  获得document对象 
		File file = new File("contacts.xml");
		Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(file);
		// 2:   获得root元素
		Element root = document.getDocumentElement();
		// 3:  获得第三个linkman标签
		Element linkman = (Element) root.getElementsByTagName("linkman").item(2);
		// 4:  使用root根元素删除获得的linkman标签
		root.removeChild(linkman);
		// 5:  同步
		Transformer newTransformer = TransformerFactory.newInstance().newTransformer();
		Source xmlSource = new DOMSource(document);
		Result outputTarget = new StreamResult(file);
		newTransformer.transform(xmlSource, outputTarget);

	}
```
```
	@Test
	public void testDemo6() throws Exception {

		/*    
		 * 创建一个document对象(	
		2.创建根标签(根元素/根节点)
		3.创建linkman/name/email/address/group标签
		4.给name/email/address/group标签设置文本内容
		5.给name/email/address/group标签、linkman标签和根标签建立层级关系
		6.同步操作),将它写入到contacts.xml, 
		*/
		// 1: 先判断文件是否存在 如果存在的话,直接获得document对象, 获得根节点,
		File file = new File("contacts.xml");
		DocumentBuilder newDocumentBuilder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
		Document document = null;
		Element root = null; // 
		if (file.exists()) {
			document = newDocumentBuilder.parse(file);
			root = document.getDocumentElement();

		} else {
			file.createNewFile();
			//创建Document
			document = newDocumentBuilder.newDocument();
			// root节点
			root = document.createElement("contacts");
			document.appendChild(root);
		}
		// 获得linkman元素
		Element linkman = document.createElement("linkman");
		// 将linkman到root
		root.appendChild(linkman);
		//  创建linkman的子节点
		Element name = document.createElement("name");
		Element email = document.createElement("email");
		Element address = document.createElement("address");
		Element group = document.createElement("group");

		// 给子节点设置值
		name.setTextContent("灰太狼");
		email.setTextContent("灰太狼@163.com");
		address.setTextContent("广州");
		group.setTextContent("狼堡");
		// 让dom和和linkman 和linkman的子节点相关联
		linkman.appendChild(name);
		linkman.appendChild(email);
		linkman.appendChild(address);
		linkman.appendChild(group);
		//	同步操作
		Transformer newTransformer = TransformerFactory.newInstance().newTransformer();
		Source xmlSource = new DOMSource(document);
		Result outputTarget = new StreamResult(file);
		newTransformer.transform(xmlSource, outputTarget);
	}
```
## ==使用dom解析xml文件创建对象==
```
@Test // 使用Dom解析常见对象,然后把对象 放在集合中去
	public void testCreatePersonList() throws Exception {
		File file = new File("contacts.xml");
		List<Person> list = new ArrayList<>();
		//获得document对象 
		Document document = DocumentBuilderFactory.newInstance().newDocumentBuilder().parse(file);
		//获得根root
		Element root = document.getDocumentElement();
		// 获得linkman元素
		NodeList linkManList = root.getElementsByTagName("linkman");
		// 遍历linkman
		for (int i = 0; i < linkManList.getLength(); i++) {
			Person person = new Person();
			list.add(person);
			Node node = linkManList.item(i); // 得到第一个linkman
			person.setId(Integer.parseInt(node.getAttributes().getNamedItem("id").getNodeValue()));
			NodeList linkman = node.getChildNodes(); // 获得linkman标签下面的所有子元素
			for (int j = 0; j < linkman.getLength(); j++) {
				// 遍历linkman的所有子元素
				// 判断元素的名字然后给person设置值
				Node eleOfLinkMan  = linkman.item(j);
				if ("name".equals(eleOfLinkMan.getNodeName())) {

					person.setName(eleOfLinkMan.getFirstChild().getNodeValue());

				}
				if ("email".equals(eleOfLinkMan.getNodeName())) {

					person.setEmail(eleOfLinkMan.getFirstChild().getNodeValue());

				}
				if ("address".equals(eleOfLinkMan.getNodeName())) {

					person.setAddress(eleOfLinkMan.getFirstChild().getNodeValue());

				}
				if ("group".equals(eleOfLinkMan.getNodeName())) {

					person.setGroup(eleOfLinkMan.getFirstChild().getNodeValue());
				}
			}

			System.out.println(person);
		}

	}

```


## 总结Dom的常用方法

#### Document中的方法:
1.  Element getDocumentElement() :获取文档的根元素
= Element getElementById(String elementId) :根据元素的id属性值,获取一个元素对象.(有约束才可以用)
2. NodeList getElementsByTagName(String tagName) :根据元素的名称获取多个元素对象集合,从整个文档中去寻找
3. Element createElement(String tagName) :根据元素名称,创建元素对象

 #### Element中的方法:
1.  NodeList getElementsByTagName(String tagName) :根据元素的名称获取多个元素对象集合,从当前元素的子元素中去寻找.
2. String getAttribute(String name) :获取当前元素的指定属性的值
3. void setAttribute(String name, String value) :给当前元素设置指定的属性名称和值.

 #### Node中的方法:
1.  String getTextContent() :获取当前元素的文本内容
2.  void setTextContent(String textContent):给当前元素设置新的文本内容
3.   Node appendChild(Node newChild) :给当前元素设置一个子元素
4. Node removeChild(Node oldChild) :删除当前元素中的指定一个子元素




