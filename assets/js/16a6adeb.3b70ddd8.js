"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5718],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var i=r.createContext({}),u=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(i.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=u(n),f=o,y=m["".concat(i,".").concat(f)]||m[f]||s[f]||a;return n?r.createElement(y,l(l({ref:t},p),{},{components:n})):r.createElement(y,l({ref:t},p))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=m;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:o,l[1]=c;for(var u=2;u<a;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},735:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return i},metadata:function(){return u},assets:function(){return p},toc:function(){return s},default:function(){return f}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),l=["components"],c={slug:"sync-system-time",title:"linux\u670d\u52a1\u5668\u65f6\u95f4\u540c\u6b65",authors:["jeesk"],tags:["linux"]},i=void 0,u={permalink:"/devops/sync-system-time",source:"@site/devops/2021-08-26-sync-system-time.md",title:"linux\u670d\u52a1\u5668\u65f6\u95f4\u540c\u6b65",description:">  \u6700\u8fd1\u53d1\u73b0\u81ea\u5df1\u7684\u670d\u52a1\u5668\u65f6\u95f4\u53d8\u6210\u4e86 EDT , \u8fd9\u4e2a\u662f\u7f8e\u56fd\u4e1c\u90e8\u590f\u4ee4\u65f6\u95f4. \u90a3\u4e48\u5982\u4f55\u5c06\u670d\u52a1\u5668\u7684\u65f6\u95f4\u53d8\u6210\u4e2d\u56fd\u7684\u65f6\u95f4,\u5e76\u4e14\u540c\u6b65\u5462.",date:"2021-08-26T00:00:00.000Z",formattedDate:"August 26, 2021",tags:[{label:"linux",permalink:"/devops/tags/linux"}],readingTime:.935,truncated:!1,authors:[{name:"jeesk",title:"java engineer",url:"https://shanjiancaofu.com",imageURL:"https://shanjiancaofu.com/img/avtor.png",key:"jeesk"}],frontMatter:{slug:"sync-system-time",title:"linux\u670d\u52a1\u5668\u65f6\u95f4\u540c\u6b65",authors:["jeesk"],tags:["linux"]},nextItem:{title:"redis\u5728\u751f\u4ea7\u73af\u5883\u7684\u914d\u7f6e",permalink:"/devops/redis-production-config"}},p={authorsImageUrls:[void 0]},s=[],m={toc:s};function f(e){var t=e.components,n=(0,o.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("blockquote",null,(0,a.kt)("blockquote",{parentName:"blockquote"},(0,a.kt)("p",{parentName:"blockquote"}," \u6700\u8fd1\u53d1\u73b0\u81ea\u5df1\u7684\u670d\u52a1\u5668\u65f6\u95f4\u53d8\u6210\u4e86 EDT , \u8fd9\u4e2a\u662f\u7f8e\u56fd\u4e1c\u90e8\u590f\u4ee4\u65f6\u95f4. \u90a3\u4e48\u5982\u4f55\u5c06\u670d\u52a1\u5668\u7684\u65f6\u95f4\u53d8\u6210\u4e2d\u56fd\u7684\u65f6\u95f4,\u5e76\u4e14\u540c\u6b65\u5462."))),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"\u5b89\u88c5 centos \u7684\u65f6\u95f4\u540c\u6b65\u5de5\u5177")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"yum -y install ntp\n")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"\u5982\u679c\u673a\u5668\u7684\u65f6\u533a\u4e0d\u662f\u4e2d\u56fd\u65f6\u533a\u9700\u8981\u91cd\u65b0\u8bbe\u7f6e\u65f6\u533a")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"mv /etc/localtime /etc/localtime.bak\nln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime\n")),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"\u6267\u884c\u540c\u6b65\u547d\u4ee4")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"\u540c\u6b65\u6dd8\u5b9d\u7684\u65f6\u95f4\u670d\u52a1\nntpdate ntp1.aliyun.com \n")),(0,a.kt)("ol",{start:4},(0,a.kt)("li",{parentName:"ol"},"\u4fee\u6539\u670d\u52a1\u5668\u6620\u5c04\u5230\u6211\u4eec\u7cfb\u7edf\u7684\u65f6\u95f4\uff0cok\uff1b")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"hwclock --systohc\n")),(0,a.kt)("ol",{start:5},(0,a.kt)("li",{parentName:"ol"},"\u589e\u52a0\u5b9a\u65f6\u4efb\u52a1\u540c\u6b65\u65f6\u95f4")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"crontab -e  \u8fdb\u5165\u5b9a\u65f6\u4efb\u52a1 ,  \u6bcf\u969410\u5206\u949f\u540c\u6b65\u4e00\u6b21\u7cfb\u7edf\u65f6\u95f4\n*/10 * * * *  /usr/sbin/ntpdate  ntp1.aliyun.com  \n")),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"}," \u8def\u8fc7\u70b9\u8d5e, \u6708\u85aa10W")))}f.isMDXComponent=!0}}]);