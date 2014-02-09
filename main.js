(function(){
	

	window.myNamespace = {};

	window.where.setNamespace(myNamespace);
	myNamespace.where.testAll();
	myNamespace.where.addClassToBody();
	
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


	//	make links
	document.getElementById('headerContainer').onclick = function(){ 

		location.href = 'http://www.github.com/antouank/where.js';
	};
			
	var header = document.getElementById('headerContainer'),
		contentContainer = document.getElementById('contentContainer'),
		hoverHeaderHandler = function(ev){

			this.className = 'normal';
			this.removeEventListener('mouseover', hoverHeaderHandler);
			setTimeout(function(){
			 
				contentContainer.className = contentContainer.className.replace(/hidden/, '');
			},700);
		};


	header.addEventListener('mouseover', hoverHeaderHandler);
}());