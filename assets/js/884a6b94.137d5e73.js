"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[5862],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var i=a.createContext({}),u=function(e){var t=a.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},c=function(e){var t=u(e.components);return a.createElement(i.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},p=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,c=s(e,["components","mdxType","originalType","parentName"]),p=u(n),m=r,h=p["".concat(i,".").concat(m)]||p[m]||d[m]||o;return n?a.createElement(h,l(l({ref:t},c),{},{components:n})):a.createElement(h,l({ref:t},c))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,l=new Array(o);l[0]=p;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,l[1]=s;for(var u=2;u<o;u++)l[u]=n[u];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},6669:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return i},metadata:function(){return u},assets:function(){return c},toc:function(){return d},default:function(){return m}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),l=["components"],s={slug:"elasticsearch-user-rtb-ad",title:"Elasticsearch \u5728\u7ade\u4ef7\u5e7f\u544a\u4e2d\u7684\u68c0\u7d22\u4f7f\u7528",tags:["elasticsearch","rtb-ad"],authors:["jeesk"]},i=void 0,u={permalink:"/java/elasticsearch-user-rtb-ad",source:"@site/java/2022-02-05-elasticsearch-user-rtb-ad.md",title:"Elasticsearch \u5728\u7ade\u4ef7\u5e7f\u544a\u4e2d\u7684\u68c0\u7d22\u4f7f\u7528",description:"Elasticsearch \u5728\u7ade\u4ef7\u5e7f\u544a\u4e2d\u7684\u68c0\u7d22\u4f7f\u7528",date:"2022-02-05T00:00:00.000Z",formattedDate:"February 5, 2022",tags:[{label:"elasticsearch",permalink:"/java/tags/elasticsearch"},{label:"rtb-ad",permalink:"/java/tags/rtb-ad"}],readingTime:6.125,truncated:!1,authors:[{name:"jeesk",title:"java engineer",url:"https://shanjiancaofu.com",imageURL:"https://shanjiancaofu.com/img/avtor.png",key:"jeesk"}],frontMatter:{slug:"elasticsearch-user-rtb-ad",title:"Elasticsearch \u5728\u7ade\u4ef7\u5e7f\u544a\u4e2d\u7684\u68c0\u7d22\u4f7f\u7528",tags:["elasticsearch","rtb-ad"],authors:["jeesk"]},prevItem:{title:"java \u6e90\u7801\u5206\u6790",permalink:"/java/java \u6e90\u7801\u5206\u6790"},nextItem:{title:"Java BiO\u548cNIO\u7684\u533a\u522b",permalink:"/java/java-bio-diffrent-from-nio"}},c={authorsImageUrls:[void 0]},d=[{value:"Elasticsearch \u5728\u7ade\u4ef7\u5e7f\u544a\u4e2d\u7684\u68c0\u7d22\u4f7f\u7528",id:"elasticsearch-\u5728\u7ade\u4ef7\u5e7f\u544a\u4e2d\u7684\u68c0\u7d22\u4f7f\u7528",children:[{value:"\u4e00\u3001\u5e7f\u544a\u5b9a\u5411\u7b80\u8ff0",id:"\u4e00\u5e7f\u544a\u5b9a\u5411\u7b80\u8ff0",children:[{value:"1.1 \u5728\u7ade\u4ef7\u5e7f\u544a\u4e2d\u7684\u5b9a\u5411\u6761\u4ef6\u5f80\u5f80\u5982\u4e0b\u6240\u793a",id:"11-\u5728\u7ade\u4ef7\u5e7f\u544a\u4e2d\u7684\u5b9a\u5411\u6761\u4ef6\u5f80\u5f80\u5982\u4e0b\u6240\u793a",children:[],level:4},{value:"1.2  \u89d2\u8272\u5bf9\u5e94\u5e7f\u544a\u5206\u6790",id:"12--\u89d2\u8272\u5bf9\u5e94\u5e7f\u544a\u5206\u6790",children:[],level:4},{value:"1.3.  \u8ba4\u771f\u5206\u6790\u540e\u5f97\u51fa\u4e0b\u9762\u6bcf\u4e2a\u89d2\u8272\u53ef\u4ee5\u63a8\u9001\u7684\u5e7f\u544a\u5982\u4e0b",id:"13--\u8ba4\u771f\u5206\u6790\u540e\u5f97\u51fa\u4e0b\u9762\u6bcf\u4e2a\u89d2\u8272\u53ef\u4ee5\u63a8\u9001\u7684\u5e7f\u544a\u5982\u4e0b",children:[],level:4}],level:3},{value:"\u4e8c\u3001\u4f7f\u7528elasticsearch \u67e5\u8be2\u5b9e\u65f6\u67e5\u8be2\u5e7f\u544a",id:"\u4e8c\u4f7f\u7528elasticsearch-\u67e5\u8be2\u5b9e\u65f6\u67e5\u8be2\u5e7f\u544a",children:[{value:"2.1.   mysql\u4e2d, \u5982\u679c\u8981\u67e5\u8be2\u67d0\u4e2a\u7528\u6237\u6ee1\u8db3\u7684\u5e7f\u544a\u6761\u4ef6\u5982\u4e0b\u53ef\u6574\u7406\u4e3a\u8868\u8fbe\u5f0f",id:"21---mysql\u4e2d-\u5982\u679c\u8981\u67e5\u8be2\u67d0\u4e2a\u7528\u6237\u6ee1\u8db3\u7684\u5e7f\u544a\u6761\u4ef6\u5982\u4e0b\u53ef\u6574\u7406\u4e3a\u8868\u8fbe\u5f0f",children:[],level:4},{value:"2.2  \u51c6\u5907\u5de5\u5177:  postman \u6216\u8005\u652f\u6301curl\u547d\u4ee4\u884c, \u4e00\u53f0\u5b89\u88c5\u4e86docker\u7684\u673a\u5668",id:"22--\u51c6\u5907\u5de5\u5177--postman-\u6216\u8005\u652f\u6301curl\u547d\u4ee4\u884c-\u4e00\u53f0\u5b89\u88c5\u4e86docker\u7684\u673a\u5668",children:[{value:"2.2.1\t\u62c9\u53d6es\u955c\u50cf,\u5e76\u4e14\u8fd0\u884c\u8d77\u6765",id:"221\u62c9\u53d6es\u955c\u50cf\u5e76\u4e14\u8fd0\u884c\u8d77\u6765",children:[],level:5},{value:"2.2.2    \u6267\u884c\u547d\u4ee4",id:"222----\u6267\u884c\u547d\u4ee4",children:[],level:5}],level:4},{value:"2.3.  \u5efa\u7acb\u5e7f\u544a\u7d22\u5f15,\u67e5\u8be2\u5e7f\u544a\u4f4d\u5bf9\u5e94\u5e7f\u544a",id:"23--\u5efa\u7acb\u5e7f\u544a\u7d22\u5f15\u67e5\u8be2\u5e7f\u544a\u4f4d\u5bf9\u5e94\u5e7f\u544a",children:[],level:4}],level:3},{value:"\u4e09\u3001\u5c0f\u7ed3",id:"\u4e09\u5c0f\u7ed3",children:[],level:3}],level:2}],p={toc:d};function m(e){var t=e.components,n=(0,r.Z)(e,l);return(0,o.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"elasticsearch-\u5728\u7ade\u4ef7\u5e7f\u544a\u4e2d\u7684\u68c0\u7d22\u4f7f\u7528"},"Elasticsearch \u5728\u7ade\u4ef7\u5e7f\u544a\u4e2d\u7684\u68c0\u7d22\u4f7f\u7528"),(0,o.kt)("h3",{id:"\u4e00\u5e7f\u544a\u5b9a\u5411\u7b80\u8ff0"},"\u4e00\u3001\u5e7f\u544a\u5b9a\u5411\u7b80\u8ff0"),(0,o.kt)("h4",{id:"11-\u5728\u7ade\u4ef7\u5e7f\u544a\u4e2d\u7684\u5b9a\u5411\u6761\u4ef6\u5f80\u5f80\u5982\u4e0b\u6240\u793a"},"1.1 \u5728\u7ade\u4ef7\u5e7f\u544a\u4e2d\u7684\u5b9a\u5411\u6761\u4ef6\u5f80\u5f80\u5982\u4e0b\u6240\u793a"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"ad1  \u5b9a\u5411\u4e3a\u5730\u57df\u5317\u4eac,\u4e0a\u6d77,\u5e7f\u5dde,\u6df1\u5733,18~28\u5c81\u7684\u65c5\u6e38,\u5065\u8eab\u884c\u4e1a\u7537\u6027,\u5e76\u4e14\u8981\u6c42\u9002\u7528\u7684\u64cd\u4f5c\u7cfb\u7edf\u4e3aios,android,\u5e7f\u544a\u51fa\u4ef75\u5757"),(0,o.kt)("li",{parentName:"ul"},"ad2  \u5b9a\u5411\u4e3a\u5730\u57df\u6210\u90fd\u572818~28\u5c81\u7684\u5065\u8eab\u884c\u4e1a\u7537\u6027,\u5e76\u4e14\u8981\u6c42\u9002\u7528\u7684\u64cd\u4f5c\u7cfb\u7edf\u4e3aios\u548cmac,\u5e7f\u544a\u51fa\u4ef74.8\u5757"),(0,o.kt)("li",{parentName:"ul"},"ad3  \u5b9a\u5411\u4e3a\u572828~38\u5c81\u7684\u7537\u6027,\u5e76\u4e14\u8981\u6c42\u9002\u7528\u7684\u64cd\u4f5c\u7cfb\u7edf\u4e3aandroid,\u5e7f\u544a\u51fa\u4ef75.7\u5757"),(0,o.kt)("li",{parentName:"ul"},"ad4  \u5b9a\u5411\u4e3a\u572828~38\u5c81,\u5e76\u4e14\u8981\u6c42\u9002\u7528\u7684\u64cd\u4f5c\u7cfb\u7edf\u4e3aios,\u5e7f\u544a\u51fa\u4ef75.2\u5757")),(0,o.kt)("h4",{id:"12--\u89d2\u8272\u5bf9\u5e94\u5e7f\u544a\u5206\u6790"},"1.2  \u89d2\u8272\u5bf9\u5e94\u5e7f\u544a\u5206\u6790"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u89d2\u82721:     \u5317\u4eac,\u5973\u6027,\u5065\u8eab\u884c\u4e1a,\u64cd\u4f5c\u7cfb\u7edfios"),(0,o.kt)("li",{parentName:"ul"},"\u89d2\u82722:     \u5e7f\u5dde,\u7537\u6027,18~28\u5c81,\u65c5\u6e38\u884c\u4e1a,\u64cd\u4f5c\u7cfb\u7edf\u4e3aios"),(0,o.kt)("li",{parentName:"ul"},"\u89d2\u82723:     \u6210\u90fd,\u5973\u6027,28~38\u5c81,\u5065\u8eab\u884c\u4e1a,\u64cd\u4f5c\u7cfb\u7edf\u4e3aios"),(0,o.kt)("li",{parentName:"ul"},"\u89d2\u82724:     \u6210\u90fd,\u7537\u6027,28~38\u5c81,\u5065\u8eab\u884c\u4e1a,\u64cd\u4f5c\u7cfb\u7edf\u4e3aios")),(0,o.kt)("h4",{id:"13--\u8ba4\u771f\u5206\u6790\u540e\u5f97\u51fa\u4e0b\u9762\u6bcf\u4e2a\u89d2\u8272\u53ef\u4ee5\u63a8\u9001\u7684\u5e7f\u544a\u5982\u4e0b"},"1.3.  \u8ba4\u771f\u5206\u6790\u540e\u5f97\u51fa\u4e0b\u9762\u6bcf\u4e2a\u89d2\u8272\u53ef\u4ee5\u63a8\u9001\u7684\u5e7f\u544a\u5982\u4e0b"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"\u89d2\u82721:  ad4"),(0,o.kt)("li",{parentName:"ul"},"\u89d2\u82722:  ad1,ad4"),(0,o.kt)("li",{parentName:"ul"},"\u89d2\u82723:  ad4"),(0,o.kt)("li",{parentName:"ul"},"\u89d2\u82724:  ad2,ad4")),(0,o.kt)("p",null,"\u5f80\u5f80\u4f20\u7edf\u6570\u636e\u5e93\u65e0\u6cd5\u6ee1\u8db3\u4e0a\u8ff0\u7684\u67e5\u8be2\u65f6\u5ef6, \u5927\u5382\u5f80\u5f80\u53c8\u5f00\u53d1\u81ea\u5df1\u7684\u5012\u6392\u7d22\u5f15\u7cfb\u7edf, \u4e3a\u4e86\u51cf\u5c11\u6210\u672c, \u53ef\u4ee5\u4f7f\u7528elasticsearch\u7684\u5e03\u5c14\u67e5\u8be2."),(0,o.kt)("h3",{id:"\u4e8c\u4f7f\u7528elasticsearch-\u67e5\u8be2\u5b9e\u65f6\u67e5\u8be2\u5e7f\u544a"},"\u4e8c\u3001\u4f7f\u7528elasticsearch \u67e5\u8be2\u5b9e\u65f6\u67e5\u8be2\u5e7f\u544a"),(0,o.kt)("h4",{id:"21---mysql\u4e2d-\u5982\u679c\u8981\u67e5\u8be2\u67d0\u4e2a\u7528\u6237\u6ee1\u8db3\u7684\u5e7f\u544a\u6761\u4ef6\u5982\u4e0b\u53ef\u6574\u7406\u4e3a\u8868\u8fbe\u5f0f"},"2.1.   mysql\u4e2d, \u5982\u679c\u8981\u67e5\u8be2\u67d0\u4e2a\u7528\u6237\u6ee1\u8db3\u7684\u5e7f\u544a\u6761\u4ef6\u5982\u4e0b\u53ef\u6574\u7406\u4e3a\u8868\u8fbe\u5f0f"),(0,o.kt)("p",null,"[\uff08\u4e0d\u5b58\u5728\u6027\u522b\u5b9a\u5411\uff09|| \uff08\u5b58\u5728\u6027\u522b\u5b9a\u5411\u4e14\u6ee1\u8db3\u6761\u4ef6\uff09]",(0,o.kt)("br",{parentName:"p"}),"\n","&&  ","[\uff08\u4e0d\u5b58\u5728\u5e74\u9f84\u5b9a\u5411\uff09|| \uff08\u5b58\u5728\u5e74\u9f84\u5b9a\u5411\u4e14\u6ee1\u8db3\u6761\u4ef6\uff09]","\n&&  ","[\uff08\u4e0d\u5b58\u5728\u6807\u7b7e\u5b9a\u5411\uff09|| \uff08\u5b58\u5728\u6807\u7b7e\u5b9a\u5411\u4e14\u6ee1\u8db3\u6761\u4ef6\uff09]","\n&&  ","[\uff08\u4e0d\u5b58\u5728\u5730\u57df\u5b9a\u5411\uff09|| \uff08\u5b58\u5728\u5730\u57df\u5b9a\u5411\u4e14\u6ee1\u8db3\u6761\u4ef6\uff09]","\n&&  ","[\uff08\u4e0d\u5b58\u5728\u64cd\u4f5c\u7cfb\u7edf\u5b9a\u5411\uff09|| \uff08\u5b58\u5728\u64cd\u4f5c\u7cfb\u7edf\u5b9a\u5411\u4e14\u6ee1\u8db3\u6761\u4ef6\uff09]"),(0,o.kt)("h4",{id:"22--\u51c6\u5907\u5de5\u5177--postman-\u6216\u8005\u652f\u6301curl\u547d\u4ee4\u884c-\u4e00\u53f0\u5b89\u88c5\u4e86docker\u7684\u673a\u5668"},"2.2  \u51c6\u5907\u5de5\u5177:  postman \u6216\u8005\u652f\u6301curl\u547d\u4ee4\u884c, \u4e00\u53f0\u5b89\u88c5\u4e86docker\u7684\u673a\u5668"),(0,o.kt)("h5",{id:"221\u62c9\u53d6es\u955c\u50cf\u5e76\u4e14\u8fd0\u884c\u8d77\u6765"},"2.2.1\t\u62c9\u53d6es\u955c\u50cf,\u5e76\u4e14\u8fd0\u884c\u8d77\u6765"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},'docker pull docker.io/elasticsearch:7.1.1\ndocker run -d --name es1  -e ES_JAVA_OPTS="-Xms512m -Xmx512m" -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" b0e9f9f047e6\n')),(0,o.kt)("h5",{id:"222----\u6267\u884c\u547d\u4ee4"},"2.2.2    \u6267\u884c\u547d\u4ee4"),(0,o.kt)("p",null,"postman\u6216\u8005\u547d\u4ee4\u884c\u4e2d\u6267\u884c ",(0,o.kt)("inlineCode",{parentName:"p"},"curl --location --request GET 'http://192.168.17.77:9200'")),(0,o.kt)("p",null,"\u5982\u679c\u8fd4\u56de\u4e0b\u9762\u7684\u6587\u6863\u8bf4\u660e\u4f60\u5b89\u88c5\u5355\u673a\u7248\u672c\u7684elasticsearch\u5df2\u7ecf\u5b89\u88c5\u5b8c\u6210"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "name": "cc51cc2a79ce",\n    "cluster_name": "docker-cluster",\n    "cluster_uuid": "BveCHkuVTtWwr-rcWDmTpg",\n    "version": {\n        "number": "7.1.1",\n        "build_flavor": "default",\n        "build_type": "docker",\n        "build_hash": "7a013de",\n        "build_date": "2019-05-23T14:04:00.380842Z",\n        "build_snapshot": false,\n        "lucene_version": "8.0.0",\n        "minimum_wire_compatibility_version": "6.8.0",\n        "minimum_index_compatibility_version": "6.0.0-beta1"\n    },\n    "tagline": "You Know, for Search"\n}\n')),(0,o.kt)("h4",{id:"23--\u5efa\u7acb\u5e7f\u544a\u7d22\u5f15\u67e5\u8be2\u5e7f\u544a\u4f4d\u5bf9\u5e94\u5e7f\u544a"},"2.3.  \u5efa\u7acb\u5e7f\u544a\u7d22\u5f15,\u67e5\u8be2\u5e7f\u544a\u4f4d\u5bf9\u5e94\u5e7f\u544a"),(0,o.kt)("p",null,"\u901a\u5e38\u7528\u6237\u8bbf\u95eeapp\u62c9\u53d6\u5e7f\u544a\u662f\u4ee5\u5e7f\u544a\u4f4d\u4e3a\u57fa\u51c6, \u8be5\u5e7f\u544a\u4f4d\u4e0b\u9762\u6709n\u4e2a\u5e26\u6709\u5b9a\u5411\u6761\u4ef6\u7684\u5e7f\u544a.\u90a3\u4e48 \u67e5\u8be2\u6761\u4ef6\u5c31\u662f\u5e7f\u544a\u4f4did,\u5e95\u4ef7+\u4ee5\u53ca\u7528\u6237\u81ea\u8eab\u7684\u5c5e\u6027"),(0,o.kt)("p",null,"\u521b\u5efa\u5e7f\u544a\u4f4did\u4e3a100\u7684\u7d22\u5f15"),(0,o.kt)("p",null,(0,o.kt)("inlineCode",{parentName:"p"},"curl --location --request PUT 'http://192.168.17.77:9200/posfor100'")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"\u589e\u52a0\u8be5\u7d22\u5f15\u5bf9\u5e94\u7684\u6570\u636e(\u7c7b\u578b\u4e8emysql\u7684\u884c\u6570\u636e)")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"\u5317\u4e0a\u5e7f\u6df1,\u6210\u90fd\u5206\u522b\u6620\u5c04\u4e3a 1,2,3,4,5\n\u7537\u5973\u6620\u5c04\u4e3a1,2\n\u64cd\u4f5c\u7cfb\u7edfios, android,mac \u6620\u5c04\u4e3a1,2,3  \n\u884c\u4e1a\u65c5\u6e38,\u5065\u8eab\u5206\u522b\u6620\u5c04\u4e3a 1,2 \n\u5e74\u9f8418~28 \u6620\u5c04\u4e3a2\n")),(0,o.kt)("p",null,"\u63d2\u5165\u5bf9\u5e94\u76844\u6761\u6570\u636e,\u5047\u8bbe\u4e0a\u97624\u4e2a\u5e7f\u544a\u5bf9\u5e94\u7684id\u4e3a 101,102,103,104"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'curl --location --request POST \'http://192.168.17.77:9200/posfor100/_doc/101\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{"city":[1,2,3,4],"ageRange":[2],"gender":[1],"os":[1,2],"industry":[1,2],"price":5}\'\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'curl --location --request POST \'http://192.168.17.77:9200/posfor100/_doc/102\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{"city":[5],"ageRange":[2],"gender":[1],"os":[1,3],"industry":[2],"price":4.8}\'\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'curl --location --request POST \'http://192.168.17.77:9200/posfor100/_doc/103\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{"ageRange":[2],"gender":[1],"os":[2],"price":5.7}\'\n')),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},"curl --location --request POST 'http://192.168.17.77:9200/posfor100/_doc/104' \\\n--header 'Content-Type: application/json' \\\n--data-raw '{\"ageRange\":[2],\"os\":[1],\"price\":5.2}'\n")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"\u5047\u8bbe\u8be5\u5e7f\u544a\u4f4d100\u7684\u5e95\u4ef7\u4e3a3\u5757\u94b1,\u4f7f\u7528\u5e03\u5c14\u67e5\u8be2")),(0,o.kt)("p",null,"\u89d2\u82721 \u5bf9\u5e94\u7684\u67e5\u8be2"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},'curl --location --request GET \'http://192.168.17.77:9200/posfor100/_search\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{"query":{"bool":{"filter":[{"bool":{"should":[{"term":{"gender":{"value":2,"boost":1.0}}},{"bool":{"must_not":[{"exists":{"field":"gender","boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}}],"adjust_pure_negative":true,"minimum_should_match":"1","boost":1.0}},{"bool":{"should":[{"term":{"os":{"value":1,"boost":1.0}}},{"bool":{"must_not":[{"exists":{"field":"os","boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}}],"adjust_pure_negative":true,"minimum_should_match":"1","boost":1.0}},{"bool":{"should":[{"term":{"city":{"value":1,"boost":1.0}}},{"bool":{"must_not":[{"exists":{"field":"city","boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}}],"adjust_pure_negative":true,"minimum_should_match":"1","boost":1.0}},{"bool":{"should":[{"term":{"industry":{"value":2,"boost":1.0}}},{"bool":{"must_not":[{"exists":{"field":"industry","boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}}],"adjust_pure_negative":true,"minimum_should_match":"1","boost":1.0}},{"bool":{"should":[{"term":{"ageRange":{"value":2,"boost":1.0}}},{"bool":{"must_not":[{"exists":{"field":"ageRange","boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}}],"adjust_pure_negative":true,"minimum_should_match":"1","boost":1.0}},{"bool":{"filter":[{"range":{"price":{"from":3.0,"to":null,"include_lower":true,"include_upper":true,"boost":1.0}}}],"adjust_pure_negative":true,"boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}}}\'\n')),(0,o.kt)("p",null,"\u5f97\u5230\u67e5\u8be2\u6761\u4ef6\u5982\u4e0b, \u83b7\u5f97\u4e86id 104\u7684\u5e7f\u544a,\u5373\u662f\u5e7f\u544a4"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "took": 403,\n    "timed_out": false,\n    "_shards": {\n        "total": 1,\n        "successful": 1,\n        "skipped": 0,\n        "failed": 0\n    },\n    "hits": {\n        "total": {\n            "value": 1,\n            "relation": "eq"\n        },\n        "max_score": 0.0,\n        "hits": [\n            {\n                "_index": "posfor100",\n                "_type": "_doc",\n                "_id": "104",\n                "_score": 0.0,\n                "_source": {\n                    "ageRange": [\n                        2\n                    ],\n                    "os": [\n                        1\n                    ],\n                    "price": 5.2\n                }\n            }\n        ]\n    }\n}\n')),(0,o.kt)("p",null,"\u89d2\u82722\u5bf9\u5e94\u7684\u67e5\u8be2"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-shell"},'curl --location --request GET \'http://192.168.17.77:9200/posfor100/_search\' \\\n--header \'Content-Type: application/json\' \\\n--data-raw \'{"query":{"bool":{"filter":[{"bool":{"should":[{"term":{"gender":{"value":1,"boost":1.0}}},{"bool":{"must_not":[{"exists":{"field":"gender","boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}}],"adjust_pure_negative":true,"minimum_should_match":"1","boost":1.0}},{"bool":{"should":[{"term":{"os":{"value":1,"boost":1.0}}},{"bool":{"must_not":[{"exists":{"field":"os","boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}}],"adjust_pure_negative":true,"minimum_should_match":"1","boost":1.0}},{"bool":{"should":[{"term":{"city":{"value":4,"boost":1.0}}},{"bool":{"must_not":[{"exists":{"field":"city","boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}}],"adjust_pure_negative":true,"minimum_should_match":"1","boost":1.0}},{"bool":{"should":[{"term":{"industry":{"value":1,"boost":1.0}}},{"bool":{"must_not":[{"exists":{"field":"industry","boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}}],"adjust_pure_negative":true,"minimum_should_match":"1","boost":1.0}},{"bool":{"should":[{"term":{"ageRange":{"value":2,"boost":1.0}}},{"bool":{"must_not":[{"exists":{"field":"ageRange","boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}}],"adjust_pure_negative":true,"minimum_should_match":"1","boost":1.0}},{"bool":{"filter":[{"range":{"price":{"from":3.0,"to":null,"include_lower":true,"include_upper":true,"boost":1.0}}}],"adjust_pure_negative":true,"boost":1.0}}],"adjust_pure_negative":true,"boost":1.0}}}\'\n')),(0,o.kt)("p",null,"\u5f97\u5230\u7684\u7ed3\u679c"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "took": 3,\n    "timed_out": false,\n    "_shards": {\n        "total": 1,\n        "successful": 1,\n        "skipped": 0,\n        "failed": 0\n    },\n    "hits": {\n        "total": {\n            "value": 2,\n            "relation": "eq"\n        },\n        "max_score": 0.0,\n        "hits": [\n            {\n                "_index": "posfor100",\n                "_type": "_doc",\n                "_id": "101",\n                "_score": 0.0,\n                "_source": {\n                    "city": [\n                        1,\n                        2,\n                        3,\n                        4\n                    ],\n                    "ageRange": [\n                        2\n                    ],\n                    "gender": [\n                        1\n                    ],\n                    "os": [\n                        1,\n                        2\n                    ],\n                    "industry": [\n                        1,\n                        2\n                    ],\n                    "price": 5\n                }\n            },\n            {\n                "_index": "posfor100",\n                "_type": "_doc",\n                "_id": "104",\n                "_score": 0.0,\n                "_source": {\n                    "ageRange": [\n                        2\n                    ],\n                    "os": [\n                        1\n                    ],\n                    "price": 5.2\n                }\n            }\n        ]\n    }\n}\n')),(0,o.kt)("p",null,"\u7531\u4e0a\u53ef\u5f97\u89d2\u82721\u83b7\u53d6\u5230ad4,\u89d2\u82722\u83b7\u53d6\u5230ad1,ad4, \u548c\u6211\u4eec\u6700\u521d\u5f97\u5230\u7684\u7ed3\u8bba\u662f\u4e00\u6837\u76842,  \u5269\u4f59\u89d2\u82723,\u89d2\u82724\u5bf9\u5e94\u7684\u5e7f\u544a,\u8bf7\u5404\u4f4d\u4eb2\u81ea\u5df1\u52a8\u624b\u9a8c\u8bc1.  "),(0,o.kt)("h3",{id:"\u4e09\u5c0f\u7ed3"},"\u4e09\u3001\u5c0f\u7ed3"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"\u5b66\u4e60\u5230\u5b9a\u5411\u6761\u4ef6\u53ef\u4ee5\u901a\u8fc7es\u7684\u5e03\u5c14\u8868\u8fbe\u5f0f\u6765\u68c0\u7d22")),(0,o.kt)("p",null,"\u53c2\u8003\u5982\u4e0b"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://zhuanlan.zhihu.com/p/59658727"},"\u57fa\u4e8e\u5e03\u5c14\u8868\u8fbe\u5f0f\u7684\u5e7f\u544a\u7d22\u5f15\u8bbe\u8ba1")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://www.knowledgedict.com/tutorial/elasticsearch-aggregations.html"},"Elasticsearch\uff08Es\uff09\u805a\u5408\u67e5\u8be2\uff08\u6307\u6807\u805a\u5408\u3001\u6876\u805a\u5408\uff09"))))}m.isMDXComponent=!0}}]);