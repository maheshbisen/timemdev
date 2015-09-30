$(document).ready(function () {
	Parse.initialize("LcQYRvseB9ExXGIherTt1v2pw2MVzPFwVXfigo11", "F5enB5XfOfqo4ReAItZCkJVxOY76hoveZrOMwih9");
	$("#signUp").on("click", function(e){
		e.preventDefault();
		
		 if($.trim($('#inputUsername').val())==''){
				alert('Error:- Please enter email address.');		
				$('#inputUsername').focus();
				return false;
			}else if(!IsValidEmail($.trim(jQuery('#inputUsername').val()))){
				alert('Error:- Please enter valid email address.');		
				$('#inputUsername').focus();
				return false;
			}
		
		if($('#inputPassword').val() == $('#retypePassword').val()) {
			newUser($("#inputUsername").val(), $("#inputPassword").val());
		} else {
			document.getElementById('passwordsDoNotMatch').style.display = "block";
			// Gives nice delay...
			setTimeout(function() {
				document.getElementById('passwordsDoNotMatch').style.display = "none";
			},2000);
			console.log("Passwords do not match. Please try again!");
		}
	});

	// This function adds user to Parse
	var newUser = function (username, password){
		var user = new Parse.User();
		user.set("username", username);		
		user.set("password", password);

		user.signUp(null, {
		success: function(user) {
				// Hooray! Let them use the app now.
				alert("Please sign in with your new user name");
				document.cookie="username=" + username;
				window.location.href = "assignments.html";
			}, error: function(user, error) {
				// Show the error message somewhere and let the user try again.
				alert("Error: " + error.code + " " + error.message);
			}
		});

		//Create a settings row in Parse every time a user signs up
		var SettingsId = Parse.Object.extend("Settings");
		var settingsId = new SettingsId();
		var settings_data = {
		  username: username,
		  wakeUpHour: 0,
		  wakeUpMinute: 0,
		  sleepHour: 0,
		  sleepMinute: 0,
		  otherActivitiesHour: 0,
		  otherActivitiesMinute: 0,
		  sleepCalculatorCheck: true
		};

		settingsId.save(settings_data, {
		  success: function(settingsId) {
		    console.log("Successfully sent to Parse!" + settingsId);
		  }, error(settingsId, error) {
		    console.log("Error: " + error.code + " " + error.message);
		  }
		});
	}

	// Scroll Up Feature
	$(window).scroll(function () {
	    if ($(this).scrollTop() > 100) {
	        $('.scrollup').fadeIn();
	    } else {
	        $('.scrollup').fadeOut();
	    }
	});
	$('.scrollup').click(function () {
    	$("html, body").animate({
        	scrollTop: 0
    	}, 600);
		return false;
	});
});

// Valid Email  Function
function IsValidEmail(strValue){
	//var objRegExp =/(^[a-z0-9]([a-z0-9_\.]*)@([a-z0-9_\-\.]*)([.][a-z]{3})$)|(^[a-z0-9]([a-z0-9_\.]*)@([a-z0-9_\-\.]*)(\.[a-z]{2,3})(\.[a-z]{2})*$)/i;
	var objRegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return objRegExp.test(strValue);
}