//	code for a simple gh-pages front for where.js

(function(){
	
	var oldBrowser = false,
		_prop;

	//	initialize where in myNamespace
	window.myNamespace = {};
	window.where.setNamespace(myNamespace);
	myNamespace.where.testAll();
	myNamespace.where.addClassToBody();
	
	//	write the browser and OS we are in
	for(_prop in myNamespace.where.browser){
		if(myNamespace.where.browser.hasOwnProperty(_prop)){
			if(myNamespace.where.browser[_prop] === true){
				document.getElementById('browser').textContent = _prop;
			}
		}
	}

	var osText = document.getElementById('os').textContent;

	for(_prop in myNamespace.where.os){
		if(myNamespace.where.os.hasOwnProperty(_prop)){
			if(myNamespace.where.os[_prop] === true){
				osText += (osText === '' ? '' : ' ') + _prop;
			}
		}
	}

	document.getElementById('os').textContent = osText;

	if( myNamespace.where.browser.ie6 || 
		myNamespace.where.browser.ie7 ||
		myNamespace.where.browser.ie8){

		oldBrowser = true;
		document.getElementById('whereJsLink').classList.remove('hidden');
	} else {
		var addTextToP = function(){
		
			var p = document.getElementsByTagName('p');
			typeWriter.giveLife(p[0]);

			p[0].typeWriter.setText('You want to know in which browser and OS your JS is running');

			p[0].typeWriter.startWriting({
				onEnd: function(){

					typeWriter.giveLife(p[1]);
					p[1].typeWriter.setText('You don\'t want to write the tests in every project');
					p[1].typeWriter.startWriting({
						onEnd: function(){
						 
							document.getElementById('whereJsLink').classList.remove('hidden');
						}
					});
					typeWriter.takeLife(p[0]);
				}
			})
		};
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

	header.addEventListener('mouseover', hoverHeaderHandler);

}());