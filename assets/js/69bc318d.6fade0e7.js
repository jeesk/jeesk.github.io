"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4870],{3905:function(e,t,r){r.d(t,{Zo:function(){return c},kt:function(){return m}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),s=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},c=function(e){var t=s(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},f=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),f=s(r),m=a,v=f["".concat(u,".").concat(m)]||f[m]||p[m]||o;return r?n.createElement(v,l(l({ref:t},c),{},{components:r})):n.createElement(v,l({ref:t},c))}));function m(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,l=new Array(o);l[0]=f;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var s=2;s<o;s++)l[s]=r[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},2462:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return i},contentTitle:function(){return u},metadata:function(){return s},assets:function(){return c},toc:function(){return p},default:function(){return m}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),l=["components"],i={slug:"webflux-vs-servlet3.0-pressure-test",title:"webflux,kakfa,redis,protostuff \u541e\u5410\u91cf\u4f18\u5316\u8fd14000QPS",authors:["jeesk"],tags:["java","webflux","servlet"]},u=void 0,s={permalink:"/java/webflux-vs-servlet3.0-pressure-test",source:"@site/java/2019-03-04-webflux-vs-servlet-pressure-test.md",title:"webflux,kakfa,redis,protostuff \u541e\u5410\u91cf\u4f18\u5316\u8fd14000QPS",description:"__",date:"2019-03-04T00:00:00.000Z",formattedDate:"March 4, 2019",tags:[{label:"java",permalink:"/java/tags/java"},{label:"webflux",permalink:"/java/tags/webflux"},{label:"servlet",permalink:"/java/tags/servlet"}],readingTime:1.195,truncated:!1,authors:[{name:"jeesk",title:"java engineer",url:"https://shanjiancaofu.com",imageURL:"https://shanjiancaofu.com/img/avtor.png",key:"jeesk"}],frontMatter:{slug:"webflux-vs-servlet3.0-pressure-test",title:"webflux,kakfa,redis,protostuff \u541e\u5410\u91cf\u4f18\u5316\u8fd14000QPS",authors:["jeesk"],tags:["java","webflux","servlet"]},prevItem:{title:"kafka\u6d88\u606f\u987a\u5e8f\u4fdd\u6301\u4e00\u81f4\u6027\u7684\u5904\u7406\u65b9\u5f0f",permalink:"/java/kafka-msg-keep-ordered"},nextItem:{title:"java \u6027\u80fd\u4f18\u5316\u7b14\u8bb0",permalink:"/java/java-opt-note"}},c={authorsImageUrls:[void 0]},p=[],f={toc:p};function m(e){var t=e.components,i=(0,a.Z)(e,l);return(0,o.kt)("wrapper",(0,n.Z)({},f,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"__"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"\u5728\u865a\u62df\u673a 8c32g  ,\u4e00\u4e2atomcat \u5b9e\u73b0400~500 \u7684\u5e76\u53d1, 3000QPS \u5df2\u7ecf\u5feb\u662f\u6781\u9650, \u7531\u4e8e\u662f\u963b\u585e\u5f0f\u7f16\u7a0b, \u5bfc\u81f4\u54cd\u5e94\u65f6\u957f\u7684\u7684\u5747\u503c\u548c\u6700\u503c\u5dee\u8ddd\u76f8\u5f53\u7684\u5927.  \u901a\u8fc7webflux \u53ef\u4ee5\u589e\u52a0\u5e76\u53d1\u91cf, \u540c\u65f6\u541e\u5410\u91cf\u6709\u6240\u6539\u5584.")),(0,o.kt)("p",null,"\u4e0b\u9762\u662f\u901a\u8fc7jvm \u8c03\u4f18\u540e, \u4e0d\u540c\u7684web\u67b6\u6784\u7684\u538b\u529b\u6d4b\u8bd5\u56fe.\n\u673a\u5668:  \u5185\u7f51\u4e0b 8c32g\u865a\u62df\u673a , 1\u53f0\u538b\u6d4b\u673a\u5668, 1\u53f0\u670d\u52a1.  \u5c5e\u4e8e\u76f4\u8fde\u538b\u6d4b, \u672a\u7ecf\u8fc7\u7f51\u5173.\n\u4e0b\u9762\u662f\u538b\u6d4b\u7ed3\u679c.\n",(0,o.kt)("img",{alt:"img.png",src:r(9289).Z,width:"1200",height:"437"})),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"webflux \u7684\u541e\u5410\u91cf \u9ad8\u4e8e\u4f20\u7edfservlet \u7684\u540c\u6b65io,\u5927\u7ea6\u5728 %10~15\u7684\u6548\u679c"),(0,o.kt)("li",{parentName:"ol"},"webflux  \u7684\u8017\u65f6\u76f8\u5bf9\u4e8e\u4f20\u7edfservlet\u66f4\u52a0\u5747\u5300"),(0,o.kt)("li",{parentName:"ol"},"\u8017\u65f6\u6539\u5584\u4e0d\u5c11.")),(0,o.kt)("p",null,"\u603b\u4f53\u6765\u8bf4, \u5168\u5f02\u6b65\u7684webflux \u786e\u5b9e\u6bd4\u4f20\u7edf\u7684servlet  \u8981\u4f18\u79c0\u4e0d\u5c11."),(0,o.kt)("p",null,"jvm \u8c03\u4f18\u53c2\u6570\u76f8\u5173  \u4f7f\u7528g1\u5783\u573e\u5783\u573e\u56de\u6536,\u6bd4\u8f83\u6fc0\u8fdb. \u5bf9\u4e8ewebflux \u6765\u8bf4\u6548\u679c\u4f18\u5316\u7279\u522b\u597d."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"--server.port=8081 -Xms8g -Xmx8g -Xmn4g -XX:+UseG1GC -XX:G1HeapRegionSize=16m -XX:G1ReservePercent=25 -XX:InitiatingHeapOccupancyPercent=30 -XX:+UseGCLogFileRotation -XX:NumberOfGCLogFiles=5 -XX:GCLogFileSize=30m -Xloggc:/dev/shm/mq_gc_%mxs.log\n")))}m.isMDXComponent=!0},9289:function(e,t,r){t.Z=r.p+"assets/images/img-9a42c4e1ae2b1142949c1ce32753ed07.png"}}]);