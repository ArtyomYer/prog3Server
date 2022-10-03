var socket = io()

let side = 20;



function setup() {
	createCanvas(35 * side,35 * side)

	
}
socket.on("weather", function (data) {
    weath = data;
})


function nkarel(matrix) {
	for (let y = 0; y < matrix.length; y++) {
		for (let x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 1) {
				fill("green")
				
				 if (weath == "autumn") {
					fill("#A05C00");
				}else if (weath == "winter") {
					fill("white");
				}else if (weath == "spring") {
					fill("#4DFF88");
				}
				
				

			}
			else if (matrix[y][x] == 2) {
				fill("yellow")

			}
			else if (matrix[y][x] == 3) {
				fill("red")

			} else if (matrix[y][x] == 4){
				fill("purple")

			} else if (matrix[y][x] == 5){
				fill("blue")

			}else {
				fill("gray")

			}
			rect(x * side, y * side, side, side)
		}
	}




}

setInterval(
	function(){
		socket.on('send matrix',nkarel)

	},1000
)
function kill() {
    socket.emit("kill")
}
function addGrass() {
    socket.emit("add grass")
}
function addGrassEater() {
    socket.emit("add grassEater")
}
function addPredator() {
    socket.emit("add Predator")
}
function addCleaner() {
    socket.emit("add Cleaner")
}
function addCreator() {
    socket.emit("add Creator")
}
function changeWeather() {
    socket.emit("change Weather")
}
;