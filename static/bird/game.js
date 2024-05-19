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
    constructor() {
        this.x = 300;
        this.y = 250;
        this.dyList = [0, 0, 0, 0, 0, 
                        0, 0, 0, 0, 0];
        this.dy = 0;
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
        context.arc(this.x, this.y, 20, 0, 2*Math.PI);
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
var bird = new Bird()
function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);

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

}


document.addEventListener('keydown', function (event) {
    if (event.code === "Space") {
        bird.click();
    }
});
setInterval(update, 10);
