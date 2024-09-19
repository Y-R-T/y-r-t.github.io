import { processFile } from './osuProcessor.js';
var canvas = document.getElementById('Main');
var context = canvas.getContext('2d');

const DEBUG = false;

class Text {
    constructor() {
        context.font = '40px Arial';
        context.fillStyle = 'blue';
        this.judge = " ";
        this.combo = 0;
        this.score = 0;
        this.acc = 0;
    }

    showACC() {
        context.fillStyle = 'blue';
        let tmp = String(this.acc * 100);
        context.fillText(tmp.substr(0,4) + "%", 50, canvas.width - 50);
    }
    
    showScore() {
        context.fillStyle = 'blue';
        context.fillText(this.score, 50, 45);
    }

    showJudge() {
        context.fillStyle = 'blue';
        context.fillText(this.judge, 50, canvas.height - 150);
    }

    showCombo() {
        context.fillStyle = 'blue';
        context.fillText(this.combo, 50, canvas.height - 50);
    }
}

class Note {
    constructor(timing) {
        this.timing = timing;
        this.y = -50;
    }

    update(duration) {
        let t = duration - this.timing;
        this.y = t + 900;
        this.difference = this.timing - duration
    }

    judge(duration) {
        let difference = this.timing - duration

        if(difference > 150) { // miss
            return 0
        }

        if(difference < -100 || difference > 100) { //bad
            return "Miss"
        }

        if(difference < -60 || difference > 60) { //good
            return "OK"
        }

        if(difference < -30 || difference > 30) { //perfect
            return "Good"
        }

        return "Perfect"
        
    }

}

class Key {
    constructor(setting, width, height, name, noteTimeList, textSurface) {
        this.x = (canvas.width - width * (setting[0] - setting[1] * 2))/2;
        this.y = (canvas.height - height)/2;
        this.width = width;
        this.height = height;
        this.name = name;
        this.noteTimeList = noteTimeList; // Array
        this.noteList = [];
        this.index = 0;
        this.maxIndex = noteTimeList.length;
        this.duration = 0;
        this.scores = [[], 0, 0, 0, 0, 0]; // list, perfect1, good2, bad3, miss0, score
        this.textSurface = textSurface;
        this.down = false;
    }

    generate() { // ms
        if (this.noteTimeList[this.index] < this.duration + 950) {
            this.noteList.push(new Note(this.noteTimeList[this.index]))
            if(this.index < this.maxIndex){
                this.index += 1;
            }
            this.generate(this.duration);
        }
            
    }

    click() {
        this.down = true;
        switch(this.noteList[0].judge(this.duration)) {
            case "Perfect":
                this.noteList.shift();
                this.scores[0].push(1);
                this.scores[1] += 1;
                this.textSurface.judge = "Perfect";
                this.textSurface.combo += 1;
                break;

            case "Good":
                this.noteList.shift();
                this.scores[0].push(2);
                this.scores[2] += 1;
                this.textSurface.judge = "Good";
                this.textSurface.combo += 1;
                break;

            case "OK":
                this.noteList.shift();
                this.scores[0].push(3);
                this.scores[3] += 1;
                this.textSurface.judge = "OK";
                this.textSurface.combo += 1;
                break;

            case "Miss":
                this.noteList.shift();
                this.scores[0].push(0);
                this.scores[4] += 1;
                this.textSurface.judge = "Miss";
                this.textSurface.combo = 0;
                break;

            case 0:
                break;

            default:
                break;
        }
    }
    
    keyup() {
        this.down = false;
    }

    update() {
        for (let index = 0; index < this.noteList.length; index++) {
            this.noteList[index].update(this.duration)
            if(this.noteList[index].difference < -100){
                this.noteList.shift();
                this.scores[0].push(0);
                this.textSurface.judge = "Miss";
                this.textSurface.combo = 0;
            }
        }
        this.scores[5] = this.scores[1] * 300 + this.scores[2] * 100 + this.scores[3] *50
    }

    draw() {
        
        context.fillStyle = '#D0D000';
        context.fillRect(this.x, this.y, this.width, this.height);
        if (this.down === true) {
            context.fillStyle = '#80D0D0'
        } 
        else {
            context.fillStyle = '#9FEFEF';
        }
        context.beginPath();
        context.arc(this.x + this.width/2, this.y + this.height, this.width/2, 0, 2*Math.PI);
        context.closePath();
        context.fill();
        context.beginPath();
        for (let index = 0; index < this.noteList.length; index++) {
            context.arc(this.x + this.width/2, this.noteList[index].y, this.width/2, 0, 2*Math.PI);
            context.fillStyle = 'blue';
            context.fill();
        }
        context.closePath();
        
    }
}

async function getBeatMap(path) {
    if (DEBUG == true) {
        alert('Starting fetch');
    }
    try {
        const response = await fetch(path);

        if (DEBUG == true) {
            alert('Fetch completed');
        }

        if (!response.ok) {

            if (DEBUG == true) {
                alert('HTTP error, status = ' + response.status);
            }

            throw new Error('HTTP error, status = ' + response.status);
        }

        const data = await response.json();

        if (DEBUG == true) {
            alert('JSON parsed');
        }

        const obj = data["object"];
        let keys = [[], [], [], []];
        obj.forEach(element => {
            for (let index = 0; index < keys.length; index++) {
                if (element[1] == index) {
                    keys[index].push(element[0]);
                }
            }
        });

        return keys;
    } catch (error) {
        alert('Error: ' + error.message);
        console.error('Error fetching JSON:', error);
    }
}

