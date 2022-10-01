var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require("fs")
app.use(express.static("."));

app.get('/', function (req, res) {
   res.redirect('index.html');
});

server.listen(3000, () => {
    console.log("run server");
} );



function matrixGenerator(matrixSize, grassCount, grEatCount, predatorCount, cleanerCount, creatorCount) {
	let matrix = [];
	for (let i = 0; i < matrixSize; i++) {
		matrix[i] = []
		for (let j = 0; j < matrixSize; j++) {
			matrix[i][j] = 0
		}
	}
	for (let i = 0; i < grassCount; i++) {
		let x = Math.floor(Math.random() * matrixSize)
		let y = Math.floor(Math.random() * matrixSize)


		if (matrix[y][x] == 0) {
			matrix[y][x] = 1

		}

	}
	for (let i = 0; i < grEatCount; i++) {
		let x = Math.floor(Math.random() * matrixSize)
		let y = Math.floor(Math.random() * matrixSize)


		if (matrix[y][x] == 0) {
			matrix[y][x] = 2

		}

	}
	for (let i = 0; i < predatorCount; i++) {
		let x = Math.floor(Math.random() * matrixSize)
		let y = Math.floor(Math.random() * matrixSize)


		if (matrix[y][x] == 0) {
			matrix[y][x] = 3

		}

	}
	for (let i = 0; i < cleanerCount; i++) {
		let x = Math.floor(Math.random() * matrixSize)
		let y = Math.floor(Math.random() * matrixSize)


		if (matrix[y][x] == 0) {
			matrix[y][x] = 4

		}

	}
	for (let i = 0; i < creatorCount; i++) {
		let x = Math.floor(Math.random() * matrixSize)
		let y = Math.floor(Math.random() * matrixSize)


		if (matrix[y][x] == 0) {
			matrix[y][x] = 5

		}

	}

	return matrix


}
matrix = matrixGenerator(35, 17.5, 20, 25, 4, 5)

io.sockets.emit('send matrix',matrix)


grassArr = []
grassEaterArr = []
predatorArr = []
cleanerArr = []
creatorArr = []
//modules

var n = 50
weath = "winter"
Grass = require("./grass")
GrassEater = require("./grasseter")
Predator = require("./predator")
Cleaner = require("./cleaner")
Creator = require("./creator")



function createObject(matrix){
    for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 1) {
				let gr = new Grass(x, y)
				grassArr.push(gr)

			} else if (matrix[y][x] == 2) {
				let grEat = new GrassEater(x, y)
				grassEaterArr.push(grEat)


			} else if (matrix[y][x] == 3) {
				let pre = new Predator(x, y)
				predatorArr.push(pre)

			} else if (matrix[y][x] == 4) {
				let cl = new Cleaner(x, y)
				cleanerArr.push(cl)

			}else if (matrix[y][x] == 5) {
				let cre = new Creator(x, y)
				creatorArr.push(cre)
			}
		}
	}
    io.sockets.emit('send matrix',matrix)
}


function game(){
    

	for (let i in grassArr) {
		grassArr[i].mul()
	}
	for (let i in grassEaterArr) {
		grassEaterArr[i].mul()
		grassEaterArr[i].eat()
	}
	for (let i in predatorArr) {
		predatorArr[i].mul()
		predatorArr[i].eat()
	}
	for (let i in cleanerArr){
		cleanerArr[i].move()
		cleanerArr[i].mul()		
	}
	for (let i in creatorArr){
		creatorArr[i].add()
		creatorArr[i].move()
		creatorArr[i].mul()
		}
	 io.sockets.emit('send matrix',matrix)
}



setInterval(game,200)






function weather() {
	if (weath == "winter"){
		weath = "spring"
	}
	else if (weath == "spring"){
		weath = "summer"
	}
	else if (weath == "summer"){
		weath = "autumn"
	}
	else if (weath == "autumn"){
		weath = "winter"
	}
	io.sockets.emit('weather', weath)
}
setInterval(weather, 5000)
io.on('connection',function(){
    createObject(matrix)
})