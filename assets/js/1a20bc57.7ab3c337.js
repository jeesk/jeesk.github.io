"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4468],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return f}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},u=Object.keys(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var u=Object.getOwnPropertySymbols(e);for(n=0;n<u.length;n++)r=u[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var i=n.createContext({}),s=function(e){var t=n.useContext(i),r=t;return e&&(r="function"==typeof e?e(t):a(a({},t),e)),r},l=function(e){var t=s(e.components);return n.createElement(i.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,u=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=s(r),f=o,y=d["".concat(i,".").concat(f)]||d[f]||p[f]||u;return r?n.createElement(y,a(a({ref:t},l),{},{components:r})):n.createElement(y,a({ref:t},l))}));function f(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var u=r.length,a=new Array(u);a[0]=d;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:o,a[1]=c;for(var s=2;s<u;s++)a[s]=r[s];return n.createElement.apply(null,a)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},7905:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return c},contentTitle:function(){return i},metadata:function(){return s},toc:function(){return l},default:function(){return d}});var n=r(7462),o=r(3366),u=(r(7294),r(3905)),a=["components"],c={id:"cli"},i="CLI",s={unversionedId:"cli",id:"cli",title:"CLI",description:"Docusaurus provides a set of scripts to help you generate, serve, and deploy your website.",source:"@site/docs/cli.md",sourceDirName:".",slug:"/cli",permalink:"/docs/cli",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/cli.md",tags:[],version:"current",frontMatter:{id:"cli"},sidebar:"api",next:{title:"Client API",permalink:"/docs/docusaurus-core"}},l=[{value:"Index",id:"index",children:[],level:2}],p={toc:l};function d(e){var t=e.components,r=(0,o.Z)(e,a);return(0,u.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,u.kt)("h1",{id:"cli"},"CLI"),(0,u.kt)("p",null,"Docusaurus provides a set of scripts to help you generate, serve, and deploy your website."),(0,u.kt)("p",null,"Once your website is bootstrapped, the website source will contain the Docusaurus scripts that you can invoke with your package manager:"),(0,u.kt)("pre",null,(0,u.kt)("code",{parentName:"pre",className:"language-json",metastring:'title="package.json"',title:'"package.json"'},'{\n  // ...\n  "scripts": {\n    "docusaurus": "docusaurus",\n    "start": "docusaurus start",\n    "build": "docusaurus build",\n    "swizzle": "docusaurus swizzle",\n    "deploy": "docusaurus deploy",\n    "clear": "docusaurus clear",\n    "serve": "docusaurus serve",\n    "write-translations": "docusaurus write-translations",\n    "write-heading-ids": "docusaurus write-heading-ids"\n  }\n}\n')),(0,u.kt)("h2",{id:"index"},"Index"),(0,u.kt)("p",null,"1241234"))}d.isMDXComponent=!0}}]);