function randomBeatMap () {
    let tmpArray = [];
    let rand = 0;
    for (let index = 0; index <= 3; index++) {
        tmpArray[index] = [];
        tmpArray[index][0] = 1000
        for (let i = 1; i < 300; i++) {
            rand = Math.random()
            if(rand < 0.3) {
                tmpArray[index][i] = tmpArray[index][i - 1] + 200;
            }
            else if(rand < 0.5) {
                tmpArray[index][i] = tmpArray[index][i - 1] + 400;
            }
            else if(rand < 0.8) {
                tmpArray[index][i] = tmpArray[index][i - 1] + 600;
            }
            else {
                tmpArray[index][i] = tmpArray[index][i - 1] + 800;
            }
        }
    }
    return tmpArray;
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'd') {
        keyD.click();
    }
    if (event.key === 'f') {
        keyF.click();
    }
    if (event.key === 'j') {
        keyJ.click();
    }
    if (event.key === 'k') {
        keyK.click();
    }
    if (event.key === ' ') {
        running = !running;
    }
});

document.addEventListener('keyup', function(event) {
    if (event.key === 'd') {
        keyD.keyup()
    }
    if (event.key === 'f') {
        keyF.keyup()
    }
    if (event.key === 'j') {
        keyJ.keyup()
    }
    if (event.key === 'k') {
        keyK.keyup()
    }
});


function generate() {
    keyD.generate();
    keyF.generate();
    keyJ.generate();
    keyK.generate();
}

function keyUpdate() {
    keyD.update();
    keyF.update();
    keyJ.update();
    keyK.update();
}

function draw() {
    keyD.draw();
    keyF.draw();
    keyJ.draw();
    keyK.draw();
}

function score() {
    let sum = 
        keyD.scores[5] +
        keyF.scores[5] +
        keyJ.scores[5] +
        keyK.scores[5];
    return sum
}

function setDuration(duration) {
    keyD.duration = duration;
    keyF.duration = duration;
    keyJ.duration = duration;
    keyK.duration = duration;
}

function calculateACC() {
    let sum = 
        keyD.scores[0].length +
        keyF.scores[0].length +
        keyJ.scores[0].length+
        keyK.scores[0].length;

    let perfect = 
        keyD.scores[1] +
        keyF.scores[1] +
        keyJ.scores[1] +
        keyK.scores[1];

    let good = 
        keyD.scores[2] +
        keyF.scores[2] +
        keyJ.scores[2] +
        keyK.scores[2];
    
    let bad = 
        keyD.scores[3] +
        keyF.scores[3] +
        keyJ.scores[3] +
        keyK.scores[3];
    if (sum != 0) {
        return ((perfect + good * 0.9 + bad * 0.6) / sum);
    }
        return 0;
}

function update() {

    context.clearRect(0, 0, canvas.width, canvas.height);
    if (running) {
        duration = new Date() - startTime;
    } else {
        startTime = new Date() -  duration;
    }
    
    if (running) {
        setDuration(duration);
        generate();
        keyUpdate();
        sumScore = score();
        textSurface.score = sumScore;
        textSurface.acc = calculateACC();
    }

    draw();
    
    textSurface.showACC()    
    textSurface.showScore()
    textSurface.showJudge()
    textSurface.showCombo()

    requestAnimationFrame(update);
}

// noteList
var timingArray = [];
var duration = 0;
var sumScore = 0;
var sumScore;
var startTime;
const textSurface = new Text();
var keyD;
var keyF;
var keyJ;
var keyK;
var running = true;

document.getElementById('triggerButton').addEventListener('click', async function() {
    if (confirm("自己导入osu谱面文件吗？")) {
        // 自选文件
        timingArray = await new Promise((resolve, reject) => {
            const fileInput = document.getElementById('fileInput');
            fileInput.addEventListener('change', async function(event) {
                const selectedFile = event.target.files[0];
                if (selectedFile) {
                    try {
                        const timingArray = await processFile(selectedFile);
                        console.log("Key0: " + String(timingArray[0]));
                        console.log("Key1: " + String(timingArray[1]));
                        console.log("Key2: " + String(timingArray[2]));
                        console.log("Key3: " + String(timingArray[3]));

                        // 在文件处理完成后解析 Promise
                        resolve(timingArray);
                    } catch (error) {
                        alert("读取文件错误");
                        reject(error);
                    }
                } else {
                    alert("所选文件为空。");
                    reject(new Error("No file selected"));
                }
            });

            // 触发文件输入框的点击事件
            fileInput.click();
        }).catch(error => {
            console.error(error);
        });
    } else {
        if (confirm("使用网站预设谱面吗？（否则为随机生成）")) {
            // 调用 json 
            timingArray = await getBeatMap('data/1.json');
            if (!timingArray) {
                alert('Failed to load beat map');
            }
        } else {
            timingArray = randomBeatMap()
        }
    }
    document.getElementById('triggerButton').style.display = 'none';
    
    {
        keyD = new Key([4, 0], 100, 800, "d", timingArray[0], textSurface)
        keyF = new Key([4, 1], 100, 800, "f", timingArray[1], textSurface)
        keyJ = new Key([4, 2], 100, 800, "j", timingArray[2], textSurface)
        keyK = new Key([4, 3], 100, 800, "k", timingArray[3], textSurface)
    }
    startTime = new Date();
    
    requestAnimationFrame(update);
});




