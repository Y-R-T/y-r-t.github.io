var canvas = document.getElementById('Main');
var context = canvas.getContext('2d');

class Key{
    constructor (name, x, y, width) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.width = width;
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
        context.fillText(this.name, this.x + 10, this.y + 40);
    }
}

var keyBoard1 = ["Tab","q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"];
var keyBoardCode1 = ["Tab","KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP", "BracketLeft", "BracketRight", "Backslash"];
var keyList1 = [];

var keyBoard2 = ["CL","a","s","d","f","g","h","j","k","l",";","\'","Enter"];
var keyBoardCode2 = ["CapsLock","KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL","Semicolon","Quote","Enter"];
var keyList2 = [];

var keyBoard3 = ["Shift","z","x","c","v","b","n","m",",",".","/","Shift"];
var keyBoardCode3 = ["ShiftLeft","KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period","Slash","ShiftRight"];
var keyList3 = [];

var keyBoard4 = ["Space"];
var keyBoardCode4 = ["Space"];
var keyList4 = [];
for (let index = 0; index < keyBoard1.length; index++) {
    if (index == 0) {
        keyList1.push(new Key(keyBoard1[index], (index)*60 + 10, 100, 150));
        continue;
    }
    keyList1.push(new Key(keyBoard1[index], (index+1)*60 + 50, 100, 50));
}

for (let index = 0; index < keyBoard2.length; index++) {
    if (index == 0) {
        keyList2.push(new Key(keyBoard2[index], (index)*60 + 10, 170, 160));
        continue;
    }
    if (index == keyBoard2.length - 1) {
        keyList2.push(new Key(keyBoard2[index], (index)*60 + 120, 170, 150));
        break;
    }
    keyList2.push(new Key(keyBoard2[index], (index)*60 + 120, 170, 50));
}

for (let index = 0; index < keyBoard3.length; index++) {
    if (index == 0) {
        keyList3.push(new Key(keyBoard3[index], (index)*60 + 10, 240, 180));
        continue;
    }
    if (index == keyBoard3.length - 1) {
        keyList3.push(new Key(keyBoard3[index], (index)*60 + 140, 240, 190));
        break;
    }
    keyList3.push(new Key(keyBoard3[index], (index)*60 + 140, 240, 50));
}

for (let index = 0; index < keyBoard4.length; index++) {
//    keyList4.push(new Key(keyBoard4[index], (index+1)*60 + 50, 100, 50));
    keyList4.push(new Key(keyBoard4[index], (index)*60 + 320, 310, 300));
}

context.font = '50px Arial';
context.fillStyle = 'blue';

document.addEventListener('keydown', function (event) {
//    alert(event.code);
    for (let index = 0; index < keyBoard1.length; index++) {
        if (event.code === keyBoardCode1[index]) {
            keyList1[index].down();
        }
    }
    for (let index = 0; index < keyBoard2.length; index++) {
        if (event.code === keyBoardCode2[index]) {
            keyList2[index].down();
        }
    }
    for (let index = 0; index < keyBoard3.length; index++) {
        if (event.code === keyBoardCode3[index]) {
            keyList3[index].down();
        }
    }
    for (let index = 0; index < keyBoard4.length; index++) {
        if (event.code === keyBoardCode4[index]) {
            keyList4[index].down();
        }
    }
});

document.addEventListener('keyup', function (event) {
    for (let index = 0; index < keyBoard1.length; index++) {
        if (event.code === keyBoardCode1[index]) {
            keyList1[index].up();
        }
    }
    for (let index = 0; index < keyBoard2.length; index++) {
        if (event.code === keyBoardCode2[index]) {
            keyList2[index].up();
        }
    }
    for (let index = 0; index < keyBoard3.length; index++) {
        if (event.code === keyBoardCode3[index]) {
            keyList3[index].up();
        }
    }
    for (let index = 0; index < keyBoard4.length; index++) {
        if (event.code === keyBoardCode4[index]) {
            keyList4[index].up();
        }
    }
});

function update() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let index = 0; index < keyList1.length; index++) {
        keyList1[index].draw();   
    }
    for (let index = 0; index < keyList2.length; index++) {
        keyList2[index].draw();   
    }
    for (let index = 0; index < keyList3.length; index++) {
        keyList3[index].draw();   
    }
    for (let index = 0; index < keyList4.length; index++) {
        keyList4[index].draw();   
    }
    
}

setInterval(update, 30);
