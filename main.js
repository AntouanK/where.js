(function(){
	
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