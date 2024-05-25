var canvas = document.getElementById('Main');
var context = canvas.getContext('2d');

class Direction {
    constructor (range) {
        this.range = range;
        this.stateList = [];
    }

    add (state) {
        if (this.stateList.includes(state)) {} else if (this.range.includes(state)) {
            this.stateList.push(state);
        }
    }

    delete (state) {
        if (this.stateList.includes(state)) {
            this.stateList = this.stateList.filter(e => e !== state);
        }
    }

    query () {
        return this.stateList;
    }
}

class Enemy {
    constructor () {
        this.x = 100;
        this.y = 100;
        this.r = 10;
        this.vx = 0;
        this.vy = 0;
    }

    draw (){
        context.fillStyle = "#123456";
        context.beginPath();
        context.arc();
        context.closePath();
    }
}
class Player {
    constructor () {
        this.x = 100;
        this.y = 100;
        this.vx = 0;
        this.vy = 0;
        this.g = 0.1;
        this.width = 50;
        this.height = 80;
        this.direction = new Direction(['w','a','s','d']);
        this.velocity = 5;
    }

    setDirection (o, direction) {
        if (o == 1) {
            this.direction.add(direction);
        }
        if (o == 0) {
            this.direction.delete(direction);
        }
    }

    update () {
        this.vx = 0;
        this.vy = 0;
        let directions = this.direction.query();
        if (directions.includes('w')) {this.vy += -this.velocity}
        if (directions.includes('s')) {this.vy +=  this.velocity}
        if (directions.includes('a')) {this.vx += -this.velocity}
        if (directions.includes('d')) {this.vx +=  this.velocity}
        this.x += this.vx;
        this.y += this.vy;
    }

    draw () {
        context.fillStyle = '#F0F020';
        context.fillRect(this.x, this.y, this.width, this.height);
    }
}

var player = new Player();
context.fillStyle = '#F0F020';
var velocity = 1;
addEventListener("keydown", function (event) {
    if (event.code === "KeyW") {
        player.setDirection(1, 'w')
    }
    if (event.code === "KeyS") {
        player.setDirection(1, 's')
    }
    if (event.code === "KeyA") {
        player.setDirection(1, 'a')
    }
    if (event.code === "KeyD") {
        player.setDirection(1, 'd')
    }
});

addEventListener("keyup", function (event) {
    if (event.code === "KeyW") {
        player.setDirection(0, 'w')
    }
    if (event.code === "KeyS") {
        player.setDirection(0, 's')
    }
    if (event.code === "KeyA") {
        player.setDirection(0, 'a')
    }
    if (event.code === "KeyD") {
        player.setDirection(0, 'd')
    }
});

function update () {  
    context.clearRect(0, 0, canvas.width, canvas.height);
    player.update()
    player.draw();
}

setInterval(update, 50);