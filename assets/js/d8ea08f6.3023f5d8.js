"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[779],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return d}});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=r.createContext({}),l=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},p=function(e){var n=l(e.components);return r.createElement(c.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},g=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),g=l(t),d=i,f=g["".concat(c,".").concat(d)]||g[d]||u[d]||o;return t?r.createElement(f,a(a({ref:n},p),{},{components:t})):r.createElement(f,a({ref:n},p))}));function d(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=g;var s={};for(var c in n)hasOwnProperty.call(n,c)&&(s[c]=n[c]);s.originalType=e,s.mdxType="string"==typeof e?e:i,a[1]=s;for(var l=2;l<o;l++)a[l]=t[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}g.displayName="MDXCreateElement"},1339:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},assets:function(){return p},toc:function(){return u},default:function(){return d}});var r=t(7462),i=t(3366),o=(t(7294),t(3905)),a=["components"],s={slug:"delete-git-file-on-idea",title:"git \u5220\u9664\u8bef\u4e0a\u4f20\u7684.idea\u6587\u4ef6",authors:["jeesk"],tags:["git"]},c=void 0,l={permalink:"/devops/delete-git-file-on-idea",source:"@site/devops/2020-08-12-delete-git-file-on-idea.md",title:"git \u5220\u9664\u8bef\u4e0a\u4f20\u7684.idea\u6587\u4ef6",description:"\u95ee\u9898\uff1a",date:"2020-08-12T00:00:00.000Z",formattedDate:"August 12, 2020",tags:[{label:"git",permalink:"/devops/tags/git"}],readingTime:1.81,truncated:!1,authors:[{name:"jeesk",title:"java engineer",url:"https://shanjiancaofu.com",imageURL:"https://shanjiancaofu.com/img/avtor.png",key:"jeesk"}],frontMatter:{slug:"delete-git-file-on-idea",title:"git \u5220\u9664\u8bef\u4e0a\u4f20\u7684.idea\u6587\u4ef6",authors:["jeesk"],tags:["git"]},prevItem:{title:"Zookeeper\u4e00\u952e\u7fa4\u542f\u811a\u672c",permalink:"/devops/zookeeper-cluster-start-script"},nextItem:{title:"kafka \u751f\u4ea7\u63a8\u8350\u914d\u7f6e",permalink:"/devops/kafka-production-config"}},p={authorsImageUrls:[void 0]},u=[],g={toc:u};function d(e){var n=e.components,t=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},g,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"\u95ee\u9898\uff1a\n\u63d0\u4ea4\u9879\u76ee\u7684\u65f6\u5019\u5fd8\u8bb0\u6dfb\u52a0.gitignore\u6587\u4ef6\uff0c\u8bef\u4e0a\u4f20\u4e86\u6587\u4ef6(\u5982.idea)\u5982\u4f55\u89e3\u51b3\uff1f(\u672c\u6587\u4ee5.idea\u6587\u4ef6\u5939\u4e3e\u4f8b)"),(0,o.kt)("p",null,"1.\u5c06\u9879\u76ee\u6587\u4ef6\u62c9\u53d6\u4e0b\u6765\ngit pull origin master"),(0,o.kt)("p",null,"2.\u6dfb\u52a0\u9700\u8981\u8fc7\u6ee4\u7684\u6587\u4ef6\na. \u5982\u679c\u4f60\u6709.gitignore\u6587\u4ef6\uff0c\u4f46\u662f\u6ca1\u6dfb\u52a0\u8bef\u4e0a\u4f20\u7684\u6587\u4ef6\u5939(\u5982.idea)\n\u65b0\u8d77\u4e00\u884c\u6dfb\u52a0  .idea/\nb. \u5982\u679c\u4f60\u6ca1\u6709.gitignore\u6587\u4ef6\uff0c\u5728\u4f60\u7684\u9879\u76ee\u91cc\u521b\u5efa\u4e00\u4e2a.gitignore\u7684\u6587\u4ef6\n\u5c06\u4e0b\u9762\u7684\u6587\u672c\u653e\u5165\u5373\u53ef\n\u901a\u7528.gitignore\u6587\u4ef6"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"\n# Initially taken from Github's Python gitignore file\n\n# Byte-compiled / optimized / DLL files\n__pycache__/\n*.py[cod]\n*$py.class\n__pycache__\n# C extensions\n*.so\n.DS_Store\n.idea/\n# Distribution / packaging\n.Python\nbuild/\ndevelop-eggs/\ndist/\ndownloads/\neggs/\n.eggs/\nlib/\nlib64/\nparts/\nsdist/\nvar/\nwheels/\n*.egg-info/\n.installed.cfg\n*.egg\nMANIFEST\n\n# PyInstaller\n#  Usually these files are written by a python script from a template\n#  before PyInstaller builds the exe, so as to inject date/other infos into it.\n*.manifest\n*.spec\n\n# Installer logs\npip-log.txt\npip-delete-this-directory.txt\n\n# Unit test / coverage reports\nhtmlcov/\n.tox/\n.nox/\n.coverage\n.coverage.*\n.cache\nnosetests.xml\ncoverage.xml\n*.cover\n.hypothesis/\n.pytest_cache/\n\n# Translations\n*.mo\n*.pot\n\n# Django stuff:\n*.log\nlocal_settings.py\ndb.sqlite3\n\n# Flask stuff:\ninstance/\n.webassets-cache\n\n# Scrapy stuff:\n.scrapy\n\n# Sphinx documentation\ndocs/_build/\n\n# PyBuilder\ntarget/\n\n# Jupyter Notebook\n.ipynb_checkpoints\n\n# IPython\nprofile_default/\nipython_config.py\n\n# pyenv\n.python-version\n\n# celery beat schedule file\ncelerybeat-schedule\n\n# SageMath parsed files\n*.sage.py\n\n# Environments\n.env\n.venv\nenv/\nvenv/\nENV/\nenv.bak/\nvenv.bak/\n\n# Spyder project settings\n.spyderproject\n.spyproject\n\n# Rope project settings\n.ropeproject\n\n# mkdocs documentation\n/site\n\n# mypy\n.mypy_cache/\n.dmypy.json\ndmypy.json\n\n# Pyre type checker\n.pyre/\n\ndata/\nmodel/\n\n")),(0,o.kt)("p",null,"3.\u6253\u5f00\u9879\u76ee\u7ec8\u7aef\u6267\u884c\u547d\u4ee4"),(0,o.kt)("h1",{id:"\u5220\u9664github\u4e0a\u7684\u8bef\u4e0a\u4f20\u6587\u4ef6idea"},"\u5220\u9664github\u4e0a\u7684\u8bef\u4e0a\u4f20\u6587\u4ef6.idea"),(0,o.kt)("p",null,"git rm -rf --cached .idea"),(0,o.kt)("p",null,"4.\u63d0\u4ea4.gitignore\u6587\u4ef6\ngit add .gitignore\n5.\u4e0a\u4f20\ngit commit -m '\u5ffd\u7565idea'\ngit push -u origin master"))}d.isMDXComponent=!0}}]);