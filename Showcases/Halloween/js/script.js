function openDoor() {
	document.getElementById("body").style.display="block";
	document.getElementById("backgroundMusic").play();
	document.getElementById("doorOpen").play();
	document.getElementById("ambience").play();
	document.getElementById("door1").style.opacity=0;
	document.getElementById("door2").style.opacity=1;
	setTimeout(function(){
		document.getElementById("door1").style.display="none";
		document.getElementById("door2").style.opacity=0;
	}, 3000);
	setTimeout(function(){
		document.getElementById("doorOpen").volume=0;
	}, 4000);
	setTimeout(function(){
		document.getElementById("dying").querySelector("img").style.animation="blood 12s linear";
		document.getElementById("dying").querySelector("img").style.opacity=1;
		document.getElementById("text1").style.animation="fade 7s linear";
		document.getElementById("text2").style.animation="fade 7s linear";
	}, 5000);
	setTimeout(function(){
		document.getElementById("door2").style.display="none";
		document.getElementById("body").style.opacity=1;
	}, 6000);
	setTimeout(function(){
		document.getElementById("fire").play();
		document.getElementById("fire1").style.opacity=1;
		document.getElementById("fire2").style.opacity=1;		
	}, 8000);
	setTimeout(function(){
		document.getElementById("ghost1").querySelector("img").style.animation="ghost1 15s linear infinite";
		document.getElementById("whisper").play();
		document.getElementById("ghost2").querySelector("img").style.animation="ghost2 60s linear infinite";
		document.getElementById("ghost3").querySelector("img").style.animation="ghost3 60s linear infinite";
		document.getElementById("ghost4").querySelector("img").style.animation="ghost4 10s infinite";
	}, 17000);
	setTimeout(function(){
		document.getElementById("ghost5").querySelector("img").style.animation="ghost5 8s infinite";
	}, 21000);
	setTimeout(function(){
		document.getElementById("ghost7").querySelector("img").style.animation="ghost7 8s infinite";
	}, 23000);
	setTimeout(function(){
		document.getElementById("ghost6").style.opacity=1;
		document.getElementById("ghost6").style.animation="fade 3s linear";
	}, 25000);
}

setTimeout(function(){
	openDoor();
}, 10000);