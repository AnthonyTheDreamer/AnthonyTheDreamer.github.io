var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var now = new Date();
var year = now.getYear();

if (year < 1900) {
    year=year+1900;
};

for (var i = year; i >= 1900; i--) {
	document.getElementById("year").innerHTML+="<option>" + i + "</option>";
};

document.getElementById("year").onchange = function() {
	document.getElementById("month").innerHTML = "";
	document.getElementById("month").innerHTML = "<option>Month</option>"
	document.getElementById("day").innerHTML = "";
	document.getElementById("day").innerHTML = "<option>Day</option>"
	if (document.getElementById("year").value != "Year") {
		console.log("notyear");
		for (var i = 0; i < month.length; i++ ) {
		document.getElementById("month").innerHTML+="<option>" + month[i] + "</option>";
		};
	};
};

document.getElementById("month").onchange = function() {
	document.getElementById("day").innerHTML = "";
	document.getElementById("day").innerHTML = "<option>Day</option>"
	if (document.getElementById("month").value=="April" || document.getElementById("month").value=="June" || document.getElementById("month").value=="September" || document.getElementById("month").value=="November") {
		for (var i = 1; i <= 30; i++) {
			document.getElementById("day").innerHTML+="<option>" + i + "</option>";
		}
	}
	else if (document.getElementById("month").value=="February") {
		if (document.getElementById("year").value%4 == 0) {
			for (var i = 1; i <= 29; i++) {
				document.getElementById("day").innerHTML+="<option>" + i + "</option>";
			}
		}
		else {
			for (var i = 1; i <= 28; i++) {
				document.getElementById("day").innerHTML+="<option>" + i + "</option>";
			}
		}
	}
	else {
		for (var i = 1; i <= 31; i++) {
			document.getElementById("day").innerHTML+="<option>" + i + "</option>";
			}
		}
	
}

$('#registerform').on('submit', function(){
	var valid = true;

	if ($('#firstname').val().trim() == '') {
		$('#firstname').attr("placeholder", "First name is required (Steve)");
		$('#firstname').addClass('inputerror');
		$('#firstname').css('border', '3px solid #ac3235');
		valid = false;
	} else {
		$('#firstname').attr("placeholder", "First name");
		$('#firstname').removeClass('inputerror');
		$('#firstname').css('border', '3px solid rgb(71, 42, 12)');
	}

	if ($('#lastname').val().trim() == '') {
		$('#lastname').attr("placeholder", "Last name is required (Gates)");
		$('#lastname').addClass('inputerror');
		$('#lastname').css('border', '3px solid #ac3235');
		valid = false;
	} else {
		$('#lastname').attr("placeholder", "Last name");
		$('#lastname').removeClass('inputerror');
		$('#lastname').css('border', '3px solid rgb(71, 42, 12)');
	}

	if ($('#email').val().match(/^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,7})$/) == null) {
		$('#email').val('');
		$('#email').attr("placeholder", "Email is invalid (Eg: yourmom@isfat.com)	");
		$('#email').addClass('inputerror');
		$('#email').css('border', '3px solid #ac3235');
		valid = false;
	} else {
		$('#email').attr("placeholder", "Email");
		$('#email').removeClass('inputerror');
		$('#email').css('border', '3px solid rgb(71, 42, 12)');
	}

	if ($('#facebook').val().match(/https:\/\/www.facebook.com/) == null) {
		$('#facebook').val('');
		$('#facebook').attr("placeholder", 'Invalid Faceboook (Eg: https://www.facebook.com/youraccount)');
		$('#facebook').addClass('inputerror');
		$('#facebook').css('border', '3px solid #ac3235');
		valid = false;
	} else {
		$('#facebook').attr("placeholder", "Facebook (Eg: https://www.facebook.com/youraccount)");
		$('#facebook').removeClass('inputerror');
		$('#facebook').css('border', '3px solid rgb(71, 42, 12)');
	}

	if ($('#password').val().trim() == '') {
		$('#password').attr("placeholder", "Password is required (123456)");
		$('#password').addClass('inputerror');
		$('#password').css('border', '3px solid #ac3235');
		valid = false;
	} else {
		$('#password').attr("placeholder", "Password");
		$('#password').removeClass('inputerror');
		$('#password').css('border', '3px solid rgb(71, 42, 12)');
	}

	if ($('#address').val().trim() == '') {
		$('#address').attr("placeholder", "Address is required (1234 Street Street, USA)");
		$('#address').addClass('inputerror');
		$('#address').css('border', '3px solid #ac3235');
		valid = false;
	} else {
		$('#address').attr("placeholder", "Address");
		$('#address').removeClass('inputerror');
		$('#address').css('border', '3px solid rgb(71, 42, 12)');
	}

	if ($('#number').val().match(/^(\+){0,1}\d{1,15}$/) == null) {
		$('#number').val('');
		$('#number').attr("placeholder", "Phone number is invalid (Eg: 0420696969)");
		$('#number').addClass('inputerror');
		$('#number').css('border', '3px solid #ac3235');
		valid = false;
	} else {
		$('#number').attr("placeholder", "Phone number");
		$('#number').removeClass('inputerror');
		$('#number').css('border', '3px solid rgb(71, 42, 12)');
	}

	if ($('#year').val() == "Year" || $('#month').val() == "Month" || $('#day').val()=="Day") {
		$('#selectdate').text("Date of birth is invalid");
		$('#selectdate').css('color', '#ac3235')
		valid = false;
	} else {
		$('#selectdate').text("Date of birth:");
		$('#selectdate').css('color', '#383b3e');
	}

	return valid;

});