var canvas = document.getElementById('Main');
var context = canvas.getContext('2d');

// canvas.height = 500, canvas.width = 900
class BlockPair{
    constructor(lastCenter, lastHalfLength) {
        this.x = 900;
        this.width = 50;

        let rand = Math.random();
        if(rand>lastCenter / 500) {
            this.center = Math.floor(lastCenter + Math.random() * 70);
        }
        else{
            this.center = Math.floor(lastCenter - Math.random() * 70);
        }

        let rand1 = Math.random()
        if (rand1 < 0.3) {
            this.halfLength = 80;
        }
        else if (rand1 < 0.55) {
            this.halfLength = 110;
        }
        else if (rand1 < 0.7) {
            this.halfLength = 140;
        }
        else if (rand1 < 0.85) {
            this.halfLength = 180;
        }
        else {
            this.halfLength = 200;
        }
        

        this.aliveRange = [this.center - this.halfLength, this.center + this.halfLength];
    }

    update() {
        this.x -= 3;
    }

    draw() {
        context.fillStyle = '#D0D000';
        context.fillRect(this.x, 0, this.width, this.aliveRange[0]);
        context.fillRect(this.x, this.aliveRange[1], this.width, canvas.height - this.aliveRange[1]);

    }
}

class Bird{
    constructor(x, r) {
        this.x = x;
        this.y = 250;
        this.dyList = [0, 0, 0, 0, 0, 
                        0, 0, 0, 0, 0];
        this.dy = 0;
        this.r = r;
    }

    update() {
        
        if (this.dyList[0] != 0) {
            this.dy = 0;
            this.y -= this.dyList[0];
            for (let index = 0; index < this.dyList.length - 1; index++) {
                this.dyList[index] = this.dyList[index + 1];
            }
            this.dyList[this.dyList.length - 1] = 0;
        }
        else {
            this.dy -= 0.1;
            this.y  -= this.dy;
        }
        
    }

    draw() {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        context.fillStyle = 'blue';
        context.fill();
        context.beginPath();
        context.arc(this.x, this.y, 2, 0, 2*Math.PI);
        context.fillStyle = 'red';
        context.fill()
        context.closePath();
    }

    click() {
        for (let index = 0; index < this.dyList.length; index++) {
            this.dyList[index] += 5;
        }
    } 
}

var list = [new BlockPair(250, 100)];
var bird = new Bird(300, 20);
var dead = false;
var isIn = false;
var lastIsIn = false;
var gameScore = 0;

context.font = '50px Arial';
context.fillStyle = 'blue';

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < list.length; index++) {
        if (300 + 20 < list[index].x) {
            continue;
        }
        if (300 - 20 > list[index].x + list[index].width) {
            isIn = false;
            continue;
        }
        isIn = true;
        if (300 < list[index].x) {
            if (bird.y < list[index].aliveRange[0] || bird.y > list[index].aliveRange[1]) {
                dead = true;
                break;
            }
            if ((list[index].x - 300) ** 2 + (bird.y - list[index].aliveRange[0]) ** 2 < 20 ** 2 || (list[index].x - 300) ** 2 + (bird.y - list[index].aliveRange[1]) ** 2 < 20 ** 2) {
                dead = true;
                break;
            }
        }
        if (300 > list[index].x + list[index].width) {
            if ((300 - list[index].x - list[index].width) ** 2 + (bird.y - list[index].aliveRange[0]) ** 2 < 20 ** 2 || (300 - list[index].x - list[index].width) ** 2 + (bird.y - list[index].aliveRange[1]) ** 2 < 20 ** 2) {
                dead = true;
                break;
            }
        }
        if ((bird.y - list[index].aliveRange[0]) ** 2 < 20 ** 2 || (bird.y - list[index].aliveRange[1]) ** 2 < 20 ** 2) {
            dead = true;
            break;
        }
    }


    if (isIn == false && lastIsIn == true) {
        gameScore += 1;
        lastIsIn = false;
    }
    if (isIn == true && lastIsIn == false) {
        lastIsIn = true;
    }

    if (dead == true) {
        alert("You are dead!")
        list = [new BlockPair(250, 100)];
        bird = new Bird(300, 20);
        dead = false;
        isIn = false;
        lastIsIn = false;
        gameScore = 0;
        return 0;
    }
    

    if (list[0].x + list[0].width < 0) {
        list.shift();
    }
    
    if (list[list.length - 1].x < canvas.width - 150) {
        list.push(new BlockPair(list[list.length - 1].center, list[list.length - 1].halfLength))
    }

    for (let index = 0; index <list.length; index++) {
        list[index].update();
        list[index].draw();
    }

    bird.update()
    bird.draw()
    context.fillText(gameScore, 100, 100);

}


document.addEventListener('keydown', function (event) {
    if (event.code === "Space") {
        bird.click();
    }
});
setInterval(update, 10);
