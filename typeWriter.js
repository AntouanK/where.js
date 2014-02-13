(function(){
	
	window.lText = (function(){

		var DEFAULT_TIMING = 130;	//	default timing between typing

		//----------------------------------------------------------------------
		var TypeWriter = function(ele){
		 
		 	this.ele       = ele;
		 	this.textEle   = this.ele.getElementsByClassName('typeWriter-text')[0];
		 	this.cursorEle = this.ele.getElementsByClassName('typeWriter-cursor')[0];
			this.text      = this.textEle.textContent.replace(/\s+/g,' ');
			this.typeTimeout;	//	use it to save the typing interval

			ele.typeWriter = this;

			return this;
		};

		//	clear the text ( leave the cursor only )
		TypeWriter.prototype.clear = function(){
		
			this.textEle.textContent = '';
			if(this.typeTimeout !== undefined){
				clearTimeout(this.typeTimeout);
				this.typeTimeout = undefined;
			}
		};

		//	set some new text to the object memory
		TypeWriter.prototype.setText = function(text){

			this.text = text;
		};

		//	show the text from the memory ( instantly )
		TypeWriter.prototype.showText = function(){
		
			this.textEle.textContent = this.text;
		};

		TypeWriter.prototype.startWriting = function(timing){

			if(typeof timing !== 'number'){
				timing = DEFAULT_TIMING;
			}

			var defTiming   = timing,
				spaceTiming = 300,	//	some timing for spaces
				thisEle		= this,
				textEle     = this.textEle,
				text        = this.text,
				textLen     = this.text.length,
				cursorEle   = this.cursorEle,
				i           = 0;

			//	make cursor stop blinking
			this.cursorEle.classList.add('noBlink');

			var loopFn = function(){
			
				if(i === textLen){
					//	clear the interval
					clearTimeout(thisEle.typeTimeout);
					//	remove the reference to it
					thisEle.typeTimeout = undefined;
					//	enable blinking again
					cursorEle.classList.remove('noBlink');
					console.log('interval stopped');
					return false;
				}
				textEle.textContent += text[i];
				i += 1;

				//	check next letter to input
				if(text[i].match(/\s/) !== null){
					//	next one is a space, increase timing
					timing = 100 + Math.floor(spaceTiming * Math.random());
				} else {
					//	next one is not space, revert timing
					timing = defTiming;
				}

				thisEle.typeTimeout = setTimeout(loopFn, timing);
			};

			this.typeTimeout = setTimeout(loopFn, timing);
		};
		//----------------------------------------------------------------------

		//	make cursors 'blink'
		var cursorAliveInterval = setInterval(function(){
		 
			var i=0,
				cursors = window.document.getElementsByClassName('typeWriter-cursor');

			for(;i<cursors.length;i+=1){
				if(!cursors[i].classList.contains('noBlink')){
					cursors[i].style.opacity = cursors[i].style.opacity === '0' ? '1' : '0';
				}
			}
		}, 650);

		//	stop cursors blinking
		var stopCursor = function(){
		 
			clearInterval(cursorAliveInterval);
		};

		//	make a typeWriter object from en element
		var giveLife = function(ele){

			//	check that ele is an HTML element
			if(ele === undefined || !(ele instanceof HTMLElement)){
				return false;
			}
		 
		 	//	make the cursor element
		 	var cursorEle = document.createElement('span'),
		 		textEle =  document.createElement('span');
		 	cursorEle.className = 'typeWriter-cursor';
		 	cursorEle.textContent = '_';
		 	textEle.className = 'typeWriter-text';
		 	textEle.textContent = ele.textContent;

		 	//	add the 'typeWriter' class to the element
		 	if (!ele.classList.contains('typeWriter')){
  				ele.classList.add('typeWriter')	
  			}			

  			//	clear the text content
  			ele.textContent = '';

  			//	append the new elements
			ele.appendChild(textEle);
			ele.appendChild(cursorEle);

			ele.typeWriter = new TypeWriter(ele);
		};

		return {
			giveLife: giveLife,
			stopCursor: stopCursor
		}
	}());
}());