//---------------------------------------------BASE CODE-----------------------------------
function World(){

	this.scale = 50; //the size of a room
	this.room_origin_x = 125; //starting x position of the world
	this.room_origin_y = 0; //starting y position of the world
	//room is the blocks of rooms that are allowed in this world. here you can just spawn rooms and edit them.
	//   [0,0][0,1][0,2][0,3][0,4]
	//   [1,0][1,1][1,2][1,3][1,4]
	//   [2,0][2,1][2,2][2,3][2,4]
	//   [3,0][3,1][3,2][3,3][3,4]
	//   [4,0][4,1][4,2][4,3][4,4]
	//   [5,0][5,1][5,2][5,3][5,4]
	//   [6,0][6,1][6,2][6,3][6,4]

	this.room = [
					[new Tile(this.room_origin_x, this.room_origin_y),										//[0][0]
					 new Tile(this.room_origin_x + this.scale, this.room_origin_y),							//[0][1]
					 new Tile(this.room_origin_x + (this.scale*2), this.room_origin_y),						//[0][2]
					 new Tile(this.room_origin_x + (this.scale*3), this.room_origin_y),						//[0][3]
					 new Tile(this.room_origin_x + (this.scale*4), this.room_origin_y)],					//[0][4]
					[new Tile(this.room_origin_x, this.room_origin_y + this.scale),							//[1][0]
					 new Tile(this.room_origin_x + this.scale, this.room_origin_y + this.scale),			//[1][1]
					 new Tile(this.room_origin_x + (this.scale*2), this.room_origin_y + this.scale),		//[1][2]
					 new Tile(this.room_origin_x + (this.scale*3), this.room_origin_y + this.scale),		//[1][3]
					 new Tile(this.room_origin_x + (this.scale*4), this.room_origin_y + this.scale)],		//[1][4]
					[new Tile(this.room_origin_x, this.room_origin_y + (this.scale*2)),						//[2][0]
					 new Tile(this.room_origin_x + this.scale, this.room_origin_y + (this.scale*2)),		//[2][1]
					 new Tile(this.room_origin_x + (this.scale*2), this.room_origin_y + (this.scale*2)),	//[2][2]
					 new Tile(this.room_origin_x + (this.scale*3), this.room_origin_y + (this.scale*2)),	//[2][3]
					 new Tile(this.room_origin_x + (this.scale*4), this.room_origin_y + (this.scale*2))],	//[2][4]
					[new Tile(this.room_origin_x, this.room_origin_y + (this.scale*3)),						//[3][0]
					 new Tile(this.room_origin_x + this.scale, this.room_origin_y + (this.scale*3)),		//[3][1]
					 new Tile(this.room_origin_x + (this.scale*2), this.room_origin_y + (this.scale*3)),	//[3][2]
					 new Tile(this.room_origin_x + (this.scale*3), this.room_origin_y + (this.scale*3)),	//[3][3]
					 new Tile(this.room_origin_x + (this.scale*4), this.room_origin_y + (this.scale*3))],	//[3][4]
					[new Tile(this.room_origin_x, this.room_origin_y + (this.scale*4)),						//[4][0]
					 new Tile(this.room_origin_x + this.scale, this.room_origin_y + (this.scale*4)),		//[4][1]
					 new Tile(this.room_origin_x + (this.scale*2), this.room_origin_y + (this.scale*4)),	//[4][2]
					 new Tile(this.room_origin_x + (this.scale*3), this.room_origin_y + (this.scale*4)),	//[4][3]
					 new Tile(this.room_origin_x + (this.scale*4), this.room_origin_y + (this.scale*4))],	//[4][4]
					[new Tile(this.room_origin_x, this.room_origin_y + (this.scale*5)),						//[5][0]
					 new Tile(this.room_origin_x + this.scale, this.room_origin_y + (this.scale*5)),		//[5][1]
					 new Tile(this.room_origin_x + (this.scale*2), this.room_origin_y + (this.scale*5)),	//[5][2]
					 new Tile(this.room_origin_x + (this.scale*3), this.room_origin_y + (this.scale*5)),	//[5][3]
					 new Tile(this.room_origin_x + (this.scale*4), this.room_origin_y + (this.scale*5))],	//[5][4]
					[new Tile(this.room_origin_x, this.room_origin_y + (this.scale*6)),						//[6][0]
					 new Tile(this.room_origin_x + this.scale, this.room_origin_y + (this.scale*6)),		//[6][1]
					 new Tile(this.room_origin_x + (this.scale*2), this.room_origin_y + (this.scale*6)),	//[6][2]
					 new Tile(this.room_origin_x + (this.scale*3), this.room_origin_y + (this.scale*6)),	//[6][3]
					 new Tile(this.room_origin_x + (this.scale*4), this.room_origin_y + (this.scale*6))]	//[6][4]
				];
	
	//similar to add but automatically allows movement back
	this.placeRoom = function(x,y,z){
		switch(z){
			case "top":
				this.add(x,y,z);
				this.add(x-1,y,"down");
				break;
			case "left":
				this.add(x,y,z);
				this.add(x,y-1,"right");
				break;
			case "right":
				this.add(x,y,z);
				this.add(x,y+1,"left");
				break;
			case "down":
				this.add(x,y,z);
				this.add(x+1,y,"top");
				break;
		}
	}
	this.resetWorld = function(){
		for(i = 0; i<7; i++){
			for(j = 0; j<5; j++){
				this.room[i][j].value = 0;
			}
		}
	}
	//lets the user be able to move to a direction z from tile(x,y)
	this.add = function(x,y,z){
		this.room[x][y].passed = true;
		switch(z){
			case "top":
				this.room[x][y].topdoor = true;
				break;
			case "left":
				this.room[x][y].leftdoor = true;
				break;
			case "right":
				this.room[x][y].rightdoor = true;
				break;
			case "down":
				this.room[x][y].downdoor = true;
				break;
		}
	}
	
	//lets the user remove a desired string z on tile(x,y).
	this.remove = function(x,y,z){
		switch(z){
			case "top":
				this.room[x][y].topdoor = false;
				break;
			case "left":
				this.room[x][y].leftdoor = false;
				break;
			case "right":
				this.room[x][y].rightdoor = false;
				break;
			case "down":
				this.room[x][y].downdoor = false;
				break;
		}
	}
	
	//draws the room with all the tiles
	this.draw = function(){
		for(i = 0; i<7; i++){
			for(j = 0; j<5; j++){
				this.room[i][j].draw();
			}
		}
	}
	
	//adds safe on tile (x, y)
	this.addSafe = function(x,y){
		this.room[x][y].placeSafe();
	}
	
	//removes safe on tile (x, y)
	this.removeSafe = function(x,y){
		this.room[x][y].remove6Safe();
	}

	this.checkValues = function(){
		var temp = 0;
		for(i = 0; i<7; i++){
			for(j = 0; j<5; j++){
				if(this.room[i][j].passed){
					temp++;
				}
			}
		}
		return temp;
	}
}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    
    document.body.appendChild(this.sound);
    
    this.play = function(){
        this.sound.play();
    }
    
    this.stop = function(){
        this.sound.pause();
    }
}

