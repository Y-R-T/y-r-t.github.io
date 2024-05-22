// 获取模态框元素
var modal = document.getElementById('coffeeModal');

// 获取打开按钮元素
var btn = document.getElementById('coffeeBtn');

// 获取关闭按钮元素（x）元素
var span = document.getElementsByClassName('close')[0];

// 点击按钮打开模态框
btn.onclick = function() {
    modal.style.display = "block";
}

// 点击x关闭模态框
span.onclick = function() {
    modal.style.display = "none";
}

// 点击模态框外部区域关闭模态框
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
var img = document.getElementById("img_coffee");

// 添加点击事件处理程序
img.addEventListener("mousedown", function() {
    // 点击时将图像变暗
    img.style.opacity = 0.8;
});

// 添加松开事件处理程序
img.addEventListener("mouseup", function() {
    // 松开鼠标按钮时恢复正常
    img.style.opacity = 1;
});
