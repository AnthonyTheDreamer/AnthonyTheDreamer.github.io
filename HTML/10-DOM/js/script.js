function changeFontSize(size) {
	if (size > 30 || size < 10){
		alert("Kích thước không phù hợp (10 <= size <= 30)");
	}
	else{
	var x = size.toString() + "px";
	document.getElementById("p1").style.fontSize = x;
	document.getElementById("p2").style.fontSize = x;
	document.getElementById("p3").style.fontSize = x;
	}
}

function changeFontSize2(size) {
	var size = prompt("Điền kích thước muốn thay đổi vào đây:");

	if (size > 30 || size < 10){
		alert("Kích thước không phù hợp (10 <= size <= 30)");
	}
	else{
	var x = size.toString() + "px";
	document.getElementById("p1").style.fontSize = x;
	document.getElementById("p2").style.fontSize = x;
	document.getElementById("p3").style.fontSize = x;
	}
}

function increaseFontSize(p) {

    var txt = document.getElementById(p);
    var style = window.getComputedStyle(txt, null).getPropertyValue("font-size");
    var currentSize = parseFloat(style);
    if (currentSize <30){
    txt.style.fontSize = (currentSize + 1) + "px";
    }
	else {alert("Font size không được lớn quá 30px");}
}

function increaseFontSize2(p) {
	var p = prompt("Chọn đoạn cần tăng kích thước (p1, p2, p3)");
    var txt = document.getElementById(p);
    var style = window.getComputedStyle(txt, null).getPropertyValue("font-size");
    var currentSize = parseFloat(style);
    if (currentSize < 30){
    txt.style.fontSize = (currentSize + 1) + "px";
	}
	else {alert("Font size không được lớn quá 30px");}
}

function decreaseFontSize(p) {

    var txt = document.getElementById(p);
    var style = window.getComputedStyle(txt, null).getPropertyValue("font-size");
    var currentSize = parseFloat(style);
    if (currentSize >10){
    txt.style.fontSize = (currentSize - 1) + "px";
	}
	else {alert("Font size không được nhỏ quá 10px");}
}

function decreaseFontSize2(p) {
	var p = prompt("Chọn đoạn cần giảm kích thước (p1, p2, p3)");
    var txt = document.getElementById(p);
    var style = window.getComputedStyle(txt, null).getPropertyValue("font-size");
    var currentSize = parseFloat(style);
    if (currentSize >10){
    txt.style.fontSize = (currentSize - 1) + "px";
    }
    else {alert("Font size không được nhỏ quá 10px");}
}

function changeColor() {
	document.getElementById("p1").style.color = "blue";
	document.getElementById("p2").style.color = "yellow";
	document.getElementById("p3").style.color = "red";
}

function changeBgColor(color){
	document.body.style.backgroundColor = color;
}

function changeBgColor2(color){
	var color = prompt("Điền màu background muốn chuyển vào đây:");
	document.body.style.backgroundColor = color;
}

function copyContent(paragraph1, paragraph2){
	document.getElementById(paragraph1).innerHTML = document.getElementById(paragraph2).innerHTML;
}

function copyContent2(paragraph1, paragraph2){
	var paragraph1 = prompt("Chọn paragraph1 (p1, p2, p3)");
	var paragraph2 = prompt("Chọn paragraph2 (p1, p2, p3)");
	document.getElementById(paragraph1).innerHTML = document.getElementById(paragraph2).innerHTML;
}

console.log("It's work!!!");