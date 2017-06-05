//code

function copyArray2D(array){
	var auxArr = [];

	for(var i = 0; i < array.length; i++){
		var auxArrRow = [];
		for(var j = 0; j < array[i].length; j++){
			auxArrRow.push(array[i][j]);
		}
		auxArr.push(auxArrRow);
	}
	return auxArr;
}

function isArrow(key){
	if(key !== 37 && key !== 38 && key !== 39 && key !== 40 && key !== 32){
		return -1;
	}
	return key;
}	

function slide(direction){
	if(direction === "up"){
		for(var i = 0; i < myApp.state.length; i++){
			var cantCeros = 0;
			for(var j = 0; j < myApp.state[i].length; j++){
				if(myApp.state[j][i] === 0){
					cantCeros++;
				}else if(cantCeros !== 0 && myApp.state[j][i] !== 0){
					var pos = j - cantCeros;
					myApp.state[pos][i] = myApp.state[j][i];
					myApp.state[j][i] = 0;
				}
				
			}
		}	
	}else if(direction === "down"){
		for(var i = 3; 0 <= i; i--){
			var cantCeros = 0;
			for(var j = 3; 0 <= j; j--){
				if(myApp.state[j][i] === 0){
					cantCeros++;
				}else if(cantCeros !== 0  && myApp.state[j][i] !== 0){
					var pos = j + cantCeros;
					myApp.state[pos][i] = myApp.state[j][i];
					myApp.state[j][i] = 0;
				}
				
			}
		}
	}else if(direction === "right"){
		myApp.state.forEach(function(horizontales){
			horizontales.sort(function(a,b){
				if(a === 0){
					return -1;
				}else if(b === 0){
					return 1;
				}else{
					return 0;
				}
			});
		});
	}else{
		myApp.state.forEach(function(horizontales){
			horizontales.sort(function(a,b){
				if(a === 0){
					return 1;
				}else if(b === 0){
					return -1;
				}else{
					return 0;
				}
			});
		});
	}
}

var myApp = {
		state: [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]],
		counter: 1,
		draw: function(){
			var plane = this.state.join("</br>");
			var result = "";
			for(var i = 0; i < this.state.length; i++){
				for(var j = 0; j < this.state[i].length; j++){
					result += "<span class='block' data-coord='" + j + i + "'>" + this.state[i][j] + "</span>";
				}
				result += "<br>";
			}
			//plane = plane.join(" | ");
			this.workPlane.html(result);
		},
		cleanBoard: function(){
			this.state = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
		},
		init: function(){
			this.cleanBoard();
			this.getDom();
			this.events();
			this.draw();
			this.generate();
			this.draw();
		},
		getDom: function(){		
			this.workPlane = $("#app");
		},
		events: function(){
			document.addEventListener("keydown", function(e){myApp.movement(e.keyCode)});
		},
		movement: function(_arrowKey){
			
			var keyPressed = isArrow(_arrowKey);
			if(keyPressed > -1){
				this.newState = copyArray2D(this.state);
				console.log(this.newState);
				if(keyPressed == 39){
					//right
					(sumarNumerosContiguos.bind(myApp, keyPressed))();
					slide("right");
				}else if(keyPressed == 37){
					//left
					(sumarNumerosContiguos.bind(myApp, keyPressed))();
					slide("left");
				}else if(keyPressed == 40){
					//down
					(sumarNumerosContiguos.bind(myApp, keyPressed))();
					slide("down");
				}else if(keyPressed == 38){
					//up
					(sumarNumerosContiguos.bind(myApp, keyPressed))();
					slide("up");
				}
				if(keyPressed !== 32){
					var auxState = "";
					this.state.map((a)=> auxState += a.map((b)=>b));
					var auxNewState = "";
					this.newState.map((a)=> auxNewState += a.map((b)=>b));
					console.log(auxState === auxNewState);
					if(auxState === auxNewState){return}
					this.draw();
				}

				this.draw();
				this.generate();
				setTimeout(this.draw.bind(myApp), 700);
			}
		},
		generate: function(){
			// agrego al state actual nuevos 2
			var freePositions = this.espacioDisponible();
			var randomNewNumbers;
			if(freePositions.length == 0){
				console.log("No free positions")
				return;
			}else if(freePositions.length == 1){
				randomNewNumbers = 1;
			}else{
				randomNewNumbers = Math.floor((Math.random() * 3) + 1);
			}

			for(var i = 0; i < randomNewNumbers; i++){
				var randomFour = Math.random();
				var randomPos = Math.floor((Math.random() * (freePositions.length - 1)));
				var newNumber;
				if(randomFour < 0.11){
					newNumber = 4;
				}else{
					newNumber = 2;
				}
				this.state[freePositions[randomPos][0]][freePositions[randomPos][1]] = newNumber;
			}
			
		},
		espacioDisponible: function(){
			// chequeo que en state no haya espacios ocupados donde quiero dibujar nuevos 2
			var freePositions = [];
			for(var i = 0; i < this.state.length; i++){
				for(var j = 0; j < this.state[i].length; j++){
					if(this.state[i][j] === 0){
						freePositions.push([i,j]);
					}
				}
			}
			return freePositions;
		}
	};


