where.js
========

Where.js A lib for recognising the browser and the OS/platform you are running your JS in.

http://antouank.github.io/where.js/

It currently recognizes :

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
  * ie6,7,8,9,10,10touch
  * safari
  * opera


You can add a class to the <body> of your document so you can use different CSS rules depending on where your page is every time.
Also you can prefix the class.

For example

```javascript
//	code for a simple gh-pages front for where.js
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
