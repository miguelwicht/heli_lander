function trace (whatToTrace){

$('#trace').prepend(whatToTrace+"<br/>");
	
}

function main(){
	
	var myHeli = $('#heli'); 
	var myOpponent = $('#opponent');
	_board = $('#board');
	board = {height:_board.height()-33, width:_board.width()};
	var boardHeight = $('#board').height()-40;
	var boardWidth = $('#board').width()-156;
	tree = {state1:"0px 0px", state2:"156px 0px", state3: "312px 0px"};
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
	kirby = {
		down:"0px 0px", 
		up:"-64px 0px", 
		walk1:"-96px 0px", 
		walk2:"-130px 0px", 
		state3:"-128px 0px"
	};

	
	function startGravity(){
		console.log(kirby.state1);
		console.log(kirby.state2);
		console.log(kirby.state3);
		
		
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
				myHeli.css("top", board.height-myHeli.height()); // sets heli on top of bottom
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
				myHeli.css("background-position", kirby.walk1);
				kirbyMove++;
			}
			else {
				myHeli.css("background-position", kirby.walk2);
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
			myHeli.css("background-position", kirby.up);
		}
		if(event.keyCode==key_right) {
			keyRight = true;
			myHeli.removeClass("img_flip");
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
			myHeli.css("background-position", kirby.down);
		}
		if(event.keyCode==key_right) keyRight = false;
		if(event.keyCode==key_left) keyLeft = false;	
	}); //end keyup


	/******************** enemy ************************/
	var direction = 2;
	function moveEnemy(_enemy) {
	console.log("moveEnemy");
	/*	var opponentTop = myOpponent.position().top;
		var opponentBottom = opponentTop + myOpponent.height();
		
		if (opponentBottom > boardHeight)
			direction *= -1;

		if (opponentTop < 0) 
			direction *= -1;
			
		myOpponent.css("top", opponentTop + direction); */
		enemy = new Object();
		enemy.left = _enemy.position().left;
		enemy.top = _enemy.position().top;
		enemy.right = _enemy.position().left + _enemy.width();
		enemy.bottom = _enemy.position().top + _enemy.height();
		enemy.width = _enemy.width();
		enemy.height = _enemy.height();
		
		if (enemy.left < 0) {
			direction *=-1;
			
		}
		if (enemy.right > boardWidth) {
			direction *=-1;
			
		}	
		_enemy.css("left", enemy.left + direction);
	}
	// start gravity loop
	var enemyLoop = setInterval(function() {moveEnemy(myOpponent); }, 20); 
	
	
	
	function checkEnemyCollision(_enemy, _kirby) {
		enemy = new Object();
		enemy.left = _enemy.position().left;
		enemy.top = _enemy.position().top;
		enemy.right = _enemy.position().left + _enemy.width();
		enemy.bottom = _enemy.position().top + _enemy.height();
		enemy.width = _enemy.width();
		enemy.height = _enemy.height();

		kirby.left = _kirby.position().left;
		kirby.top = _kirby.position().top;
		kirby.right = _kirby.position().left + _kirby.width();
		kirby.bottom = _kirby.position().top + _kirby.height();
		kirby.width = _kirby.width();
		kirby.height = _kirby.height();
		
		/* 		collisionCheck!!!!!!!					*/
		
		

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
	 
	/******************* tree ****************************/
	var treeRef = $('#tree');
	var blow = false;
	function treeBreath() {
		console.log("breath");
		var t = setTimeout(treeBreathOut, 800);
	}
	
	function treeBreathOut() {
		treeRef.css("background-position", tree.state2);
		console.log("breathOut");
		blow = true;
		var z = setTimeout(treeBreathOutEnd, 2000);
	}
	
	function treeBreathOutEnd(){
		blow = false;
		treeRef.css("background-position", tree.state1);
	}
	function treeBlow() {
		treeRef.css("background-position", tree.state3);
		console.log("nothing");
		var z = setTimeout(treeBreath, 800);
	}
	
	
	function windMove() {
		if (blow) {
			console.log("blow");
			myHeli.css("left", myHeli.position().left-2);
		}
			
	}
	
	var treeBlowLoop = setInterval(treeBlow, 8000); 
	var blowingWind = setInterval(windMove, 8);

	//4000 pusten


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

//	var platformLoop = setInterval(function() { checkPlatform(myPlatform, myHeli); }, 50);
	var movingBlock = setInterval(function() { checkPlatform(myOpponent, myHeli); }, 50);
	
	
	
	
	
	
	
	
	
	
	


}