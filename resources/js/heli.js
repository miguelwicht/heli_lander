function trace (whatToTrace){

$('#trace').prepend(whatToTrace+"<br/>");
	
}


function main(){
	
	var myHeli = $('#heli'); 
	var key_up = "38";
	var key_down = "40";
	var key_left = "37";
	var key_right = "39";
	
	//gravity
	function startGravity(){
		var heliTop = myHeli.position().top;
		myHeli.css("top", heliTop+10);
	}

	// Start Gravity loop
	var gravityLoop = setInterval(startGravity, 50);
	
	$(document).keydown(function(event){
		trace(event.keyCode);
		if(event.keyCode==key_down){
			var heliTop = myHeli.position().top;
			myHeli.css("top",heliTop+60);
		}
			
		if(event.keyCode==key_up){
			var heliTop = myHeli.position().top;
			myHeli.css("top",heliTop-60);
		}
			
		if(event.keyCode==key_right){		
			var heliLeft = myHeli.position().left;
			myHeli.css("left",heliLeft+20);	
		}
			
		if(event.keyCode==key_left){		
			var heliLeft = myHeli.position().left;
			myHeli.css("left",heliLeft-20);	
		}
		
	}); //end keydown
	





}