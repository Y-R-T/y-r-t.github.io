var canvas = document.getElementById('Main');
var context = canvas.getContext('2d');

class Point {
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }

    update () {

    }
}

var pointList = [];

for (let index = 0; index < 20; index++) {
    pointList.push(Point(Math.random(), Math.random()));
}

function update () {
    context.clearRect(0, 0, canvas.width, canvas.height);

    let center = [0, 0];
    let L = pointList.length;
    context.beginPath();
    context.fillStyle = '#B6B6B6';
    for (let index = 0; index < L; index++) {
        center[0] += pointList[index].x / L;
        center[1] += pointList[index].y / L;
        context.arc(pointList[index].x * 400, pointList[index].y * 400, 2, 0, 2 * Math.PI);
    }
    context.fill();
    context.closePath();
    
}

setInterval(update, 10);
