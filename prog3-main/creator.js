let LivingCreature = require("./LeavingCreature")
let Grass  = require("./grass")
let GrassEater  = require("./grasseter")
let Predator  = require("./predator")
let Cleaner = require("./cleaner")
module.exports = class Creator extends LivingCreature {
	constructor(x, y) {
		super (x,y)
		this.energy = 100;
		this.adding = 0;
		this.multiply = 0;
		this.directions = [];
	}



	chooseCell(char) {
		this.getNewCoordinates()
		var found = [];
		for (var i in this.directions) {
			var x = this.directions[i][0];
			var y = this.directions[i][1];
			if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {

				if (matrix[y][x] == char) {
					found.push(this.directions[i]);
				}
			}
		}
		return found;
	}
	mul() {
		this.multiply++;
		var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

	
		if (newCell && this.multiply >= 20) {
			var newX = newCell[0];
			var newY = newCell[1];
			matrix[newY][newX] = 5;

			var cre = new Creator(newX, newY);
			creatorArr.push(cre);
			this.multiply = 0;
		}
		
	}
	move() {
		this.energy--
		var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
		if (newCell && this.energy >= 0) {
			
			var newX = newCell[0]
			var newY = newCell[1]
			matrix[newY][newX] = matrix[this.y][this.x]
			matrix[this.y][this.x] = 0
			this.x = newX
			this.y = newY
		}
		else {
			if (this.energy < 0) {
				this.die()
			}
		}
	}
	
	
	
				
	add() {
		this.adding++
		var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell && this.adding <= 90) {
			var newX = newCell[0];
			var newY = newCell[1];
			if (this.adding <= 30){
				matrix[newY][newX] = 3;
				var pre = new Predator(newX,newY)
				predatorArr.push(pre)
			}else if (this.adding <= 60){
				matrix[newY][newX] = 1;
				var gr = new Grass(newX,newY)
				grassArr.push(gr)
			}else if (this.adding <= 90){
				matrix[newY][newX] = 2;
				var grEat = new GrassEater(newX,newY)
				grassEaterArr.push(grEat)
			}else if (this.adding < 100){
				matrix[newY][newX] = 4;
				var cl = new Cleaner(newX,newY)
				cleanerArr.push(cl)
			}else if (this.adding > 100) {
				this.adding = 0
			}
		}
	
	}
	
	die() {
		matrix[this.y][this.x] = 0;
		for (var i in creatorArr) {
			if (this.x == creatorArr[i].x && this.y == creatorArr[i].y) {
				creatorArr.splice(i, 1);
				
			}
		}
		matrix[this.y][this.x] = 0 
		
	}




}