function Tile(tile_x, tile_y){
	this.scale = 50; //the size of the entire tile on x axiz and y axis
	this.positionx = tile_x; //the x-position of the tile in the canvas
	this.positiony = tile_y; // the y-position of the tile in the canvas
	this.topdoor = false; //boolean if it is possible to go up.
	this.downdoor = false; //boolean if it is possible to go down
	this.leftdoor = false; //boolean if it is possible to go left
	this.rightdoor = false; //boolean if it is possible to go right
	this.vision = false; //for fog of war purposes.
	this.passed = false;
	this.value = 0;
	this.hasSafe = false;
	this.safe = new Image();
	this.safe.src = "images/Safe.png"
	
	//draws the said tile
	this.draw = function(){
		var topvalue = 0;
		var downvalue = 0;
		var rightvalue = 0;
		var leftvalue = 0;
		if(this.passed){
			if(this.value == 0)
				ctx.fillStyle = "#768";
			else if(this.value == 1)
				ctx.fillStyle = "#99FF99";
		}
		else
			ctx.fillStyle = "#111";
		
		if(!this.topdoor)
			topvalue = 2;
		if(!this.downdoor)
			downvalue = 2;
		if(!this.leftdoor)
			leftvalue = 2;
		if(!this.rightdoor)
			rightvalue = 2;

		ctx.fillRect(this.positionx+leftvalue, this.positiony+topvalue, this.scale-rightvalue-leftvalue, this.scale-topvalue-downvalue);
		
		ctx.fillStyle = "#5f4";
		if(this.hasSafe){
			//ctx.fillRect(this.positionx+leftvalue+((this.scale/6)*4), this.positiony+topvalue+((this.scale/5)*2), this.scale/6, this.scale/5);
			ctx.drawImage(this.safe, 100*frame, 0, 100, 100, this.positionx, this.positiony, 50, 50);
		}

	}
	
	this.placeSafe = function(){
		this.hasSafe = true;
	}
	
	this.removeSafe = function(){
		this.hasSafe = true;
	}
}

