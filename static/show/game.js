var canvas = document.getElementById('Main');
var context = canvas.getContext('2d');

class Key{
    constructor (name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
        this.clicked = false;
    }
    
    down () {
        this.clicked = true;
    }

    up () {
        this.clicked = false;
    }

    draw () {
        if (this.clicked == true) {
            context.fillStyle = '#D0D000';
        }
        else {
            context.fillStyle = '#F0F020';
        }
        context.fillRect(this.x, this.y, this.width, this.height);
        context.font = '50px Arial';
        context.fillStyle = 'blue';
        context.fillText(this.name, this.x, this.y + 40);
    }
}

var keyBoard1 = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"]
var keyBoardCode1 = ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash"]
var keyList1 = []
for (let index = 0; index < keyBoard1.length; index++) {
    keyList1.push(new Key(keyBoard1[index], index*60, 100));
}
context.font = '50px Arial';
context.fillStyle = 'blue';

document.addEventListener('keydown', function (event) {
//    alert(event.code);
    for (let index = 0; index < keyBoard1.length; index++) {
        if (event.code === keyBoardCode1[index]) {
            keyBoard1[index].down();
        }
    }
});

document.addEventListener('keyup', function (event) {
    for (let index = 0; index < keyBoard1.length; index++) {
        if (event.code === keyBoardCode1[index]) {
            keyBoard1[index].up();
        }
    }
});

function update() {
    for (let index = 0; index < keyList1.length; index++) {
        keyList1[index].draw();   
    }
}

setInterval(update, 30);
