var A = calculator.math;

var B = calculator.result;

function backspace() {
	A.value = A.value.slice(0, -1);
}

function reset() {
	B.value = "";
	A.value = "";
}

function equalto() {
	B.value = eval(A.value);
	A.value = "";
}

function ans() {
	A.value += B.value;
	B.value = "";
}

function pow() {
	if (A.value == "") {
		B.value = Math.pow(B.value, 2);
	}
	else {
		B.value = Math.pow(A.value, 2);
		A.value = "";
	}
}

function sqrt() {
	if (A.value == "") {
		B.value = Math.sqrt(B.value);
	}
	else {
		B.value = Math.sqrt(A.value);
		A.value = "";
	}
}

function percentage() {
	if (A.value == "") {
		B.value = B.value/100;
	}
	else {
		B.value = A.value/100;
		A.value = "";
	}
}

function factorial() {
	var c = A.value;
	var d = B.value;

		if (A.value == "") {
			if (B.value > 0 && B.value %1 == 0) {
				for (var i = d; --i; ) {
		        B.value = d *= i;
		  		}
			}
			
			else if (B.value == 0) {
		    	B.value = 1;
			}

		    else{
		    	B.value = undefined
		    	A.value = "";
		  	}
		}

		else{
			if (A.value > 0 && A.value %1 == 0) {
				for (var i = c; --i; ) {
		        B.value = c *= i;
		        A.value = "";
		  		}
			}
			
			else if (A.value == 0) {
		    	B.value = 1;
		    	A.value = "";
			}

		    else{
		    	B.value = undefined
		    	A.value = "";
		  	}
		}
}