function Person(){
	this.canMove = true;
	this.scale = 10; //the scale of the player in the canvas
	this.positionx = 0; //the xposition of the person in the 2d array world
	this.positiony = 0; //the xposition of the person in the 2d array world
	this.thief = new Image();
	this.thief.src = "images/Thief.png"
	//draws the person
	
	this.draw = function(){
		ctx.fillStyle = "#206067";
		// ctx.fillRect((this.positionx*50)+145, (this.positiony*50)+20, this.scale, this.scale);
		console.log(this.positionx, this.positiony);
		ctx.drawImage(this.thief, frame*100 , 0, 100, 100, (this.positionx*50)+125, this.positiony*50, 50, 50);
	}
	
	this.setPosition = function(x,y){
		this.positionx = x;
		this.positiony = y;
	}
}

var mySound;
mySound = new sound("Music/fastmusic.mp3");


function Level(levelnumber){
	this.value = levelnumber;
	this.gameWorld = new World(); //the world we interact with
	this.player = new Person(); // the player of the game
	this.guardSize = 0;//the number of guards in a level;
	this.guard = [];//the array of guards
	this.enemySpeed = 3;//speed of the enemy, max is 10. min is 0, the higher the number, the faster the enemy
	//similar to add but automatically allows movement back
	this.StartX = 0;
	this.StartY = 0;
	this.requirements = 0;
	this.current = 0;

	this.placeRoom = function(x,y,z){
		this.gameWorld.placeRoom(x,y,z);
	}
	
	///makes the level able to make a particular tile[x][y] possible to go to a direction z
	this.add = function(x,y,z){
		this.gameWorld.add(x,y,z);
	}
	
	///makes the level able to make a particular tile[x][y] not possible to go to a direction z
	this.remove = function(x,y,z){
		this.gameWorld.remove(x,y,z);
	}
	
	//places a guard in the room on position (x,y)
	this.addGuard = function(x,y){
		var temp = new Guard();
		temp.setPosition(x,y);
		this.guard.push(temp);
		this.guardSize++;
	}
	
	//adds destination path to a guard[a]
	this.setDestination = function(a,x,y){
		if(this.guardSize > 0)
			this.guard[a].addDestination(x,y);
	}
	
	this.enterRoom = function(){
		this.gameWorld.room[this.player.positiony][this.player.positionx].vision = true;
		if(this.gameWorld.room[this.player.positiony][this.player.positionx].value == 0){
			this.gameWorld.room[this.player.positiony][this.player.positionx].value = 1;
			this.checkGuard(this.player.positionx, this.player.positiony);
			this.current++;
			console.log("Score: " + this.current);
		}
		else{
			this.gameWorld.resetWorld();
			this.startPlayer(this.StartY, this.StartX);
		}
	}
	
	this.leaveRoom = function(){
		this.gameWorld.room[this.player.positiony][this.player.positionx].passed = true;
		this.gameWorld.room[this.player.positiony][this.player.positionx].vision = false;
	}
	
	//draws the world and the player
	this.draw = function(){
		this.gameWorld.draw();
		for(i=0; i < this.guardSize; i++){
			this.guard[i].draw();
		}
		this.player.draw();
	}
	
	this.updateLevel = function(){
		mySound.play();

		if(this.player.canMove)
			this.movePlayer();
	}
	
	this.placeSafe = function(x,y){
		this.gameWorld.addSafe(x,y);
	}
	
	this.removeSafe = function(x,y){
		this.gameWorld.removeSafe(x,y);
	}
	
	//moves the player based on user inputs and checks if it is possible to move
	this.movePlayer = function(){
		if(moveUp){
			if(this.player.positiony > 0)
				if(this.gameWorld.room[this.player.positiony][this.player.positionx].topdoor && this.gameWorld.room[this.player.positiony-1][this.player.positionx].downdoor){
					this.leaveRoom();
					this.player.positiony--;
					this.enterRoom();
				}
		}
		if(moveDown){
			if(this.player.positiony < 6)
				if(this.gameWorld.room[this.player.positiony][this.player.positionx].downdoor && this.gameWorld.room[this.player.positiony+1][this.player.positionx].topdoor){
					this.leaveRoom();
					this.player.positiony++;
					this.enterRoom();
				}
		}
		if(moveLeft){
			if(this.player.positionx > 0)
				if(this.gameWorld.room[this.player.positiony][this.player.positionx].leftdoor && this.gameWorld.room[this.player.positiony][this.player.positionx-1].rightdoor){
					this.leaveRoom();
					this.player.positionx--;
					this.enterRoom();
				}
		}
		if(moveRight){
			if(this.player.positionx < 4)
				if(this.gameWorld.room[this.player.positiony][this.player.positionx].rightdoor && this.gameWorld.room[this.player.positiony][this.player.positionx+1].leftdoor){
					this.leaveRoom();
					this.player.positionx++;
					this.enterRoom();
				}
		}
	}
	
	this.moveGuard = function(){
		for(i=0; i < this.guardSize; i++){
			this.guard[i].move();
			this.fightGuard(this.guard[i].positionx, this.guard[i].positiony);
		}
	}

	this.checkGuard = function(x,y){
		for(i=0; i < this.guardSize; i++){
			console.log("Enemy: " + this.guard[i].positionx + ", " + this.guard[i].positiony);
			console.log("Player: " + x + ", " + y);
			if(this.guard[i].positionx == x && this.guard[i].positiony == y){
				this.gameWorld.resetWorld();
				this.startPlayer(this.StartY, this.StartX);
			}
		}
	}

	this.startPlayer = function(x,y){
		this.current = 1;
		this.player.setPosition(y,x);
		this.gameWorld.room[this.player.positiony][this.player.positionx].value = true;
		this.StartX = y;
		this.StartY = x;

	}
	
	this.Finish = function(){
		return this.gameWorld.room[this.player.positiony][this.player.positionx].hasSafe;
	}
	
	this.clearGuard = function(){
		this.guardSize = 0;
		this.guard = [];
	}

	this.fightGuard = function(x,y){
		if(this.player.positionx == x && this.player.positiony == y){
			this.gameWorld.resetWorld();
			this.startPlayer(this.StartY, this.StartX);
		}
	}
	this.checkValues = function(){
		this.requirements = this.gameWorld.checkValues();
		console.log(this.requirements);
	}

	this.interactPlayer = function(){

	}
}

