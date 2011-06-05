function trace (whatToTrace){

$('#trace').prepend(whatToTrace+"<br/>");
	
}

function main(){
	
	var myHeli = $('#heli'); 
	var myOpponent = $('#opponent');
	var boardHeight = $('#board').height();
	var speedY = 0;
	var gravity = 1;
	var drag = .98;
	trace(speedY+gravity);
	//key bindings
	var key_up = "38";
	var key_down = "40";
	var key_left = "37";
	var key_right = "39";
	
	//key states
	var keyUp = false;
	var keyRight = false;
	var keyLeft = false;
	var keyDown = false;
	//gravity
	function startGravity(){
		
		var heliTop = myHeli.position().top;
		var heliLeft = myHeli.position().left;
		var heliBottom = myHeli.position().top + myHeli.height();
		
		/* vertical movement */
		if (keyUp){
			if (speedY >= -20) speedY -= gravity;
			myHeli.css("top", heliTop+speedY);
		} else {
			if (heliBottom < boardHeight){
				if (speedY <= 20) speedY += gravity;
				myHeli.css("top", heliTop+speedY);	
			} else {
				speedY = 0;
				myHeli.css("top", boardHeight-myHeli.height()); // sets heli on top of bottom
			}
		} //end keyUp

		if (keyDown) {
			heliTop = myHeli.position().top;
			myHeli.css("top", heliTop+10);
		}
		

		/* horizontal movement */
		if (keyRight){
			heliLeft = myHeli.position().left; // fix for left+right button bug
			myHeli.css("left", heliLeft+10);
		}
		if (keyLeft){
			heliLeft = myHeli.position().left; // fix for left+right button bug
			myHeli.css("left", heliLeft-10);
		}
		
	

	}

	// Start Gravity loop
	var gravityLoop = setInterval(startGravity, 50);
	
	
	/******************** key up+down **********************/
	$(document).keydown(function(event){
		trace(event.keyCode);
		trace(speedY+gravity);
		if(event.keyCode==key_down) keyDown = true;	
		if(event.keyCode==key_up) keyUp = true;
		if(event.keyCode==key_right) keyRight = true;
		if(event.keyCode==key_left) keyLeft = true;	
	}); //end keydown
	
	$(document).keyup(function(event){
		trace(event.keyCode+"up");
		if(event.keyCode==key_down) keyDown = false;	
		if(event.keyCode==key_up) keyUp = false;
		if(event.keyCode==key_right) keyRight = false;
		if(event.keyCode==key_left) keyLeft = false;	
	}); //end keyup


	/******************** opponent ************************/
	var direction = 10;
	function moveOpponent() {
		var opponentTop = myOpponent.position().top;
		var opponentBottom = opponentTop + myOpponent.height();
		
		if (opponentBottom > boardHeight)
			direction *= -1;

		if (opponentTop < 0) 
			direction *= -1;
			
		myOpponent.css("top", opponentTop + direction);
		
	}
	// start gravity loop
	var opponentLoop = setInterval(moveOpponent, 50); 
	 

	/********************* platform ***************************/
	var myPlatform = $('#platform'); 
	
	function checkPlatform(_platform, _heli) {

		var _platformTop = _platform.position().top;
		var _platformLeft = _platform.position().left;
		var _platformWidth = _platform.width();
		var _heliTop = _heli.position().top;
		var _heliBottom = _heli.position().top + _heli.height();
		var _heliLeft = _heli.position().left;
		var _heliWidth = _heli.width();
		
		if (_platformTop <= _heliBottom  
			&& _platformTop >= _heliTop
			&& _platformLeft <= _heliLeft+_heliWidth  
			&& _platformLeft+_platformWidth >= _heliLeft/*+_heliWidth*/){
				
			speedY = 0;
			_heli.css("top", _platformTop - _heli.height());
			
		}
		
	}

	var platformLoop = setInterval(function() { checkPlatform(myPlatform, myHeli); }, 50);


}