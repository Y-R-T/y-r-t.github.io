let timer = null;
let elapsedMilliseconds = 0;

function startTimer() {
    if (!timer) {
        timer = setInterval(updateTimer, 10); // 每10毫秒更新一次
    }
}

function stopTimer() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

function resetTimer() {
    stopTimer();
    elapsedMilliseconds = 0;
    document.getElementById('timer').innerText = '00:00:00.00';
}

function updateTimer() {
    elapsedMilliseconds += 10;
    let totalSeconds = Math.floor(elapsedMilliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds - (hours * 3600)) / 60);
    let seconds = totalSeconds - (hours * 3600) - (minutes * 60);
    let milliseconds = elapsedMilliseconds % 1000;
    let tenths = Math.floor(milliseconds / 100); // 计算十分之一秒
    let hundredths = Math.floor((milliseconds % 100) / 10); // 计算百分之一秒

    document.getElementById('timer').innerText = formatTime(hours) + ':' + formatTime(minutes) + ':' + formatTime(seconds) + '.' + tenths + hundredths;
}

function formatTime(time) {
    return time < 10 ? '0' + time : time;
}
