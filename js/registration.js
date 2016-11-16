$(document).ready(function () {
    $("#registerButton").on("click", function () {
        var valid = true;
        var errorFeedback = "";

        if ($("#firstName").val() == "" || $("#lastName").val() == "" || $("#username").val() == "" || $("#password").val() == "" || $("#confirmPassword").val() == "" || $("#email").val() == "") {
            alert("Please fill out all fields");
        }
        else {
            if ($("#tf-fName").hasClass("is-invalid")) {
                errorFeedback += "Enter a valid first name. \n";
                valid = false;
            }
            if ($("#tf-lName").hasClass("is-invalid")) {
                errorFeedback += "Enter a valid last name. \n";
                valid = false;
            }
            if ($("#tf-email").hasClass("is-invalid")) {
                errorFeedback += "Enter a valid email. \n";
                valid = false;
            }

            if (valid) {
                //password and confirm password fields match
                if ($("#password").val() == $("#confirmPassword").val()) {
                    registerToDatabase();
                }
                else {
                    alert("Passwords don't match. Try again!");
                }
            }
            else {
			    alert("Please fix these mistakes: \n" + errorFeedback);
            }
        }

        function registerToDatabase() {
            var jsonData = {
                "action": "REGISTER",
                "firstName": $("#firstName").val(),
                "lastName": $("#lastName").val(),
                "username": $("#username").val(),
                "password": $("#password").val(),
                "email": $("#email").val()
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
                    alert(errorMessage.responseText);
                }
            });
        }
    });
});