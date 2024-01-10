function backspace() {
	$('.display')[0].value = $('.display')[0].value.slice(0, -1);
}

function reset() {
	$('.display').value = "";	
}

function equalto() {
	$('.display')[1].value = eval($('.display')[0].value);
	$('.display')[0].value = "";
}

function ans() {
	$('.display')[0].value += $('.display')[1].value;
	$('.display')[1].value = "";
}

function pow() {
	if ($('.display')[0].value == "") {
		$('.display')[1].value = Math.pow($('.display')[1].value, 2);
	}
	else {
		$('.display')[1].value = Math.pow($('.display')[0].value, 2);
		$('.display')[0].value = "";
	}
}

function sqrt() {
	if ($('.display')[0].value == "") {
		$('.display')[1].value = Math.sqrt($('.display')[1].value);
	}
	else {
		$('.display')[1].value = Math.sqrt($('.display')[0].value);
		$('.display')[0].value = "";
	}
}

function percentage() {
	if ($('.display')[0].value == "") {
		$('.display')[1].value = $('.display')[1].value/100;
	}
	else {
		$('.display')[1].value = $('.display')[0].value/100;
		$('.display')[0].value = "";
	}
}

function factorial() {
	var a = $('.display')[0].value;
	var b = $('.display')[1].value;

		if ($('.display')[0].value == "") {
			if ($('.display')[1].value > 0 && $('.display')[1].value %1 == 0) {
				for (var i = b; --i; ) {
		        $('.display')[1].value = b *= i;
		  		}
			}
			
			else if ($('.display')[1].value == 0) {
		    	$('.display')[1].value = 1;
			}

		    else{
		    	$('.display')[1].value = undefined
		    	$('.display')[0].value = "";
		  	}
		}

		else{
			if ($('.display')[0].value > 0 && $('.display')[0].value %1 == 0) {
				for (var i = a; --i; ) {
		        $('.display')[1].value = a *= i;
		        $('.display')[0].value = "";
		  		}
			}
			
			else if ($('.display')[0].value == 0) {
		    	$('.display')[1].value = 1;
		    	$('.display')[0].value = "";
			}

		    else{
		    	$('.display')[1].value = undefined
		    	$('.display')[0].value = "";
		  	}
		}
}

function theme() {
	if ($('#checkbox')[0].checked) {
		$('body').css('background-image', 'url("img/background2.jpg")');
		$('.body').css('border-radius', '10%');
		$('.body').css('background-color', 'black');
		$('.head').text('iPhone');
		$('.head').css('color', 'white');
		$('#spantext').css('color', 'white');
		$('.display').css('background-color', 'gray');
		$('.screenborder').css('border', '0px');
		$('.key').css('border-radius', '0%');
		$('.display').css('font-family', 'Arial');
		$('.display').css('color', 'white');
		$('.number').css('background-color', 'rgb(210, 211, 215)');
		$('.number').css('color', 'rgb(89, 90, 94)');
		$('.yellow').css('background-color', 'rgb(248, 143, 19)');
		$('.yellow').css('color', 'rgb(236, 225, 185)');
	}
	else {
		$('body').css('background-image', 'url("img/background.jpeg")');
		$('.body').css('border-top-left-radius', '5%');
		$('.body').css('border-top-right-radius', '5%');
		$('.body').css('background-color', 'rgb(209, 210, 214)');
		$('.head').text('CASINO');
		$('.head').css('color', 'rgb(24, 15, 11)');
		$('#spantext').css('color', 'black');
		$('.display').css('background-color', 'rgb(210, 224, 225)');
		$('.screenborder').css('border-left', '25px ridge rgb(88, 92, 101)');
		$('.screenborder').css('border-right', '25px groove rgb(88, 92, 101)');
		$('.screenborder').css('border-top', '10px ridge rgb(88, 92, 101)');
		$('.screenborder').css('border-bottom', '20px groove rgb(88, 92, 101)');
		$('.key').css('border-top-right-radius', '10%');
		$('.key').css('border-top-left-radius', '10%');
		$('.key').css('border-bottom-right-radius', '15%');
		$('.key').css('border-bottom-left-radius', '15%');
		$('.display').css('font-family', 'digital-7')
		$('.display').css('color', 'black')
		$('.key').css('background-color', 'rgb(49, 52, 59)');
		$('.key').css('color', 'rgb(241, 245, 249)');
		$('#CE').css('background-color', 'rgb(154, 86, 104)');
	}
}