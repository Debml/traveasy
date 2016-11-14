$(document).ready(function(){
	$("#submit").on("click", function(e) {
		var valid = true;
		var errorFeedback = "";

		if ($("#tf-name").hasClass("is-invalid")) {
			errorFeedback += "Enter a valid name. \n";
			valid = false;
		}

		if ($("#tf-email").hasClass("is-invalid")) {
			errorFeedback += "Enter a valid email address. \n";
			valid = false;
		}

		if ($("#name").val() == "" || $("#email").val() == "" || $("#subject").val() == "" || $("#message").val() == "") {
			errorFeedback += "Fill out all textfields.";
			valid = false;
		}

		if (valid) {
			alert("Email was sent!");
			window.location.reload(true);
		}
		else {
			alert("Please fix these mistakes: \n" + errorFeedback);
		}
		
	});
});