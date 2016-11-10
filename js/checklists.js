$(document).ready(function () {
    var toDoItems = 0;

    $("#addToDo").on("click", function () {
        addActivity();    
        $("#toDoWindow").show();
        $("#to-DoChecklists").hide();
    });

    $("#addActivity").on("click", function () {
        addActivity();
    });

    $("#saveToDo").on("click", function () {
        saveActivity();
    });

    function addActivity(){
        toDoItems++;
        var newActivityTemplate = '<div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input activityItem" type="text" id="fname"><label class="mdl-textfield__label" for="fname"></label></div>';
        $("#activityList").append(newActivityTemplate);
    }

    function saveActivity(){
        var itemList = [];

        $(".activityItem").each(function(){
            itemList.push({
                "name": $(this).val(),
                "quantity": 0,
                "notes" : "",
            });
        });

        var jsonData = {
            "action": "SAVECHECKLIST",
            "checklistType": "ToDo",
            "checklistDescription": "",
            "checklistName": $("#chName").val(),
            "activityItems" : itemList,
            "username": $("#username").html()
        };

        $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function (jsonResponse) {
                //reload page or replace cards
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }
});