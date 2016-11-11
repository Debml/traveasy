$(document).ready(function () {
    componentHandler.upgradeDom();
    var toDoItems = 0;

    $("#addToDo").on("click", function () {
        toDoListAddHeaders();
        addActivity();
        $("#toDoChecklists").hide();
        $("#toDoWindow").show();
    });

    $("#addActivity").on("click", function () {
        addActivity();
        $('.mdl-tooltip.is-active').removeClass('is-active');    
    });

    $("#saveToDo").on("click", function () {
        saveToDo();
        $('.mdl-tooltip.is-active').removeClass('is-active');            
    });

    $("#closeToDo").on("click", function () {
        closeToDo();
        $('.mdl-tooltip.is-active').removeClass('is-active');            
    });

    $(".openToDoChecklist").on("click", function (event) {
        var checklistId = $(this).attr('id')[4]; //parsing the button/checklist id
        var checklistName = $(this).parent().parent().find("h2").html() //parsing card/checklist name
        var checklistDescription = $(this).parent().parent().children(".description").html()//parsing card/checklist description
        loadToDoExpanded(checklistId, checklistName, checklistDescription);
    });

    $(".closeToDoChecklist").on("click", function (event) {
        $("#toDoExpanded").hide();
        $("#toDoChecklists").show();
    });

    function toDoListAddHeaders(){
        var headerTemplate = '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="chName"><label class="mdl-textfield__label" for="chName">Name your checklist</label></div>';
        $("#activityList").append(headerTemplate);

        headerTemplate = '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="chDescription"><label class="mdl-textfield__label" for="chDescription">Type a small description for your checklist</label></div>';
        $("#activityList").append(headerTemplate);
        componentHandler.upgradeDom();        
    }

    function addActivity() {
        toDoItems++;
        var newActivityTemplate = '<div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input activityItem" type="text" id="itemName' + toDoItems + '"><label class="mdl-textfield__label" for="itemName' + toDoItems + '">Activity #' + toDoItems + '</label></div>';
        $("#activityList").append(newActivityTemplate);

        newActivityTemplate = '<div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input activityDescription" type="text" id="itemNotes' + toDoItems + '"><label class="mdl-textfield__label" for="itemNotes' + toDoItems + '">Notes</label></div>';
        $("#activityList").append(newActivityTemplate);
        componentHandler.upgradeDom();
    }

    function saveToDo() {
        var itemList = [];

        $(".activityItem").each(function () {
            itemList.push({
                "name": $(this).val(),
                "quantity": 0,
                "notes": "",
            });
        });

        $(".activityDescription").each(function (key, noteValue) {
            itemList[key]["notes"] = noteValue.value;
        });        

        console.log(itemList);

        var jsonData = {
            "action": "SAVECHECKLIST",
            "checklistType": "ToDo",
            "checklistDescription": "",
            "checklistName": $("#chName").val(),
            "activityItems": itemList,
            "username": $("#username").html()
        };

        $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function (jsonResponse) {
                location.reload();
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });

        resetChecklist();
    }

    function loadToDoExpanded(checklistId, checklistName, checklistDescription) {
        var jsonData = {
            "action": "LOADITEMS",
            "checklistId": checklistId
        };

        $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function (jsonResponse) {
                loadItemsToExpanded(jsonResponse, checklistName, checklistDescription);
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }

    function loadItemsToExpanded(itemsToLoad, checklistName, checklistDescription) {
        $("#toDoExpandedList").append('<h2>' + checklistName + '</h2>');
        $("#toDoExpandedList").append('<p>' + checklistDescription + '</p>');

        $.each(itemsToLoad, function (key, value) {
            var cardHtml = '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><h5>' + value["itemName"] + '</h5></span></li>'
            $("#toDoExpandedList").append(cardHtml);
            cardHtml = '<li class="mdl-list__item"><span class="mdl-list__item-primary-content">' + value["notes"] + '</span></li>'
            $("#toDoExpandedList").append(cardHtml);
        });

        $("#toDoChecklists").hide();
        $("#toDoExpanded").show();
    }

    function closeToDo(){
        $("#toDoWindow").hide();
        $("#toDoChecklists").show();            
        resetChecklist();    
    }

    function resetChecklist() {
        toDoItems = 0;
        $("#activityList").html("");
    }
});