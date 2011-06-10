function trace (whatToTrace){
$('#trace').prepend(whatToTrace+"<br/>");
}

function main(){
	
	var _board = $('#board');
	board = {
		id: $('#board'),
		height: _board.height()-33, 
		width: _board.width()
	};

	tree = {
		id: $('#tree'),
		blow: false,
		state1: "0px 0px", 
		state2:"-156px 0px", 
		state3: "-312px 0px"
	};
	var speedY = 0;
	var gravity = 1;
	var drag = .98;
	
	var direction = 2; // enemy speed
	
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

	
	// Kirby SpriteStates
	kirby = {
		id: $('#kirby'),
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
	
	portal = {id: $('#portal')};

	
	waddle = {
		id: $('#waddle'),
		walk: 0,
		walk1: "0px 0px",
		walk2: "-32px 0px",
		walk3: "-62px 0px",
		walk4: "-94px 0px"
	}

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
			if (kirby.bottom < board.height){
				if (speedY <= 20) speedY += gravity;
				kirby.id.css("top", kirby.top+speedY);	
				ground = false;
			} else {
				speedY = 0;
				ground = true;
				kirby.id.css("top", board.height-kirby.id.height()); // sets kirby on top of bottom
				if(kirby.energy <= 80) kirby.energy += 20;
				else kirby.energy = 100;
			}
		} //end keyUp

		if (keyDown) {						/*************** kirby stone *****************/
			kirby.top = kirby.id.position().top;
		//	kirby.id.css("top", kirby.top+10);
			kirby.stone = true;
			kirby.id.css("background-position", kirby.stoneState);
		}
		
		/***************** reset boundaries *********************/
	//	if (kirby.bottom > board.height) kirby.id.css("bottom", board.height);
		

		/* horizontal movement */
		if (kirby.stone == false){
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

	}

	// Start Gravity loop
	var gravityLoop = setInterval(startGravity, 50);
	
	
	function kirbyWalk(){
		if (kirby.move && ground && kirby.stone == false) {
			if (kirby.walk == 0) {
				kirby.id.css("background-position", kirby.walk1);
				kirby.walk++;
			}
			else {
				kirby.id.css("background-position", kirby.walk2);
				kirby.walk--;
			}
		} else if(kirby.move == false && ground && kirby.stone == false) kirby.id.css("background-position", kirby.walk1);
	}
	
	var kirbyWalkLoop = setInterval(kirbyWalk, 300);
	
	
	
	
	
	/*********** waddleWalk ****************/
	function waddleWalk(){
		
			if (waddle.walk == 0) {
				if (direction > 0)
					waddle.id.css("background-position", waddle.walk1);
				else waddle.id.css("background-position", waddle.walk4);
				waddle.walk++;
			}
			else {
				if (direction > 0)
					waddle.id.css("background-position", waddle.walk2);
				else waddle.id.css("background-position", waddle.walk3);
				waddle.walk--;
			}
	
	}
	
	var waddleWalkLoop = setInterval(waddleWalk, 300);
	
	
	
	
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
	
	function moveEnemy(_enemy) {
		enemy = new Object();
		enemy.left = _enemy.position().left;
		enemy.top = _enemy.position().top;
		enemy.right = _enemy.position().left + _enemy.width();
		enemy.bottom = _enemy.position().top + _enemy.height();
		enemy.width = _enemy.width();
		enemy.height = _enemy.height();
		
		if (enemy.left < 0 || enemy.right > board.width-150) direction *=-1;	
		_enemy.css("left", enemy.left + direction);
	}
	// start gravity loop
	var enemyLoop = setInterval(function() {moveEnemy(waddle.id); }, 30); 
	

	/*********************** tree ****************************/
	
	function treeBreath() {
		console.log("breath");
		var t = setTimeout(treeBreathOut, 800);
	}
	
	function treeBreathOut() {
		tree.id.css("background-position", tree.state3);
		tree.blow = true;
		var z = setTimeout(treeBreathOutEnd, 2000);
	}
	
	function treeBreathOutEnd(){
		tree.blow = false;
		tree.id.css("background-position", tree.state1);
	}
	function treeBlow() {
		tree.id.css("background-position", tree.state2);
		var z = setTimeout(treeBreath, 800);
	}
	
	
	function windMove() {
		if (tree.blow && kirby.stone == false) {
			kirby.id.css("left", kirby.id.position().left-2);
		}	
	}
	
	var treeBlowLoop = setInterval(treeBlow, 8000); 
	var blowingWind = setInterval(windMove, 8);



	/********************* platform ***************************/

	function checkPlatform(_platform, _object, _offset) {

		var _platformTop = _platform.position().top;
		var _platformLeft = _platform.position().left;
		var _platformWidth = _platform.width();
		var _objectTop = _object.position().top;
		var _objectBottom = _object.position().top + _object.height();
		var _objectLeft = _object.position().left;
		var _objectWidth = _object.width();
		
		if (_platformTop+_offset <= _objectBottom  
			&& _platformTop+_offset >= _objectTop
			&& _platformLeft <= _objectLeft+_objectWidth  
			&& _platformLeft+_platformWidth >= _objectLeft){
				
			 speedY = 0; 
			if (kirby.stone && _platform == waddle.id) direction *=-1; // change enemy direction if hit while stone
			if (ground == false || kirby.stone == false) _object.css("top", _platformTop - _object.height() +_offset); // do not move kirby up if on the ground and stone
			
			if (_object == kirby.id && _platform == portal.id){
				ground=true;
				if(kirby.energy <= 80) kirby.energy += 20;
				else kirby.energy = 100;
			}
		}
		
	}

	var platformLoop = setInterval(function() { checkPlatform(portal.id, kirby.id, 95); }, 50);
	var movingBlock = setInterval(function() { checkPlatform(waddle.id, kirby.id, 0); }, 50);
	
	
	

	
	
	
	
	
	


}