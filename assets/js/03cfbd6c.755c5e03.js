"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[1413],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,s=e.originalType,c=e.parentName,p=a(e,["components","mdxType","originalType","parentName"]),m=l(n),f=o,g=m["".concat(c,".").concat(f)]||m[f]||u[f]||s;return n?r.createElement(g,i(i({ref:t},p),{},{components:n})):r.createElement(g,i({ref:t},p))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var s=n.length,i=new Array(s);i[0]=m;var a={};for(var c in t)hasOwnProperty.call(t,c)&&(a[c]=t[c]);a.originalType=e,a.mdxType="string"==typeof e?e:o,i[1]=a;for(var l=2;l<s;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4465:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return a},contentTitle:function(){return c},metadata:function(){return l},assets:function(){return p},toc:function(){return u},default:function(){return f}});var r=n(7462),o=n(3366),s=(n(7294),n(3905)),i=["components"],a={slug:"k8s-ingress-cross-domain-whitelist",title:"K8s\u7684ingress-\u914d\u7f6e\u8de8\u57df\u548c\u767d\u540d\u5355",authors:["jeesk"],tags:["k8s"]},c=void 0,l={permalink:"/devops/k8s-ingress-cross-domain-whitelist",source:"@site/devops/2021-05-05-k8s-ingress-cross-domain-whitelist.md",title:"K8s\u7684ingress-\u914d\u7f6e\u8de8\u57df\u548c\u767d\u540d\u5355",description:"\u914d\u7f6e\u8de8\u57df:",date:"2021-05-05T00:00:00.000Z",formattedDate:"May 5, 2021",tags:[{label:"k8s",permalink:"/devops/tags/k-8-s"}],readingTime:.31,truncated:!1,authors:[{name:"jeesk",title:"java engineer",url:"https://shanjiancaofu.com",imageURL:"https://shanjiancaofu.com/img/avtor.png",key:"jeesk"}],frontMatter:{slug:"k8s-ingress-cross-domain-whitelist",title:"K8s\u7684ingress-\u914d\u7f6e\u8de8\u57df\u548c\u767d\u540d\u5355",authors:["jeesk"],tags:["k8s"]},prevItem:{title:"Kafka-\u96c6\u7fa4\u6559\u7a0b,\u53ca\u82e5\u5e72\u914d\u7f6e\u8bf4\u660e",permalink:"/devops/install-cluster-kafka"},nextItem:{title:"Long Blog Post",permalink:"/devops/long-blog-post"}},p={authorsImageUrls:[void 0]},u=[],m={toc:u};function f(e){var t=e.components,n=(0,o.Z)(e,i);return(0,s.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"\u914d\u7f6e\u8de8\u57df:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"    nginx.ingress.kubernetes.io/Access-Control-Allow-Origin: 'http://12341234.s1.natapp.cc'\n    nginx.ingress.kubernetes.io/cors-allow-headers: >-\n      AUTHTOKEN,DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified- \n     Since,Cache-Control,Content-Type,Authorization\n    nginx.ingress.kubernetes.io/cors-allow-methods: 'PUT, GET, POST, OPTIONS'\n    nginx.ingress.kubernetes.io/cors-allow-origin: 'http://12342134.s1.natapp.cc'\n    nginx.ingress.kubernetes.io/enable-access-log: 'true'\n    nginx.ingress.kubernetes.io/enable-cors: 'true'\n")),(0,s.kt)("p",null,"\u914d\u7f6e\u767d\u540d\u5355:"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"nginx.ingress.kubernetes.io/whitelist-source-range: >-\n      19.19.29.12\n")),(0,s.kt)("p",null,"\u914d\u7f6e\u8def\u7531\u89c4\u5219"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"spec:\n  tls:\n    - hosts:\n        - mysite\n      secretName: mysite.com\n  rules:\n    - host: rzzm.h5cmpassport.com\n      http:\n        paths:\n          - path: '/abc*|adfd*|group[0-9]'\n            pathType: ImplementationSpecific\n            backend:\n              serviceName: mysiteservice\n              servicePort: 8083\n")))}f.isMDXComponent=!0}}]);