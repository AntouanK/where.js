//	code for a simple gh-pages front for where.js

(function(){
	

	//	initialize where in myNamespace
	window.myNamespace = {};
	window.where.setNamespace(myNamespace);
	myNamespace.where.testAll();
	myNamespace.where.addClassToBody();
	
	//	write the browser and OS we are in
	Object
	.keys(myNamespace.where.browser)
	.some(function (key) {
		if(myNamespace.where.browser[key] === true){
			document.getElementById('browser').textContent = key;
			return true;
		}
	});

	var osText = document.getElementById('os').textContent;

	Object
	.keys(myNamespace.where.os)
	.some(function (key) {
		if(myNamespace.where.os[key] === true){
			osText += (osText === '' ? '' : ' ') + key;
		}
	});
	document.getElementById('os').textContent = osText;


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
			 
			 	addTextToP();
				contentContainer.className = contentContainer.className.replace(/hidden/, '');
			},700);
		};

	header.addEventListener('mouseover', hoverHeaderHandler);

}());