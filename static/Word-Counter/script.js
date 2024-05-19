function countWords() {
    var text = document.getElementById('textInput').value;
    var words = text.match(/\b[-?(\w+)?]+\b/gi);
    if (words) {
        document.getElementById('wordCount').innerHTML = "字数: " + words.length;
    } else {
        document.getElementById('wordCount').innerHTML = "字数: 0";
    }
}
