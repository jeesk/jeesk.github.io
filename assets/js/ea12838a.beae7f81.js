"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6315],{3905:function(e,r,t){t.d(r,{Zo:function(){return l},kt:function(){return f}});var n=t(7294);function o(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function a(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function u(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?a(Object(t),!0).forEach((function(r){o(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,o=function(e,r){if(null==e)return{};var t,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||(o[t]=e[t]);return o}(e,r);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)t=a[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var i=n.createContext({}),s=function(e){var r=n.useContext(i),t=r;return e&&(t="function"==typeof e?e(r):u(u({},r),e)),t},l=function(e){var r=s(e.components);return n.createElement(i.Provider,{value:r},e.children)},p={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,o=e.mdxType,a=e.originalType,i=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),d=s(t),f=o,m=d["".concat(i,".").concat(f)]||d[f]||p[f]||a;return t?n.createElement(m,u(u({ref:r},l),{},{components:t})):n.createElement(m,u({ref:r},l))}));function f(e,r){var t=arguments,o=r&&r.mdxType;if("string"==typeof e||o){var a=t.length,u=new Array(a);u[0]=d;var c={};for(var i in r)hasOwnProperty.call(r,i)&&(c[i]=r[i]);c.originalType=e,c.mdxType="string"==typeof e?e:o,u[1]=c;for(var s=2;s<a;s++)u[s]=t[s];return n.createElement.apply(null,u)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},6599:function(e,r,t){t.r(r),t.d(r,{frontMatter:function(){return c},contentTitle:function(){return i},metadata:function(){return s},toc:function(){return l},default:function(){return d}});var n=t(7462),o=t(3366),a=(t(7294),t(3905)),u=["components"],c={id:"docusaurus-core",title:"Docusaurus Client API",sidebar_label:"Client API"},i=void 0,s={unversionedId:"docusaurus-core",id:"docusaurus-core",title:"Docusaurus Client API",description:"Docusaurus provides some APIs on the clients that can be helpful to you when building your site.",source:"@site/docs/docusaurus-core.md",sourceDirName:".",slug:"/docusaurus-core",permalink:"/docs/docusaurus-core",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/docusaurus-core.md",tags:[],version:"current",frontMatter:{id:"docusaurus-core",title:"Docusaurus Client API",sidebar_label:"Client API"},sidebar:"api",previous:{title:"CLI",permalink:"/docs/cli"},next:{title:"docusaurus.config.js",permalink:"/docs/api/docusaurus-config"}},l=[{value:"Components",id:"components",children:[{value:"<code>&lt;ErrorBoundary /&gt;</code>",id:"errorboundary",children:[],level:3}],level:2}],p={toc:l};function d(e){var r=e.components,t=(0,o.Z)(e,u);return(0,a.kt)("wrapper",(0,n.Z)({},p,t,{components:r,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Docusaurus provides some APIs on the clients that can be helpful to you when building your site."),(0,a.kt)("h2",{id:"components"},"Components"),(0,a.kt)("h3",{id:"errorboundary"},(0,a.kt)("inlineCode",{parentName:"h3"},"<ErrorBoundary />")),(0,a.kt)("p",null,"This component creates a ",(0,a.kt)("a",{parentName:"p",href:"https://reactjs.org/docs/error-boundaries.html"},"React error boundary"),"."),(0,a.kt)("p",null,"Use it to wrap components that might throw, and display a fallback when that happens instead of crashing the whole app."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-jsx"},"import React from 'react';\nimport ErrorBoundary from '@docusaurus/ErrorBoundary';\n\nconst SafeComponent = () => (\n  <ErrorBoundary\n    fallback={({error, tryAgain}) => (\n      <div>\n        <p>This component crashed because of error: {error.message}.</p>\n        <button onClick={tryAgain}>Try Again!</button>\n      </div>\n    )}>\n    <SomeDangerousComponentThatMayThrow />\n  </ErrorBoundary>\n);\n")),(0,a.kt)("p",null,"1242141243"))}d.isMDXComponent=!0}}]);