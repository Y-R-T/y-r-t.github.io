document.getElementById("modifyTextFormat").addEventListener("click", function() {
    var inputText = document.getElementById("inputText").value;
    var lines = inputText.split('\n');
    var processedLines = [];
    var i = 0;

    while (i < lines.length) {
        // 检查是否是未处理的行
        if (i > lines.length - 5) break; // 如果剩余行数不足5行，结束循环

        // 检测规则
        if (!lines[i].trim() || isNaN(lines[i].charAt(0))) {
            // 第一行不符合规则，删除并继续
            lines.splice(i, 1);
            continue;
        }
        if (!lines[i+1].trim() || isNaN(lines[i+1].charAt(0))) {
            // 第二行不符合规则，删除并继续
            lines.splice(i+1, 1);
            continue;
        }
        if (!lines[i+2].trim()) {
            // 第三行不符合规则，删除并继续
            lines.splice(i+2, 1);
            continue;
        }
        if (!lines[i+3].trim()) {
            // 第四行不符合规则，删除并继续
            lines.splice(i+3, 1);
            continue;
        }
        if (!/[\u4e00-\u9fa5]/.test(lines[i+3])) {
            // 第四行不存在中文
            lines[i+2] += " " + lines[i+2]; // 复制第三行到行尾
            lines[i+3] = ''; // 清空第四行
            i += 4; // 跳过这四行
            continue;
        }
        if (lines[i+4].trim() && !isNaN(lines[i+4].charAt(0))) {
            // 第五行有数字
            lines.splice(i+4, 0, ''); // 在第五行前插入空行
            i += 5; // 跳过这五行
            continue;
        }

        // 将处理过的五行标记为已处理
        processedText += lines.slice(i, i+5).join('\n') + "\n\n";
        i += 5; // 移动到下一个五行组
    }

    document.getElementById("outputText").value = processedText;
};