function Guard(){
	this.scale = 20;
	this.canMove = true;
	this.timer = 10;
	this.positionx = 0;
	this.positiony = 0;
	this.bodyclock = 0;
	this.state  = 0;//Normal State is 0, Warning State is 1, Alert State is 2
	this.nextPositionx = [];
	this.nextPositiony = [];
	this.guard = new Image();
	this.guard.src = "images/Guard.png";

	this.setPosition = function(y,x){
		this.nextPositionx.push(x);
		this.nextPositiony.push(y);
		this.positionx = x;
		this.positiony = y;
	}
	this.move = function(){
		var x = this.nextPositionx.shift();
		var y = this.nextPositiony.shift();
		this.positionx = x;
		this.positiony = y;
		this.addDestination(y,x);
	}
	this.addDestination = function(y,x){
		this.nextPositionx.push(x);
		this.nextPositiony.push(y);
	}
	this.updateState = function(x){
	}
	this.draw = function(){
		ctx.fillStyle = "#f55";
		//ctx.fillRect((this.positionx*50)+140, (this.positiony*50)+15, this.scale, this.scale);
		ctx.drawImage(this.guard, frame*100 , 0, 100, 100, (this.positionx*50)+125, this.positiony*50, 50, 50);
	}
	this.checkPosition = function(x,y){
		if(x == this.positionx && y == this.positiony){
			return true;
		}
		return false;
	}
}
//---------------------------------------INPUTS-----------------------------------------------
//key listeners for desired input
var moveUp = false;
var moveDown = false;
var moveLeft = false;
var moveRight = false;
var interaction = false;
document.onkeydown = function(event){
	switch(event.keyCode){
		//left
		case 65:
		case 37:
			moveLeft = true;
			break;	
		//up
		case 87:
		case 38:
			moveUp = true;
			break;
		//right
		case 68:
		case 39:
			moveRight = true;
			break;
		//down
		case 83:
		case 40: 
			moveDown = true;
			break;
		case 32:
			interaction = true;
			break;
	}
}

