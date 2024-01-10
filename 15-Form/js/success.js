var success=location.search;
success=decodeURIComponent(success);
var user=success.split('+').join(' ');
var firstname=user.substring(1,user.search("&lastname"));
var lastname=user.substring(user.search("lastname"),user.search("&email"));
var email=user.substring(user.search("email"),user.search("&facebook"));
var facebook=success.substring(success.search("facebook"),success.search("&password"));
var year=user.substring(user.search("year"),user.search("&month"));
var month=user.substring(user.search("month"),user.search("&day"));
var day=user.substring(user.search("day"),user.search("&gender"));
var gender=user.substring(user.search("gender"),user.search("&address"));
var address=user.substring(user.search("address"),user.search("&number"));
var number=success.substring(success.search("number"),success.search("&submit"));

firstname=firstname.substring(10,firstname.length);
lastname=lastname.substring(9,lastname.length);
email=email.substring(6,email.length);
facebook=facebook.substring(9,facebook.length);
year=year.substring(5,year.length);
month=month.substring(6,month.length);
day=day.substring(4,day.length);
gender=gender.substring(7,gender.length);
address=address.substring(8,address.length);
number=number.substring(7,number.length);

var dayofbirth;
if (day==1 || day==21 || day==31) {
	dayofbirth="<sup>st</sup>";
}

else if (day==2 || day == 22) {
	dayofbirth="<sup>nd</sup>";
}

else if (day==3 || day==23) {
	dayofbirth="<sup>rd<sup>"
}

else if (day=="Day"){dayofbirth=""}

else {
	dayofbirth="<sup>th</sup>";
}

var sex;
if (gender=="male") {
	sex = "lads";
}
else if (gender=="female") {
	sex = "lass";
}

else {
	sex="";
}

document.getElementById("success").innerHTML = "<p>We hearby, our <b>" + sex + "</b>, <b>" + firstname + " " + lastname + 
"</b>. Who was borned in <b>" + month + " " + day + dayofbirth + " " + year +
"</b>. Who lives in <b>" + address + "</b>. Has become one of our adventurers. It will be the honor for us to have you.</p>" + 
"<p>From this on, we and the other adventurers shall contact you by " +
"the email <b>" + email + "</b>, by your number <b>" + number + "</b>, or by the Facebook Account <b>" + facebook + "</b>.</p><p>You are now having the permission to test your knowledge <a href='https://conganh176.github.io/BT15/index.html'>here</a>.</p>"