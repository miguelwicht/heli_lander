function trace (whatToTrace){
$('#trace').prepend(whatToTrace+"<br/>");
}

function main(){
	
//	var myHeli = $('#heli'); 
	
	var myOpponent = $('#opponent');
	_board = $('#board');
	board = {height:_board.height()-33, width:_board.width()};
	var boardHeight = $('#board').height()-40;
	var boardWidth = $('#board').width()-156;
	tree = {state1:"0px 0px", state2:"-156px 0px", state3: "-312px 0px"};
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
//	var kirbyMove = 0;
	
	// Kirby SpriteStates
	kirby = {
		id: $('#heli'),
		energy: 100,
		energyUse: 2,
		walk: 0,
		move: false,
		stone: false,
		down:"0px 0px", 
		up:"-64px 0px", 
		walk1:"-96px 0px", 
		walk2:"-130px 0px", 
		state3:"-128px 0px",
		stoneState:"-162px 0px"
	};

	console.log(kirby.id);
	function startGravity(){
		kirby.top = kirby.id.position().top;
		kirby.left = kirby.id.position().left;
		kirby.bottom = kirby.id.position().top + kirby.id.height();
		
		/* vertical movement */
		if (keyUp){
			if (speedY >= -20 && kirby.energy > 0) speedY -= gravity;
				else speedY += gravity;
				
				if (kirby.bottom > board.height || kirby.bottom + speedY > board.height) {
					kirby.id.css("top", board.height-kirby.id.height()); /* prevents kirby from falling through the map */
					ground = true;
					if(kirby.energy <= 80) kirby.energy += 20;
					else kirby.energy = 100;
				}
				else {
					kirby.id.css("top", kirby.top+speedY);
					kirby.id.css("background-position", kirby.up);
					kirby.energy -= kirby.energyUse;
				}
		} else {
			if (kirby.bottom < boardHeight){
				if (speedY <= 20) speedY += gravity;
				kirby.id.css("top", kirby.top+speedY);	
				ground = false;
			} else {
				speedY = 0;
				ground = true;
				kirby.id.css("top", board.height-kirby.id.height()); // sets heli on top of bottom
				if(kirby.energy <= 80) kirby.energy += 20;
				else kirby.energy = 100;
			}
		} //end keyUp

		if (keyDown) {						/*************** kirby stone *****************/
			kirby.top = kirby.id.position().top;
			kirby.id.css("top", kirby.top+10);
			kirby.stone = true;
			kirby.id.css("background-position", kirby.stoneState);
		}
		
		/***************** reset boundaries *********************/
	//	if (kirby.bottom > board.height) kirby.id.css("bottom", board.height);
		

		/* horizontal movement */
		if (keyRight){
			kirby.left = kirby.id.position().left; // fix for left+right button bug
			kirby.id.css("left", kirby.left+10);
			kirby.move = true;
		}
		if (keyLeft){
			kirby.left = kirby.id.position().left; // fix for left+right button bug
			kirby.id.css("left", kirby.left-10);
			kirby.move = true;
		} 
		
	

	}

	// Start Gravity loop
	var gravityLoop = setInterval(startGravity, 50);
	
	
	function kirbyWalk(){
		if (kirby.move && ground) {
			if (kirby.walk == 0) {
				kirby.id.css("background-position", kirby.walk1);
				kirby.walk++;
			}
			else {
				kirby.id.css("background-position", kirby.walk2);
				kirby.walk--;
			}
		} else if(kirby.move == false && ground) kirby.id.css("background-position", kirby.walk1);
	}
	
	var kirbyWalkLoop = setInterval(kirbyWalk, 300);
	
	/******************** key up+down **********************/
	$(document).keydown(function(event){
		trace(event.keyCode);
		trace(speedY+gravity);
		if(event.keyCode==key_down) keyDown = true;	
		if(event.keyCode==key_up) {
			keyUp = true;
			
		}
		if(event.keyCode==key_right) {
			keyRight = true;
			kirby.id.removeClass("img_flip");
		}
		if(event.keyCode==key_left) {
			keyLeft = true;
			kirby.id.addClass("img_flip");
		
		}
	}); //end keydown
	
	$(document).keyup(function(event){
		trace(event.keyCode+"up");
		if(event.keyCode==key_down) {
			keyDown = false;
			kirby.stone = false;
		}	
		if(event.keyCode==key_up) {
			keyUp = false;
			kirby.id.css("background-position", kirby.down);
		}
		if(event.keyCode==key_right) {
			keyRight = false;
			kirby.move = false;
		}
		if(event.keyCode==key_left) {
			keyLeft = false;	
			kirby.move = false;
		}
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
		treeRef.css("background-position", tree.state3);
		console.log("breathOut");
		blow = true;
		var z = setTimeout(treeBreathOutEnd, 2000);
	}
	
	function treeBreathOutEnd(){
		blow = false;
		treeRef.css("background-position", tree.state1);
	}
	function treeBlow() {
		treeRef.css("background-position", tree.state2);
		console.log("nothing");
		var z = setTimeout(treeBreath, 800);
	}
	
	
	function windMove() {
		if (blow && kirby.stone == false) {
			console.log("blow");
			kirby.id.css("left", kirby.id.position().left-2);
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
	var movingBlock = setInterval(function() { checkPlatform(myOpponent, kirby.id); }, 50);
	
	
	
	function keepInBoundaries(){
		if (kirby.bottom > board.height) myHeli.css("bottom", board.height);
	}
	

	var keepInBoundariesLoop = setInterval(keepInBoundaries, 20);
	
	
	
	
	
	


}