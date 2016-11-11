$(document).ready(function () {
    //Section for To-Do Checklists
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
        var checklistId = $(this).attr('id'); //parsing the button/checklist id
        checklistId = checklistId.slice(4);
        var checklistName = $(this).parent().parent().find("h2").html() //parsing card/checklist name
        var checklistDescription = $(this).parent().parent().children(".description").html()//parsing card/checklist description
        loadToDoExpanded(checklistId, checklistName, checklistDescription);
    });

    $(".closeToDoChecklist").on("click", function (event) {
        $("#toDoExpandedList").html(""); //resets the div
        $("#toDoExpanded").hide();
        $("#toDoChecklists").show();
    });

    function toDoListAddHeaders(){
        var headerTemplate = '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="tdchName"><label class="mdl-textfield__label" for="tdchName">Name your checklist</label></div>';
        $("#activityList").append(headerTemplate);

        headerTemplate = '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="tdchDescription"><label class="mdl-textfield__label" for="tdchDescription">Type a small description for your checklist</label></div>';
        $("#activityList").append(headerTemplate);
        componentHandler.upgradeDom();        
    }

    function addActivity() {
        toDoItems++;
        var newActivityTemplate = '<div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input tdcItem" type="text" id="activityName' + toDoItems + '"><label class="mdl-textfield__label" for="activityName' + toDoItems + '">Activity #' + toDoItems + '</label></div>';
        $("#activityList").append(newActivityTemplate);

        newActivityTemplate = '<div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input tdcNotes" type="text" id="itemNotes' + toDoItems + '"><label class="mdl-textfield__label" for="itemNotes' + toDoItems + '">Notes</label></div>';
        $("#activityList").append(newActivityTemplate);
        componentHandler.upgradeDom();
    }

    function saveToDo() {
        var itemList = [];

        $(".tdcItem").each(function () {
            itemList.push({
                "name": $(this).val(),
                "quantity": 0, //intended, to-dos have no quantities
                "notes": "", //modified in next loop
            });
        });

        $(".tdcNotes").each(function (key, noteValue) {
            itemList[key]["notes"] = noteValue.value;
        });        

        var jsonData = {
            "action": "SAVECHECKLIST",
            "checklistType": "ToDo",
            "checklistDescription": $("#tdchDescription").val(),
            "checklistName": $("#tdchName").val(),
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
                loadToDoDataExpanded(jsonResponse, checklistName, checklistDescription);
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }

    function loadToDoDataExpanded(itemsToLoad, checklistName, checklistDescription) {
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

        toBringItems = 0;
        $("#itemList").html("");        
    }

    //Section for To-Bring Checklists
    componentHandler.upgradeDom();
    var toBringItems = 0;

    $("#addToBring").on("click", function () {
        toBringListAddHeaders();
        addItem();
        $("#toBringChecklists").hide();
        $("#toBringWindow").show();
    });

    $("#addItem").on("click", function () {
        addItem();
        $('.mdl-tooltip.is-active').removeClass('is-active');    
    });

    $("#saveToBring").on("click", function () {
        saveToBring();
        $('.mdl-tooltip.is-active').removeClass('is-active');            
    });

    $("#closeToBring").on("click", function () {
        closeToBring();
        $('.mdl-tooltip.is-active').removeClass('is-active');            
    });    

    $(".openToBringChecklist").on("click", function (event) {
        var checklistId = $(this).attr('id'); //parsing the button/checklist id
        checklistId = checklistId.slice(4);
        var checklistName = $(this).parent().parent().find("h2").html() //parsing card/checklist name
        var checklistDescription = $(this).parent().parent().children(".description").html()//parsing card/checklist description
        loadToBringExpanded(checklistId, checklistName, checklistDescription);
    });

    $(".closeToBringChecklist").on("click", function (event) {
        $("#toBringExpandedList").html(""); //resets the div
        $("#toBringExpanded").hide();
        $("#toBringChecklists").show();
    });

    function toBringListAddHeaders(){
        var headerTemplate = '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="tbchName"><label class="mdl-textfield__label" for="tbchName">Name your checklist</label></div>';
        $("#itemList").append(headerTemplate);

        headerTemplate = '<div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="tbchDescription"><label class="mdl-textfield__label" for="tbchDescription">Type a small description for your checklist</label></div>';
        $("#itemList").append(headerTemplate);
        componentHandler.upgradeDom();        
    }

    function addItem() {
        toBringItems++;
        var newItemTemplate = '<div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input tbcItem" type="text" id="itemName' + toBringItems + '"><label class="mdl-textfield__label" for="itemName' + toBringItems + '">Item #' + toBringItems + '</label></div>';
        $("#itemList").append(newItemTemplate);

        newItemTemplate = '<div class="mdl-textfield mdl-js-textfield"><input class="mdl-textfield__input tbcNotes" type="text" id="itemNotes' + toBringItems + '"><label class="mdl-textfield__label" for="itemNotes' + toBringItems + '">Notes</label></div>';
        $("#itemList").append(newItemTemplate);
        componentHandler.upgradeDom();
    }

    function saveToBring() {
        var itemList = [];

        $(".tbcItem").each(function () {
            itemList.push({
                "name": $(this).val(),
                "quantity": 0, //intended, to-dos have no quantities
                "notes": "", //modified in next loop
            });
        });

        $(".tbcNotes").each(function (key, noteValue) {
            itemList[key]["notes"] = noteValue.value;
        });        

        var jsonData = {
            "action": "SAVECHECKLIST",
            "checklistType": "ToBring",
            "checklistDescription": $("#tbchDescription").val(),
            "checklistName": $("#tbchName").val(),
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
                //PENDING
                //find a way to load the second tab
                location.reload();
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });

        resetChecklist();
    }

    function loadToBringExpanded(checklistId, checklistName, checklistDescription) {
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
                loadToBringDataExpanded(jsonResponse, checklistName, checklistDescription);
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }

    function loadToBringDataExpanded(itemsToLoad, checklistName, checklistDescription) {
        $("#toBringExpandedList").append('<h2>' + checklistName + '</h2>');
        $("#toBringExpandedList").append('<p>' + checklistDescription + '</p>');

        $.each(itemsToLoad, function (key, value) {
            var cardHtml = '<li class="mdl-list__item"><span class="mdl-list__item-primary-content"><h5>' + value["itemName"] + '</h5></span></li>'
            $("#toBringExpandedList").append(cardHtml);
            cardHtml = '<li class="mdl-list__item"><span class="mdl-list__item-primary-content">' + value["notes"] + '</span></li>'
            $("#toBringExpandedList").append(cardHtml);
        });

        $("#toBringChecklists").hide();
        $("#toBringExpanded").show();
    }

    function closeToBring(){
        $("#toBringWindow").hide();
        $("#toBringChecklists").show();            
        resetChecklist();    
    }                            
});