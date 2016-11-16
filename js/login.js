$(document).ready(function () {
    $("#loginButton").on("click", function () {
        var valid = true;
        var errorFeedback = "";

        if ($("#username").val() == "" || $("#password").val() == "" ) {
            errorFeedback += "Please enter your username and password";
			valid = false;
        }

        if (valid) {
            login();
		}
		else {
			alert(errorFeedback);
		}
    });
});

function login() {
    var jsonData = {
        "action": "LOGIN",
        "username": $("#username").val(),
        "password": $("#password").val(),
    };

    $.ajax({
        url: "data/applicationLayer.php",
        type: "POST",
        data: jsonData,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function (jsonResponse) {
            window.location.replace("index.php");
        },
        error: function (errorMessage) {
            alert("Wrong credentials. Try again.");
        }
    });
}