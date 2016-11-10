$(document).ready(function () {

    loadToDo();

    function loadToDo(){
        console.log("load");
        var jsonData = {
            "action": "LOADCHECKLIST",
            "checklistType": "ToDo",
            "username": $("#username").html()
        };

        $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function (jsonResponse) {
                loadToDoCards(jsonResponse);
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }

    function loadToDoCards(toDoChecklists){
        $.each(toDoChecklists, function(key, value) {
            var card = '<td class="card" id="tdc' + value["id"] + '"><div class="mdl-card-square mdl-card mdl-shadow--4dp"><div class="mdl-card__title mdl-card--expand"><h2 class="mdl-card__title-text">' + value["checklistName"] + '</h2></div><div class="mdl-card__supporting-text">' + value["checklistDescription"] + '</div><div class="mdl-card__actions mdl-card--border"><a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">Open Checklist</a></div><div class="mdl-card__menu"><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--white"><i class="material-icons">edit</i></button><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--white"><i class="material-icons">delete</i></button></div></div></td>';
            $("#to-DoChecklists").append(card);
        });
    }

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
        saveToDo();
    });

    function addActivity(){
        toDoItems++;
        var newActivityTemplate = '<div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input activityItem" type="text" id="item' + toDoItems + '"><label class="mdl-textfield__label" for="' + toDoItems + '"></label></div>';
        $("#activityList").append(newActivityTemplate);
    }

    function saveToDo(){
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

        resetChecklist();
    }

    function resetChecklist(){
        toDoItems = 0;
    }
});