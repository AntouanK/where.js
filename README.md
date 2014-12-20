##where.js

![v1.2](https://img.shields.io/badge/version-1.2-green.svg?style=flat)

Where.js A lib for recognising the browser and the OS/platform you are running your JS in.


It currently recognises :

------------- OS -------------
  * mac ( retina )
  * linux
  * win
  * android ( retina )
  * ios ( retina )
  * winPhone7
  * winPhone7.5
  * winPhone8
  * blackBerry

----------- browser -----------

  * chrome
  * chromium
  * firefox
  * ie6,7,8,9,10,10touch,11
  * safari
  * opera
  * yandex

API
=====

##where.setNamespace(object)

Set your namespace where you want `where.js` in.
If not, it will stay in `window.where`

where.testAll()
------
Run the tests in the environment you are. Results are stored within the `where.js` object.
So you can call `where.os[osName]` or `where.browser[browserName]` to get your boolean value.
Example
```javascript
window.where.setNamespace(object);
myNameSpace.testAll();
if(myNameSpace.os.win){ /* means you are in windows */ }
if(myNameSpace.browser.chrome){ /* means you have chrome, nice */ }
```

where.setPrefix(string)
---
Add a prefix to the classes you can add to the body.

where.addClassToBody()
---
Add classes in the <body> for truthy tests. Useful when you want to style with CSS different browsers/OSes.
Example
```javascript
where.testAll();
where.setPrefix('myApp');
where.addClassToBody();
```

so if you are using mac and chrome your <body> will become
```html
<body class="myApp-chrome myApp-mac">
```
----

----

You can also use requirejs to import where/js
```javascript
//	code for a simple gh-pages front for where.js
//	we load where.js with require.js
require(["where"], function(whereModule) {

	var where = whereModule.where;

	//  do the tests
	where.testAll();
	//  set a prefix for the classes to be added
	where.setPrefix('where');
	//  add the appropriate classes to the <body>
	where.addClassToBody();
	//  e.g. now we have <body where-chrome where-linux>
	/*
	where.browser
	> Object {chrome: true, chromium: false, opera: false, ie6: false, ie7: false…}

	where.os
	> Object {win: false, winPhone7: false, winPhone75: false, winPhone8: false, linux: true…}
	*/
```
