let LivingCreature = require("./LeavingCreature")

module.exports = class GrassEater extends LivingCreature{
	constructor(x, y) {
		super(x,y)
		this.energy = 10;
		this.multiply = 0
		this.directions = [];
	}

	


	mul() {
		this.multiply++;
		var emptyCells = super.chooseCell(0);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

	
		if (newCell && this.multiply >= 15) {
			var newX = newCell[0];
			var newY = newCell[1];
			matrix[newY][newX] = 2;

			var grEat = new GrassEater(newX, newY);
			grassEaterArr.push(grEat);
			this.multiply = 0;
		}
		if (weath == "winter") {
			this.energy -= 4;
			this.multiply -= 4;
		}
		if (weath == "summer") {
			this.energy += 2;
			this.multiply += 2;
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

	eat() {
		var emptyCells = super.chooseCell(1);
		var newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]

		if (newCell) {
			this.energy++
			var newX = newCell[0]
			var newY = newCell[1]

			matrix[newY][newX] = matrix[this.y][this.x]
			matrix[this.y][this.x] = 0
			this.x = newX
			this.y = newY
			for (var i in grassArr) {
				if (newX == grassArr[i].x && newY == grassArr[i].y) {
					grassArr.splice(i, 1)
					break
				}
			}
		}
		else {
			this.move()
		}
	}

	die() {
		matrix[this.y][this.x] = 0;
		for (var i in grassEaterArr) {
			if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
				grassEaterArr.splice(i, 1);
				break;
			}
		}
	}
}

