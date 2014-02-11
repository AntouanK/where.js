(function(){
	
	window.lText = (function(){

		//	make cursors 'blink'
		var cursorAliveInterval = setInterval(function(){
		 
			var i=0,
				cursors = window.document.getElementsByClassName('liveText-cursor');

			for(;i<cursors.length;i+=1){
				cursors[i].style.opacity = cursors[i].style.opacity === '0' ? '1' : '0';
			}
		}, 650);

		//	stop cursors blinking
		var stopCursor = function(){
		 
			clearInterval(cursorAliveInterval);
		};
	 
		var giveLife = function(ele){
		 
		 	//	make the cursor element
		 	var cursorEle = document.createElement('span');
		 	cursorEle.className = 'liveText-cursor';
		 	cursorEle.textContent = '_';

		 	//	add the 'liveText' class to the element
		 	if (!ele.classList.contains('liveText')){
  				ele.classList.add('liveText')	
  			}			

  			//	append the cursor element
			ele.appendChild(cursorEle);
		};

		return {
			giveLife: giveLife,
			stopCursor: stopCursor
		}
	}());
}());