document.onkeyup = function(event){
	moveLeft = false;
	moveUp = false;
	moveRight = false;
	moveDown = false;
	interaction = false
}
//-----------------Level Design----------------------------------
//room is the blocks of rooms that are allowed in this world. here you can just spawn rooms and edit them.
//   [0,0][0,1][0,2][0,3][0,4]
//   [1,0][1,1][1,2][1,3][1,4]
//   [2,0][2,1][2,2][2,3][2,4]
//   [3,0][3,1][3,2][3,3][3,4]
//   [4,0][4,1][4,2][4,3][4,4]
//   [5,0][5,1][5,2][5,3][5,4]
//   [6,0][6,1][6,2][6,3][6,4]
var ctx = document.getElementById("canvas").getContext("2d");

var Level0 = new Level(0);
var Level1 = new Level(1);
var Level2 = new Level(2);
var Level3 = new Level(3);
var Level4 = new Level(4);

function LevelDesign(){

//LEVEL 1
Level0.startPlayer(3,2);
	Level0.placeRoom(1,0,"right");
	Level0.placeRoom(1,1,"right");
	Level0.placeRoom(1,2,"right");
	Level0.placeRoom(1,3,"right");
	Level0.placeRoom(1,0,"down");
	Level0.placeRoom(1,1,"down");
	Level0.placeRoom(1,2,"down");
	Level0.placeRoom(1,3,"down");
	Level0.placeRoom(1,4,"down");
	
	Level0.placeRoom(2,0,"right");
	Level0.placeRoom(2,1,"right");
	Level0.placeRoom(2,2,"right");
	Level0.placeRoom(2,3,"right");
	Level0.placeRoom(2,0,"down");
	Level0.placeRoom(2,1,"down");
	Level0.placeRoom(2,2,"down");
	Level0.placeRoom(2,3,"down");
	Level0.placeRoom(2,4,"down");

	Level0.placeRoom(3,0,"right");
	Level0.placeRoom(3,1,"right");
	Level0.placeRoom(3,2,"right");
	Level0.placeRoom(3,3,"right");
	Level0.placeRoom(3,0,"down");
	Level0.placeRoom(3,1,"down");
	Level0.placeRoom(3,2,"down");
	Level0.placeRoom(3,3,"down");
	Level0.placeRoom(3,4,"down");

	Level0.placeRoom(4,0,"right");
	Level0.placeRoom(4,1,"right");
	Level0.placeRoom(4,2,"right");
	Level0.placeRoom(4,3,"right");
	Level0.placeRoom(3,0,"down");
	Level0.placeRoom(3,1,"down");
	Level0.placeRoom(3,2,"down");
	Level0.placeRoom(3,3,"down");
	Level0.placeRoom(3,4,"down");

	Level0.placeRoom(5,0,"right");
	Level0.placeRoom(5,1,"right");
	Level0.placeRoom(5,2,"right");
	Level0.placeRoom(5,3,"right");
	Level0.placeRoom(3,0,"down");
	Level0.placeRoom(3,1,"down");
	Level0.placeRoom(3,2,"down");
	Level0.placeRoom(3,3,"down");
	Level0.placeRoom(3,4,"down");
	Level0.placeRoom(4,0,"down");
	Level0.placeRoom(4,1,"down");
	Level0.placeRoom(4,2,"down");
	Level0.placeRoom(4,3,"down");
	Level0.placeRoom(5,0,"down");
	Level0.placeRoom(5,1,"down");
	Level0.placeRoom(5,2,"down");
	Level0.placeRoom(5,3,"down");
	Level0.placeRoom(4,4,"down");

	Level0.placeRoom(6,0,"right");
	Level0.placeRoom(6,1,"right");
	Level0.placeRoom(6,2,"right");


	Level0.checkValues();
	Level0.clearGuard();

	Level0.addGuard(1,0);
	Level0.setDestination(0,2,0);
	Level0.setDestination(0,3,0);
	Level0.setDestination(0,4,0);
	Level0.setDestination(0,5,0);
	Level0.setDestination(0,5,1);
	Level0.setDestination(0,5,2);
	Level0.setDestination(0,5,3);
	Level0.setDestination(0,5,4);
	Level0.setDestination(0,4,4);
	Level0.setDestination(0,3,4);
	Level0.setDestination(0,2,4);
	Level0.setDestination(0,1,4);
	Level0.setDestination(0,1,3);
	Level0.setDestination(0,1,2);
	Level0.setDestination(0,1,1);

	Level0.addGuard(2,1);
	Level0.setDestination(1,3,1);
	Level0.setDestination(1,4,1);
	Level0.setDestination(1,4,2);
	Level0.setDestination(1,4,3);
	Level0.setDestination(1,3,3);
	Level0.setDestination(1,2,3);
	Level0.setDestination(1,2,2);

	Level0.placeSafe(6,3);

	

//LEVEL 2
	Level1.startPlayer(0,0);
	Level1.placeRoom(0,0,"right");
	Level1.placeRoom(0,1,"down");
	Level1.placeRoom(0,2,"right");
	Level1.placeRoom(0,3,"right");
	Level1.placeRoom(0,4,"down");
	Level1.placeRoom(1,4,"down");
	Level1.placeRoom(2,4,"down");
	Level1.placeRoom(3,4,"down");
	Level1.placeRoom(4,4,"down");
	Level1.placeRoom(5,4,"down");

	Level1.placeRoom(2,3,"down");
	Level1.placeRoom(3,3,"down");

	Level1.placeRoom(1,1,"down");
	Level1.placeRoom(2,0,"down");
	Level1.placeRoom(2,0,"right");
	Level1.placeRoom(3,0,"down");
	Level1.placeRoom(4,0,"down");
	Level1.placeRoom(5,0,"down");

	Level1.placeRoom(0,4,"down");
	Level1.placeRoom(1,4,"down");
	Level1.placeRoom(2,4,"down");
	Level1.placeRoom(3,4,"down");
	Level1.placeRoom(4,4,"down");

	Level1.placeRoom(6,0,"right");
	Level1.placeRoom(6,1,"right");
	Level1.placeRoom(5,2,"down");
	Level1.placeRoom(4,2,"down");
	Level1.placeRoom(5,1,"right");

	Level1.placeRoom(4,1,"down");
	Level1.placeRoom(5,1,"down");
	Level1.placeRoom(4,1,"right");
	Level1.placeRoom(4,0,"right");
	Level1.placeRoom(5,0,"right");
	Level1.placeRoom(4,2,"right");
	Level1.placeRoom(0,2,"down");
	Level1.placeRoom(1,2,"down");
	Level1.placeRoom(2,2,"right");

	Level1.placeRoom(0,1,"right");
	Level1.placeRoom(1,1,"right");
	Level1.placeRoom(2,1,"right");

	Level1.placeRoom(2,3,"right");
	Level1.placeRoom(3,3,"right");
	Level1.placeRoom(4,3,"right");


	Level1.checkValues();
	Level1.clearGuard();

	Level1.placeSafe(6,4);
//   [0,0][0,1][0,2][0,3][0,4]
//   [1,0][1,1][1,2][1,3][1,4]
//   [2,0][2,1][2,2][2,3][2,4]
//   [3,0][3,1][3,2][3,3][3,4]
//   [4,0][4,1][4,2][4,3][4,4]
//   [5,0][5,1][5,2][5,3][5,4]
//   [6,0][6,1][6,2][6,3][6,4]
	Level1.addGuard(4,0);
	Level1.setDestination(0,5,0);
	Level1.setDestination(0,6,0);
	Level1.setDestination(0,6,1);
	Level1.setDestination(0,6,2);
	Level1.setDestination(0,5,2);
	Level1.setDestination(0,4,2);
	Level1.setDestination(0,4,1);
	
	Level1.addGuard(0,2);
	Level1.setDestination(1,0,3);
	Level1.setDestination(1,0,4);
	Level1.setDestination(1,1,4);
	Level1.setDestination(1,2,4);
	Level1.setDestination(1,2,3);
	Level1.setDestination(1,2,2);
	Level1.setDestination(1,1,2);

//LEVEL 3
	Level2.startPlayer(0,1);
	Level2.placeRoom(0,1,"down");
	Level2.placeRoom(1,1,"left");
	Level2.placeRoom(1,0,"down");
	Level2.placeRoom(2,0,"down");
	Level2.placeRoom(2,4,"down");
	Level2.placeRoom(3,0,"right");
	Level2.placeRoom(3,4,"left");
	Level2.placeRoom(3,1,"down");
	Level2.placeRoom(3,3,"down");
	Level2.placeRoom(2,2,"down");
	Level2.placeRoom(3,1,"right");
	Level2.placeRoom(3,3,"left");
	Level2.placeRoom(5,1,"left");
	Level2.placeRoom(4,1,"down");
	Level2.placeRoom(4,3,"down");
	Level2.placeRoom(5,1,"right");
	Level2.placeRoom(5,2,"right");
	Level2.placeRoom(5,3,"right");
	Level2.placeRoom(5,0,"down");
	Level2.placeRoom(5,4,"down");
	Level2.placeRoom(5,2,"down");
	Level2.placeRoom(6,0,"right");
	Level2.placeRoom(6,1,"right");
	Level2.placeRoom(3,2,"down");
	Level2.placeRoom(4,2,"down");
	Level2.placeRoom(2,2,"right");
	Level2.placeRoom(2,2,"right");
	Level2.placeRoom(2,3,"right");
	Level2.placeRoom(0,3,"down");
	Level2.placeRoom(0,3,"right");
	Level2.placeRoom(0,4,"down");
	Level2.placeRoom(1,3,"right");
	Level2.placeRoom(1,3,"down");
	Level2.placeRoom(1,4,"down");
	Level2.placeRoom(5,1,"down");
	Level2.placeRoom(1,2,"down");
	Level2.placeRoom(1,2,"right");
	Level2.placeRoom(1,1,"right");
	Level2.placeRoom(0,2,"right");
	Level2.placeRoom(0,2,"down");
	Level2.placeRoom(0,2,"left");

	Level2.checkValues();
	Level2.clearGuard();

	Level2.addGuard(1,0);
	Level2.setDestination(0,2,0);
	Level2.setDestination(0,3,0);
	Level2.setDestination(0,3,1);
	Level2.setDestination(0,3,2);
	Level2.setDestination(0,2,2);
	Level2.setDestination(0,1,2);
	Level2.setDestination(0,1,1);

	Level2.addGuard(0,4);
	Level2.setDestination(1,1,4);
	Level2.setDestination(1,2,4);
	Level2.setDestination(1,2,3);
	Level2.setDestination(1,2,2);
	Level2.setDestination(1,1,2);
	Level2.setDestination(1,0,2);
	Level2.setDestination(1,0,3);

	Level2.placeSafe(6,4); //Level1.placeSafe(6,4); //
	
//LEVEL 4
	Level3.startPlayer(0,0);
	Level3.placeRoom(0,0,"right");
	Level3.placeRoom(0,1,"down");
	Level3.placeRoom(1,1,"down");
	Level3.placeRoom(2,1,"down");
	Level3.placeRoom(1,3,"top");
	Level3.placeRoom(0,3,"right");
	Level3.placeRoom(0,4,"down");
	Level3.placeRoom(1,1,"right");
	Level3.placeRoom(1,2,"down");
	Level3.placeRoom(1,2,"right");
	Level3.placeRoom(1,3,"right");
	Level3.placeRoom(1,4,"down");
	Level3.placeRoom(2,4,"down");
	Level3.placeRoom(3,4,"left");
	Level3.placeRoom(2,2,"down");
	Level3.placeRoom(3,2,"right");
	Level3.placeRoom(3,2,"down");
	Level3.placeRoom(4,2,"down");
	Level3.placeRoom(3,2,"left");
	Level3.placeRoom(3,1,"left");
	Level3.placeRoom(3,0,"down");
	Level3.placeRoom(3,3,"down");
	Level3.placeRoom(4,3,"down");
	Level3.placeRoom(4,0,"down");
	Level3.placeRoom(5,0,"right");
	Level3.placeRoom(5,1,"right");
	Level3.placeRoom(5,2,"right");
	Level3.placeRoom(5,3,"down");
	Level3.checkValues();
	Level3.placeSafe(6,3); // Level0.placeSafe(6,3);
	
	Level3.addGuard(1,4);
	Level3.setDestination(0,1,3);
	Level3.setDestination(0,1,2);
	Level3.setDestination(0,2,2);
	Level3.setDestination(0,3,2);
	Level3.setDestination(0,3,3);
	Level3.setDestination(0,3,4);
	Level3.setDestination(0,2,4);
//LEVEL 5
	Level4.startPlayer(6,3);
	Level4.placeRoom(6,3,"right");
	Level4.placeRoom(5,4,"down");
	Level4.placeRoom(4,4,"down");
	Level4.placeRoom(3,4,"down");
	Level4.placeRoom(2,4,"down");
	Level4.placeRoom(1,4,"down");
	Level4.placeRoom(0,4,"down");
	Level4.placeRoom(4,2,"down");
	Level4.placeRoom(5,2,"down");

	Level4.placeRoom(3,0,"down");
	Level4.placeRoom(3,1,"down");
	Level4.placeRoom(3,3,"down");
	Level4.placeRoom(3,4,"down");
	Level4.placeRoom(2,3,"down");
	
	Level4.placeRoom(0,0,"down");
	Level4.placeRoom(1,0,"down");
	Level4.placeRoom(4,0,"down");
	Level4.placeRoom(5,0,"down");

	Level4.placeRoom(2,0,"down");
	Level4.placeRoom(2,1,"down");
	Level4.placeRoom(2,4,"down");

	Level4.placeRoom(4,4,"left");
	Level4.placeRoom(4,3,"left");
	Level4.placeRoom(4,2,"left");
	Level4.placeRoom(4,1,"left");
	Level4.placeRoom(3,4,"left");
	Level4.placeRoom(3,1,"left");
	Level4.placeRoom(2,4,"left");
	Level4.placeRoom(2,3,"left");
	Level4.placeRoom(2,2,"left");
	Level4.placeRoom(2,1,"left");

	Level4.placeRoom(6,2,"right");
	Level4.placeRoom(0,0,"right");
	Level4.placeRoom(0,1,"right");
	Level4.placeRoom(0,2,"right");
	Level4.placeRoom(0,3,"right");
	Level4.placeRoom(6,0,"right");
	Level4.placeRoom(6,1,"right");
	Level4.placeRoom(6,2,"right");
	Level4.placeRoom(6,3,"right");

	Level4.checkValues();
	Level4.clearGuard();

	Level4.addGuard(4,2);
	Level4.setDestination(0,5,2);
	Level4.setDestination(0,6,2);
	Level4.setDestination(0,6,3);
	Level4.setDestination(0,6,4);
	Level4.setDestination(0,5,4);
	Level4.setDestination(0,4,4);
	Level4.setDestination(0,4,3);

	Level4.addGuard(0,0);
	Level4.setDestination(1,1,0);
	Level4.setDestination(1,2,0);
	Level4.setDestination(1,2,1);
	Level4.setDestination(1,2,2);
	Level4.setDestination(1,2,3);
	Level4.setDestination(1,2,4);
	Level4.setDestination(1,1,4);
	Level4.setDestination(1,0,4);
	Level4.setDestination(1,0,3);
	Level4.setDestination(1,0,2);
	Level4.setDestination(1,0,1);

	Level4.addGuard(6,0);
	Level4.setDestination(2,6,1);
	Level4.setDestination(2,6,2);
	Level4.setDestination(2,5,2);
	Level4.setDestination(2,4,2);
	Level4.setDestination(2,4,1);
	Level4.setDestination(2,4,0);
	Level4.setDestination(2,5,0);

	Level4.placeSafe(4,3); //Level1.placeSafe(6,4); //

}

