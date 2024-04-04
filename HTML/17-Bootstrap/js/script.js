

function playSound() {
	$("#hoveraudio")[0].play();
}

function stopSound() {
	$("#hoveraudio")[0].pause();
	$("#hoveraudio")[0].currentTime = 0;
}

function clicksound() {
	$("#clickaudio")[0].play();
}

$("#playpause")[0].onclick = function() {
    if ($("#background")[0].paused) {
    	$("#background")[0].play();
    	$("#playpause").css("filter", "brightness(100%)");
    }
    else {
    	$("#background")[0].pause();
    	$("#playpause").removeClass("active");
    	$("#playpause").css("filter", "brightness(50%)");
    }
};

window.onscroll = function() {
	if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        document.getElementById("backtotop").style.transform = "translateX(0)";
    } else {
        document.getElementById("backtotop").style.transform = "translateX(100%)";
    }
};