$(document).ready(function(){
	
});



function sumarNumerosContiguos(_direccion){
	console.log(_direccion);
	if(_direccion === 39){
		//right
		this.state.forEach(function(horizontales){

			for(var i = horizontales.length - 1; 0 <= i; i--){
				// if current num is cero, skip position loop
				if(horizontales[i] === 0){
					continue;
				}
				// else
				aux = horizontales[i];
				for(var j = i - 1; 0 <= j; j--){
					if(horizontales[j] === 0){
						continue;
					}
					if(horizontales[i] !== horizontales[j] && horizontales[j] !== 0){
						break;
					}else{
						horizontales[i] += horizontales[j];
						horizontales[j] = 0;
						break;
					}
				}
			}
		});
	}else if(_direccion === 37){
		//left
		this.state.forEach(function(horizontales){
			for(var i = 0; i < horizontales.length; i++){
				// if current num is cero, skip position loop
				if(horizontales[i] === 0){
					continue;
				}
				// else
				for(var j = i + 1; j <= 3; j++){
					if(horizontales[j] === 0){
						continue;
					}
					if(horizontales[i] !== horizontales[j] && horizontales[j] !== 0){
						break;
					}else{
						horizontales[i] += horizontales[j];
						horizontales[j] = 0;
						break;
					}
				}
			}
		});
	}else if(_direccion === 38){
		//up
		for(var i = 0; i < 4; i++){
			var aux = 0;
			var auxPosX = 0;
			var auxPosY = 0; 
			console.log("hi");
			for(var j = 0; j < 4; j++){
				if(myApp.state[j][i] === 0 && aux === 0){
					continue;
				}else if(myApp.state[j][i] !== 0 && aux === 0 || myApp.state[j][i] !== 0 && aux !== myApp.state[j][i]){
					aux = myApp.state[j][i];
					auxPosI = i;
					auxPosJ = j;
				}else if(myApp.state[j][i] === aux){
					myApp.state[j][i] += aux;
					aux = 0;
					myApp.state[auxPosJ][auxPosI] = 0;
				}
			}
		}
	}
	else if(_direccion === 40){
		//down
		for(var i = 0; i < 4; i++){
			var aux = 0;
			var auxPosX = 0;
			var auxPosY = 0; 
			//var lastSum = false;
			for(var j = 3; 0 <= j; j--){
				if(myApp.state[j][i] !== 0 && aux === 0 || myApp.state[j][i] !== aux && myApp.state[j][i] !== 0){
					aux = myApp.state[j][i];
					auxPosI = i;
					auxPosJ = j;
					console.log("entre aca");
				}else if(myApp.state[j][i] === aux && aux !== 0){
					myApp.state[j][i] += aux;
					aux = 0;
					myApp.state[auxPosJ][auxPosI] = 0;
				}else if(!(myApp.state[j][i] === 0 && aux !== 0)){
					auxPosI = 0;
					auxPosJ = 0;
					aux = 0;
				}
			}
		}
	}
}
