$(document).ready(function () {
    $("#loginButton").on("click", function () {
        login();
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
            alert(errorMessage);
        }
    });
}