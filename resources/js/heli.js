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
	 


}