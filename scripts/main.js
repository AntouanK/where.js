//	code for a simple gh-pages front for where.js
require(["where"], function(whereModule) {

	var where      = whereModule.where,
		oldBrowser = false,
		_prop,
		addTextToP;

	where.testAll();
	where.addClassToBody();
	
	//	write the browser and OS we are in
	for(_prop in where.browser){
		if(where.browser.hasOwnProperty(_prop)){
			if(where.browser[_prop] === true){
				document.getElementById('browser').textContent = _prop;
			}
		}
	}

	var osText = document.getElementById('os').textContent;

	for(_prop in where.os){
		if(where.os.hasOwnProperty(_prop)){
			if(where.os[_prop] === true){
				osText += (osText === '' ? '' : ' ') + _prop;
			}
		}
	}

	document.getElementById('os').textContent = osText;

	if( where.browser.ie6 || 
		where.browser.ie7 ||
		where.browser.ie8){

		oldBrowser = true;
		document.getElementById('whereJsLink').className.replace('hidden', '');
	} else {

		require(['typewriter'], function(typewriter){
		 
			addTextToP = function(){
		
				var p = document.getElementsByTagName('p');
				typewriter.giveLife(p[0]);

				p[0].typewriter.setText('You want to know in which browser and OS your JS is running');

				p[0].typewriter.startWriting({
					onEnd: function(){

						typewriter.giveLife(p[1]);
						p[1].typewriter.setText('You don\'t want to write the tests in every project');
						p[1].typewriter.startWriting({
							onEnd: function(){
							 
								document.getElementById('whereJsLink').className.replace('hidden', '');
							}
						});
						typewriter.takeLife(p[0]);
					}
				})
			};
		});
	}


	//	make links
	document.getElementById('headerText').onclick = function(){ 

		location.href = 'http://www.github.com/antouank/where.js';
	};

	var header = document.getElementById('headerContainer'),
		contentContainer = document.getElementById('contentContainer'),
		hoverHeaderHandler = function(ev){

			this.className = 'normal';
			this.removeEventListener('mouseover', hoverHeaderHandler);
			setTimeout(function(){
			 
			 	if(!oldBrowser){
			 		addTextToP();
			 	}
				contentContainer.className = contentContainer.className.replace(/hidden/, '');
			},700);
		};

	if(header.addEventListener === undefined){
		header.attachEvent('mouseover', hoverHeaderHandler);
	} else {
		header.addEventListener('mouseover', hoverHeaderHandler);
	}
});