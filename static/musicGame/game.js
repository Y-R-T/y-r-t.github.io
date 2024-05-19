var canvas = document.getElementById('Main');
var context = canvas.getContext('2d');

class Text{
    constructor() {
        context.font = '50px Arial';
        context.fillStyle = 'blue';
        this.judge = " ";
        this.combo = 0
        this.score = 0
    }

    showScore() {
        context.fillText(this.score, 50, 45);
    }

    showJudge() {
        context.fillText(this.judge, 300, 45);
    }

    showCombo() {
        context.fillText(this.combo, 200, 45);
    }
}

class Note{
    constructor(timing) {
        this.timing = timing;
        this.y = -50;
    }

    update(duration) {
        let t = duration - this.timing;
        this.y = t + 800;
    }

    judge(duration) {
        let difference = this.timing - duration

        if(difference > 250) {
            return 0
        }

        if(difference > 100) {
            return "Miss"
        }

        if(difference < -80 || difference > 80) {
            return "Bad"
        }

        if(difference < -50 || difference > 50) {
            return "Good"
        }

        return "Perfect"
        
    }

}

class Key{
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
    }

    setDuration(duration) {
        this.duration = duration
    }

    generate() { // ms
        if (this.noteTimeList[this.index] < this.duration + 800) {
            this.noteList.push(new Note(this.noteTimeList[this.index]))
            if(this.index < this.maxIndex){
                this.index += 1;
            }
            this.generate(this.duration);
        }
            
    }

    click() {
        switch(this.noteList[0].judge(this.duration)) {
            case "Perfect":
                this.noteList.shift();
                this.scores[0].push(1);
                this.scores[1] += 1;
                this.textSurface.judge = "Perfect";
                this.textSurface.combo += 1;
                break

            case "Good":
                this.noteList.shift();
                this.scores[0].push(2);
                this.scores[2] += 1;
                this.textSurface.judge = "Good";
                this.textSurface.combo += 1;
                break

            case "Bad":
                this.noteList.shift();
                this.scores[0].push(3);
                this.scores[3] += 1;
                this.textSurface.judge = "Bad";
                this.textSurface.combo += 1;
                break

            case "Miss":
                this.noteList.shift();
                this.scores[0].push(0);
                this.scores[4] += 1;
                this.textSurface.judge = "Miss";
                this.textSurface.combo = 0;
                break

            case 0:
                break

            default:
                break
        }
    }
    
    update() {
        for (let index = 0; index < this.noteList.length; index++) {
            this.noteList[index].update(this.duration)
            if(this.noteList[index].y > this.height + 100){
                this.noteList.shift()
            }
        }
        this.scores[5] = this.scores[1] * 300 + this.scores[2] * 100 + this.scores[3] *50
    }

    draw() {
        
        context.fillStyle = '#D0D000';
        context.fillRect(this.x, this.y, this.width, this.height);
        context.beginPath();
        for (let index = 0; index < this.noteList.length; index++) {
            context.arc(this.x + this.width/2, this.noteList[index].y, this.width/2, 0, 2*Math.PI);
            context.fillStyle = 'blue';
            context.fill();
        }
        context.closePath();
    }
}

function main() {

    textSurface = new Text()

    // noteList
    var timingArray = [];
    for (let index = 0; index <= 3; index++) {
        timingArray[index] = [];
        timingArray[index][0] = 1000
        for (let i = 1; i < 300; i++) {
            rand = Math.random()
            if(rand < 0.3) {
                timingArray[index][i] = timingArray[index][i - 1] + 200;
            }
            else if(rand < 0.5) {
                timingArray[index][i] = timingArray[index][i - 1] + 400;
            }
            else if(rand < 0.8) {
                timingArray[index][i] = timingArray[index][i - 1] + 600;
            }
            else {
                timingArray[index][i] = timingArray[index][i - 1] + 800;
            }
        }
    }

    // 实例化
    {
        var keyD = new Key([4, 0], 100, 800, "d", timingArray[0], textSurface)
        var keyF = new Key([4, 1], 100, 800, "f", timingArray[1], textSurface)
        var keyJ = new Key([4, 2], 100, 800, "j", timingArray[2], textSurface)
        var keyK = new Key([4, 3], 100, 800, "k", timingArray[3], textSurface)
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'd') {
            keyD.click()
        }
        if (event.key === 'f') {
            keyF.click()
        }
        if (event.key === 'j') {
            keyJ.click()
        }
        if (event.key === 'k') {
            keyK.click()
        }
    });

    var startTime = new Date();
    var duration = 0

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
        keyD.setDuration(duration);
        keyF.setDuration(duration);
        keyJ.setDuration(duration);
        keyK.setDuration(duration);
    }

   

    function update() {

        context.clearRect(0, 0, canvas.width, canvas.height);

        duration = new Date() - startTime;

        setDuration(duration);
        generate();
        keyUpdate();
        draw();

        sumScore = score();

        textSurface.score = sumScore;

        textSurface.showScore()
    
        textSurface.showJudge()

        textSurface.showCombo()

        requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

main()


