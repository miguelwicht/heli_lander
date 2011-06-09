function trace (whatToTrace){

$('#trace').prepend(whatToTrace+"<br/>");
	
}

function main(){
	
	var myHeli = $('#heli'); 
	var myOpponent = $('#opponent');
	var boardHeight = $('#board').height()-40;
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
	var ground = true;
	var kirbyMove = 0;
	var	kirbyMovePath = 'url(resources/images/kirby/kirby4.png)';
	var	kirbyMovePath1 = 'url(resources/images/kirby/kirby4.png)';
	var	kirbyMovePath2 = 'url(resources/images/kirby/kirby5.png)';
	
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
				ground = false;
			} else {
				speedY = 0;
				ground = true;
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
	
	
	function kirbyWalk(){
		if (ground) {
			if (kirbyMove == 0) {
				myHeli.css("background-image", 'url(resources/images/kirby/kirby4.png)');
				kirbyMove++;
			}
			else {
				myHeli.css("background-image", 'url(resources/images/kirby/kirby5.png)');
				kirbyMove--;
			}
		}
	}
	
	var kirbyWalkLoop = setInterval(kirbyWalk, 300);
	
	/******************** key up+down **********************/
	$(document).keydown(function(event){
		trace(event.keyCode);
		trace(speedY+gravity);
		if(event.keyCode==key_down) keyDown = true;	
		if(event.keyCode==key_up) {
			keyUp = true;
			myHeli.css("background-image", 'url(resources/images/kirby/kirby3.png)');
		}
		if(event.keyCode==key_right) {
			keyRight = true;
			myHeli.removeClass("img_flip");
	/*		myHeli.css("background-image", kirbyMovePath);
			if (ground) {
				if (kirbyMove % 2 === 0) {
					myHeli.css("background-image", kirbyMovePath);
					
					if (kirbyMovePath == kirbyMovePath1) kirbyMovePath = 'url(resources/images/kirby/kirby5.png)';
					if (kirbyMovePath == kirbyMovePath2) kirbyMovePath = 'url(resources/images/kirby/kirby4.png)';
				}
				kirbyMove++;
			} */
		}
		if(event.keyCode==key_left) {
			keyLeft = true;
			myHeli.addClass("img_flip");
		
		}
	}); //end keydown
	
	$(document).keyup(function(event){
		trace(event.keyCode+"up");
		if(event.keyCode==key_down) keyDown = false;	
		if(event.keyCode==key_up) {
			keyUp = false;
			myHeli.css("background-image", "url(resources/images/kirby/kirby1.png)");
		}
		if(event.keyCode==key_right) keyRight = false;
		if(event.keyCode==key_left) keyLeft = false;	
	}); //end keyup


	/******************** opponent ************************/
	var direction = 2;
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
	var opponentLoop = setInterval(moveOpponent, 400); 
	 
	/******************* tree ****************************/
	var tree = $('#tree');
	var blow = false;
	function changeTree() {
	//	tree.css("background-image", "url(resources/images/kirby/tree1.png)");
			tree.css("background-position", "0px 0px");
		console.log("changeTree()");
		blow = false
	}
	
	function treeBlow() {
	//	tree.css("background-image", "url(resources/images/kirby/tree2.png)");
		
		tree.css("background-position", "156px 0px");
		blow = true;
		var t = setTimeout(changeTree, 800);
		console.log("treeBlow()");
		
		myHeli.css("left", myHeli.position().left-10);
		
	}
	
	
	function windMove() {
		if (blow) {
			tree.css("background-position", "311px 0px");
			myHeli.css("left", myHeli.position().left-2);
		}
			
	}
	
	var treeBlowLoop = setInterval(treeBlow, 4000); 

	var blowingWind = setInterval(windMove, 8);








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
	var movingBlock = setInterval(function() { checkPlatform(myOpponent, myHeli); }, 50);
	
	
	
	
	
	
	
	
	
	
	


}