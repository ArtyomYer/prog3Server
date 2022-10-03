var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var fs = require("fs");
const { SocketAddress } = require('net');
const Cleaner = require('./cleaner');
const Creator = require('./creator');
const Predator = require('./predator');
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
Predator1 = require("./predator")
Cleaner1 = require("./cleaner")
Creator1 = require("./creator")



function createObject(){
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

function kill() {
    grassArr = [];
    grassEaterArr = []
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            matrix[y][x] = 0;
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function addGrass() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1
            var gr = new Grass(x, y)
            grassArr.push(gr)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addGrassEater() {
    for (var i = 0; i < 7; i++) {   
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2
            grassEaterArr.push(new GrassEater(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);
}

function addPredator() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3
            predatorArr.push(new Predator(x, y))
        }
    }
    io.sockets.emit("send matrix", matrix);

}

function addCleaner() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4
            var cl = new Cleaner(x, y)
            cleanerArr.push(cl)
        }
    }
    io.sockets.emit("send matrix", matrix);
}
function addCreator() {
    for (var i = 0; i < 7; i++) {
    var x = Math.floor(Math.random() * matrix[0].length)
    var y = Math.floor(Math.random() * matrix.length)
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5
            var cre = new Creator(x, y)
            creatorArr.push(cre)
        }
    }
    io.sockets.emit("send matrix", matrix);

}
function changeWeather(){
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
	io.sockets.emit('changeWeather', weath)
}

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


io.on('connection', function (socket) {
    createObject();
    socket.on("kill", kill);
    socket.on("add grass", addGrass);
    socket.on("add grassEater", addGrassEater);
	socket.on("add Predator", addPredator);
	socket.on("add Cleaner", addCleaner);
	socket.on("add Creator", addCreator);
	socket.on("change Weather",changeWeather)
})


var statistics = {};

setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(){
        console.log("send")
    })
},1000)