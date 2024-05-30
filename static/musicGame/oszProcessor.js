// oszProcessor.js

// 读取文件内容并将其作为字符串返回
async function readFileAsList(response) {
    try {
        const text = await response.text();
        const lines = text.split('\n').map(line => line.trim());
        return lines;
    } catch (error) {
        return `读取文件时出错: ${error}`;
    }
}

// 提取有用信息并返回数组
function extract(linesList) {
    let objStartIndex = linesList.indexOf("[HitObjects]");
    if (objStartIndex === -1) {
        return '未找到[HitObjects]部分';
    }

    let obj = linesList.slice(objStartIndex + 1);
    let res = [[],[],[],[]];

    obj.forEach(line => {
        let tmpList = line.split(',');
        let key;
        switch (tmpList[0]) {
            case '64':
                key = 0;
                break;
            case '192':
                key = 1;
                break;
            case '320':
                key = 2;
                break;
            case '448':
                key = 3;
                break;
            default:
                return; // 跳过不符合条件的行
        }
        res[key].push([parseInt(tmpList[2])]);
    });

    return res;
}

// 导出函数
export async function processFile(response) {
    const linesList = await readFileAsList(response);
    if (typeof linesList === 'string') {  // 检查是否返回了错误信息
        throw new Error(linesList);
    }
    const result = extract(linesList);
    return result;
}
