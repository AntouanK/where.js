//	implement some AMD loading capability
(function(){
	
	window.typeWriter = (function(){

		var DEFAULT_TIMING = 110;	//	default timing between typing

		//----------------------------------------------------------------------
		var TypeWriter = function(ele){
		 
		 	this.ele       = ele;
		 	this.textEle   = this.ele.querySelectorAll('.typeWriter-text')[0];
		 	this.cursorEle = this.ele.querySelectorAll('.typeWriter-cursor')[0];
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

		TypeWriter.prototype.startWriting = function(options){

			options = options || {};

			if(typeof options.timing !== 'number'){
				options.timing = DEFAULT_TIMING;
			}

			var defTiming   = options.timing,
				spaceTiming = 300,	//	some timing for spaces
				thisEle		= this,
				textEle     = this.textEle,
				text        = this.text,
				textLen     = this.text.length,
				cursorEle   = this.cursorEle,
				i           = 0,
				errRetries  = 2,
				randErrIndex = Math.floor(Math.random()*35)+4,
				textContentBuf,
				a_z = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','v','w','x',';'];

			//	make cursor stop blinking
			this.cursorEle.className += ' noBlink';

			var loopFn = function(){
			
				//	when we have nothing else to type...
				if(i === textLen){
					//	clear the interval
					clearTimeout(thisEle.typeTimeout);
					//	remove the reference to it
					thisEle.typeTimeout = undefined;
					//	enable blinking again
					cursorEle.className = cursorEle.className.replace('noBlink', '');
					console.log('interval stopped');

					if(typeof options.onEnd === 'function'){
						options.onEnd();
					}
					return false;
				}

				if(i === randErrIndex && errRetries !== 0){

					if(textContentBuf !== undefined){
						textEle.textContent = textContentBuf;
					}
					//	keep the original context
					textContentBuf = textEle.textContent;
					//	append a random character
					textEle.textContent += a_z[Math.floor(Math.random()*23)];
					thisEle.typeTimeout = setTimeout(loopFn, options.timing+300);
					errRetries -= 1;
					return;
				} else if(errRetries === 0){
					errRetries = 2;
					randErrIndex = i + Math.floor(Math.random()*10);
					textEle.textContent = textContentBuf;
					textContentBuf = undefined;
				}
				//	append the next character to the content
				textEle.textContent += text[i];
				i += 1;	//	increase the current character counter

				//	check next letter to input
				if(i !== textLen && text[i].match(/\s/) !== null){
					//	next one is a space, increase timing
					options.timing = 100 + Math.floor(spaceTiming * Math.random());
				} else {
					//	next one is not space, revert timing
					options.timing = defTiming;
				}

				thisEle.typeTimeout = setTimeout(loopFn, options.timing);
			};

			this.typeTimeout = setTimeout(loopFn, options.timing);
		};
		//----------------------------------------------------------------------

		//	make cursors 'blink'
		var cursorAliveInterval = setInterval(function(){
		 
			var i=0,
				cursors = window.document.querySelectorAll('.typeWriter-cursor');

			for(;i<cursors.length;i+=1){
				if(cursors[i].className.split(' ').indexOf('noBlink') === -1){
					cursors[i].style.opacity = 
						(cursors[i].style.opacity === '0') ? '1' : '0';
				}
			}
		}, 650);	//	cursor blinking interval

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
		 	if(ele.className.split(' ').indexOf('typeWriter') === -1){
  				ele.className += ' typeWriter';
  			}			

  			//	clear the text content
  			ele.textContent = '';

  			//	append the new elements
			ele.appendChild(textEle);
			ele.appendChild(cursorEle);

			ele.typeWriter = new TypeWriter(ele);
		};

		var takeLife = function(ele){
		
			ele.removeChild(ele.querySelectorAll('.typeWriter-cursor')[0]);
			ele.typeWriter = undefined;
		};

		return {
			giveLife: giveLife,
			takeLife: takeLife,
			stopCursor: stopCursor
		}
	}());
}());