//-------------------------------------MAIN LOOP-------------------------------------------
//Update - where everything will be created and played out. The main loop
var Speed = 2;
var Counter = 10;
var levelctr = 0;
var frame = 0;

LevelDesign();
function Update(){
	if(Counter <= 0){
		Counter = 10;
		switch(levelctr){
			case 0:
				Level0.moveGuard();
				break;
			case 1:
				Level1.moveGuard();
				break;
			case 2:
				Level2.moveGuard();
				break;
			case 3:
				Level3.moveGuard();
				break;
			case 4:
				Level4.moveGuard();
				break;
			case 5:
				Level5.moveGuard();
				break;
		}
	}
	if(frame >= 4){
		frame = 0;;
	}

	ctx.fillStyle = "#000";
	ctx.clearRect(0,0,500,500);
	ctx.fillRect(0,0,500,500);
	switch(levelctr){
		case 0:
			Level0.updateLevel();
			Level0.draw();
			if(Level0.Finish() && Level0.current == Level0.requirements){ // && Level0.current == Level0.requirements
				levelctr++;
			}
			Level1.fightGuard();
			break;
		case 1:
			Level1.updateLevel();
			Level1.draw();
			if(Level1.Finish() && Level1.current == Level1.requirements){
				levelctr++;
			}
			Level1.fightGuard();
			break;
		case 2:
			Level2.updateLevel();
			Level2.draw();
			if(Level2.Finish() && Level2.current == Level2.requirements){
				levelctr++;
			}
			Level2.fightGuard();
			break;
		case 3:
			Level3.updateLevel();
			Level3.draw();
			if(Level3.Finish() && Level3.current == Level3.requirements){
				levelctr++;
			}
			Level3.fightGuard();
			break;
		case 4:
			Level4.updateLevel() && Level4.current == Level4.requirements;
			Level4.draw();
			if(Level4.Finish()){ // && Level2.current == Level2.requirements
				levelctr++;
			}
			Level4.fightGuard();
			break;
	}
	frame++;
	Counter -= Speed;
}
//setInterval - loops a function update for every 40 ms
setInterval(Update,100);