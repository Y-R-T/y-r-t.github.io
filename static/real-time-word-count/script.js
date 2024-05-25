document.getElementById('textInput').addEventListener('input', function () {
    let text = this.value;
    let count = 0;
    let wasSpace = true;  // To handle initial spaces

    for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ' || text[i] === '\n') {
            if (!wasSpace) {
                count++;
                wasSpace = true;
            }
        } else {
            wasSpace = false;
        }
    }
    
    // If the last character is not a space, add one to the count for the last word
    if (!wasSpace) {
        count++;
    }

    document.getElementById('wordCount').textContent = 'Word Count: ' + count;
});

document.getElementById('fontSelect').addEventListener('change', function () {
    let selectedFont = this.value;
    document.getElementById('textInput').style.fontFamily = selectedFont;
});

document.getElementById('fontSizeInput').addEventListener('input', function () {
    let selectedFontSize = this.value + 'px';
    document.getElementById('textInput').style.fontSize = selectedFontSize;
});

document.getElementById('saveButton').addEventListener('click', function () {
    let text = document.getElementById('textInput').value;
    let blob = new Blob([text], { type: 'text/plain' });
    let url = URL.createObjectURL(blob);
    let a = document.createElement('a');
    a.href = url;
    a.download = 'text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});
