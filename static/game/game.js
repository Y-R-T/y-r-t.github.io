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

class Bullet {
    constructor (x, y, r, auto = false) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = 0;
        this.vy = 0;
        this.auto = auto;
    }

    update () {
        this.x += this.vx;
        this.y += this.vy;
    }

    draw () {
        context.fillStyle = '#654321';
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fill()
        context.closePath();
    }
}

class Enemy {
    constructor (x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = 0;
        this.vy = 0;
        this.center = [this.x + this.r, this.y + this.r];
    }

    update () {
        this.x += this.vx;
        this.y += this.vy;
        this.center = [this.x + this.r, this.y + this.r];
    }

    draw () {
        context.fillStyle = '#123456';
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fill()
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
        this.width = 30;
        this.height = 50;
        this.direction = new Direction(['w','a','s','d','shift']);
        this.velocity = 2;
        this.impactR = 10;
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
        if (directions.includes('shift')) {this.velocity = 1, this.impactR = 5;} else {this.velocity = 2, this.impactR = 10;}
        if (directions.includes('w')) {this.vy += -this.velocity}
        if (directions.includes('s')) {this.vy +=  this.velocity}
        if (directions.includes('a')) {this.vx += -this.velocity}
        if (directions.includes('d')) {this.vx +=  this.velocity}

        if (this.x + this.vx + this.width < canvas.width && this.x + this.vx > 0) {
            this.x += this.vx;
        };
        if (this.y + this.vy + this.height < canvas.height && this.y + this.vy > 0) {
            this.y += this.vy;
        }
        this.impactPoint = [this.x + this.width/2, this.y + this.height/2];

        //碰撞
        
    }

    draw () {
        context.fillStyle = '#F0F020';
        context.fillRect(this.x, this.y, this.width, this.height);
        let directions = this.direction.query();
        if (directions.includes('shift')) {
            context.beginPath();
            context.fillStyle = '#B6B6B6';
            context.arc(this.impactPoint[0], this.impactPoint[1], this.impactR, 0, 2 * Math.PI);
            context.fill();
            context.closePath();
        }
        
    }
}

var player = new Player();

var enemyList = [];
enemyList.push(new Enemy(100, 100, 10));

var bulletList = [];
bulletList.push(new Bullet());
enemyList[0].vx=0;
enemyList[0].vy=0;

context.fillStyle = '#F0F020';
var velocity = 1;
addEventListener("keydown", function (event) {
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        player.setDirection(1, 'shift')
    }
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
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        player.setDirection(0, 'shift')
    }
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
    player.update();
    player.draw();
    enemyList.forEach(function (enemy) {
        enemy.update();
        enemy.draw();
    });
    enemyList = enemyList.filter(enemy => 
        !(enemy.auto === true && 
        (enemy.x > canvas.width || enemy.x < 0 || enemy.y > canvas.height || enemy.y < 0))
      );
      
    bulletList.forEach(function (bullet) {
        bullet.update();
        bullet.draw();
    });
    bulletList = bulletList.filter(bullet => 
        !(bullet.auto === true && 
        (bullet.x > canvas.width || bullet.x < 0 || bullet.y > canvas.height || bullet.y < 0))
      );
      
}

setInterval(update, 10);