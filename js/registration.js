$(document).ready(function () {
    $("#registerButton").on("click", function () {
        //password and confirm password fields match
        if ($("#password").val() == $("#confirmPassword").val()) {
            registerToDatabase();
            console.log("register");
        }
        else {
            //PENDING
            //comment that passwords are not the same
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
                    //PENDING
                    //send to homepage, log in, maybe with start session
                },
                error: function (errorMessage) {
                    alert(errorMessage.responseText);
                }
            });
        }

    });
});