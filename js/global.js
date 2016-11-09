$(document).ready(function () {
    $("#ttLogout").on("click", function () {
        console.log("logout");
        logout();
    });
});

function logout() {
    var jsonData = {
        "action": "LOGOUT",
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