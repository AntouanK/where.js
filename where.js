/*
 *				where.js
 *
 *	Antonis Karamitros	-	9 Feb 2014
 *
 *	lib to detect OS and browser we are in
 *
 *  -----------> NOTE <-----------
 *  DON'T MINIFY THIS FILE
 *  IF YOU DO, CAREFUL FOR COMMENTS REMOVAL!!!!
 *	IE TESTS INCLUDE COMMENTS
 *
 *	Instructions
 *	-----------
 *
 *	Lib returns :
 *	- testAll() function, which is used to do
 *	the tests ( should call it once ).
 * 	- addClassToBody(), so you can add a class to the body
 *	with the names of the tests passing.
 *	- setPrefix() so you can set your class prefix,
 *	- setNamespace(), so you can move the library wherever you want,
 *	and restore the 'where' property of the global namespace to whatever it was,
 *	to avoid conflicts.
 *
 ***************/
(function() {

	'use strict';

	var namespace,
		prefix = '',
		checkList = {
			browser: {},
			os: {}
		};
	//	------------------------------

	if(namespace === undefined){
		namespace = window;
		if(namespace.where !== undefined){
			namespace._oldWhere = namespace.where;
		}
		//	initialize our 'where' object in the namespace we have for now ( window if not changed )
		namespace.where = {};
	}

	//	------------- OS -------------
	checkList.os = {
		win: function(){
			return /win/i.test(navigator.platform);
		},
		winPhone7: function(){
			return /Windows Phone 7.0/i.test(navigator.userAgent);
		},
		winPhone75: function(){
			return /Windows Phone 7.5/i.test(navigator.userAgent);
		},
		winPhone8: function(){
			return /Windows Phone 8.0/i.test(navigator.userAgent);
		},
		linux: function(){
			return /linux/i.test(navigator.platform) && !/android|cros/i.test(navigator.userAgent);
		},
		ios: function(){
			return /iP(ad|hone|od)/i.test(navigator.userAgent);
		},
		android: function(){
			return /android/i.test(navigator.userAgent);
		},
		mac: function(){
			return /mac/i.test(navigator.platform);
		},
		retina: function(){
			return window.devicePixelRatio >= 1.5;
		},
		blackBerry: function() {
			return /blackberry/i.test(navigator.userAgent);
		}
	};


	//	----------- browser -----------
	checkList.browser = {
		chrome: function(){
			return !!window.chrome && /google/i.test(navigator.vendor);
		},
		chromium: function(){
			return /cros i686/i.test(navigator.platform) && /chromium/i.test(navigator.userAgent);
		},
		opera: function(){
			return !!window.opera || /opera/i.test(navigator.vendor);
		},
		ie6: function(){
			var version = false;
			/*@cc_on
			if (@_jscript_version == 5.6 || (@_jscript_version == 5.7 && /MSIE 6\.0/i.test(navigator.userAgent)))
			version = true
			@*/
			return version;
		},
		ie7: function(){
			var version = false;
			/*@cc_on
			if (@_jscript_version == 5.7 && /MSIE 7\.0(?!.*IEMobile)/i.test(navigator.userAgent))
			version = true
			@*/
			return version;
		},
		ie8: function(){
			var version = false;
			/*@cc_on if (@_jscript_version > 5.7 && !/^(9|10)/.test(@_jscript_version))
			version = true @*/
			return version;
		},
		ie9: function(){
			var version = false;
			/*@cc_on
			if (/^9/.test(@_jscript_version) && /MSIE 9\.0(?!.*IEMobile)/i.test(navigator.userAgent))
			version = true
			@*/
			return version;
		},
		ie10: function(){
			var version = false;
			/*@cc_on
			if (/^10/.test(@_jscript_version) && /MSIE 10\.0(?!.*IEMobile)/i.test(navigator.userAgent))
			version = true
			@*/
			return version;
		},
		ie10touch: function(){
			return /MSIE 10\.0.*Touch(?!.*IEMobile)/i.test(navigator.userAgent);
		},
		firefox: function(){
			return 'InstallTrigger' in window;
		},
		safari: function(){
			return /Constructor/.test(window.HTMLElement);
		}
	};

	//	check for ECMAscript 5
	//	if(window.JSON === undefined){//	we have ES3 } else {//	we have ES5 }

	//	set a prefix for the classes we are going to add to the <body>
	var setPrefix = function(pre){

		if(pre !== ''){
			prefix = pre + '-';
		} else {
			prefix = '';
		}
	};

	//	set out namespace object, in which the 'where' library will move
	//	it also restores back the window.where object
	var setNamespace = function(ns){

		if(typeof ns === 'object' && ns !== null){

			//	save the old where object
			var where = namespace.where,
			//	save the old namespace
				_oldNamespace = namespace;

			//	change to new namespace
			namespace = ns;
			//	assign 'where' to the new object
			namespace.where = where;

			//	restore original 'where' object, if any
			_oldNamespace.where = _oldNamespace._oldWhere;
		}
	};

	//
	// do all the tests and write the values on the namespace given
	var testAll = function(callback){

		var osName,
			browserName;

		//	for each test, run it, assign the returning boolean value to the
		//	appropriate field in the namespace given
		//	and if there is a callback given, on 'true', call it with the test name

		namespace.where.os = {};
		for(osName in checkList.os){
			//	run test and assign result
			namespace.where.os[osName] = checkList.os[osName]();

			//	if true, run callback with test name
			if(namespace.where.os[osName] && typeof callback === 'function'){
				callback(osName);
			}
		}

		namespace.where.browser = {};
		for(browserName in checkList.browser){
			//	run test and assign result
			namespace.where.browser[browserName] = checkList.browser[browserName]();

			//	if true, run callback with test name
			if(namespace.where.browser[browserName] && typeof callback === 'function'){
				callback(browserName);
			}
		}

		return this;
	};

	//	add OS and browser classes to <body> so you can easily style your page
	//	without making further checks every time
	var addClassToBody = function(){

		testAll(function(validValue){

			var currentClasses = document.body.className,
				classToAdd = prefix + validValue;

			//	don't duplicate classes
			if(currentClasses.match(classToAdd) === null){
				document.body.className += (document.body.className === '' ? '' : ' ') + classToAdd;
			}
		});
	};

	/************ Expose API ************/
	namespace.where =  {
		addClassToBody: addClassToBody,
		setPrefix: setPrefix,
		setNamespace: setNamespace,
		testAll: testAll
	};

}());
