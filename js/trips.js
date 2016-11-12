$(document).ready(function() {
    componentHandler.upgradeDom();

    $("#addTrip").on("click", function() {
        createAddTripModal();
        $("#addTripWindow").show();
        $("#addTrip").hide();
    });

    function createAddTripModal(){
        htmlTag = '<form  id="tripForm" action="#" class="mdl-grid"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" pattern="[A-Z, a-z, , 0-9]*" id="tripName"><label class="mdl-textfield__label" for="tripName">Name your trip</label><span class="mdl-textfield__error">Letters and spaces only</span></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" pattern="[A-Z, a-z, ]*" id="city"><label class="mdl-textfield__label" for="city">City</label><span class="mdl-textfield__error">Letters and spaces only</span></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" pattern="[A-Z, a-z, ]*" id="state"><label class="mdl-textfield__label" for="state">State</label><span class="mdl-textfield__error">Letters and spaces only</span></div><div id="select_country" class="mdl-selectfield mdl-js-selectfield mdl-textfield--floating-label"><select id="country" name="country" class="mdl-selectfield__select" required><option value=""></option></select><label for="country" class="mdl-selectfield__label">Country</label><span class="mdl-selectfield__error">Please select your country</span></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="startDate"><label class="mdl-textfield__label" for="startDate">Start Date (MM/DD/YYYY)</label><span class="mdl-textfield__error">MM/DD/YYYY</span></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="endDate"><label class="mdl-textfield__label" for="endDate">End Date (MM/DD/YYYY)</label><span class="mdl-textfield__error">MM/DD/YYYY</span></div><div id="select_toDoOptions" class="mdl-selectfield mdl-js-selectfield mdl-textfield--floating-label"><select id="toDoOptions" name="toDoOptions" class="mdl-selectfield__select"><option value=""></option></select><label for="toDoOptions" class="mdl-selectfield__label">Select a To Do list (optional)</label></div><div id="select_toBringOptions" class="mdl-selectfield mdl-js-selectfield mdl-textfield--floating-label"><select id="toBringOptions" name="toBringOptions" class="mdl-selectfield__select"><option value=""></option></select><label for="toBringOptions" class="mdl-selectfield__label">Select an Item list (optional)</label></div></form>';

        $("#tripForm").append(htmlTag);
        loadAllChecklists();
        loadCountries();
        componentHandler.upgradeDom();
    }

    $("#saveTrip").on("click", function() {
        saveTrip();
        closeAddTrip();
        $('.mdl-tooltip.is-active').removeClass('is-active');
    });

    $("#closeTrip").on("click", function() {
        closeAddTrip();
        $('.mdl-tooltip.is-active').removeClass('is-active');
    });

    function closeAddTrip() {
        $("#addTripWindow").hide();
        $("#addTrip").show();
        resetAddTrip();
    }

    function resetAddTrip(){
        $("#tripForm").html("");
    }

    function loadAllChecklists(){
        loadToBring();
        loadToDo();
        componentHandler.upgradeDom();
    }

    function loadToBring() {
        var jsonData = {
            "action": "LOADCHECKLISTS",
            "checklistType": "ToBring",
            "username": $("#username").html()
        };

        $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResponse) {
                fillChecklistsSelectFields(jsonResponse);
            },
            error: function(errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }

    function loadToDo() {
        var jsonData = {
            "action": "LOADCHECKLISTS",
            "checklistType": "ToDo",
            "username": $("#username").html()
        };

        $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResponse) {
                fillChecklistsSelectFields(jsonResponse);
            },
            error: function(errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }

    function fillChecklistsSelectFields(checklists){
        var toDoTag = $("#toDoOptions");
        var toBringTag = $("#toBringOptions")

        $.each(checklists, function(key, value) {
            if(value["checklistType"] == "ToDo"){
                toDoTag.append('<option value="' + value["id"] + '">' + value["checklistName"] + '</option>');
            }
            else{
                toBringTag.append('<option value="' + value["id"] + '">' + value["checklistName"] + '</option>');
            }
        });
    }

    function loadCountries(){
        $.ajax({
            url: "data/countries.php",
            type: "GET",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResponse) {
                $("#country").append(jsonResponse);
            },
            error: function(errorMessage) {
                alert(errorMessage);
            }
        });
    }

    function saveTrip() {
        var jsonData = {
            "action": "SAVETRIP",
            "username": $("#username").html(),
            "tripName": $("#tripName").val(),
            "city": $("#city").val(),
            "state": $("#state").val(),
            "country": $("#country :selected").text(),
            "startDate": $("#startDate").val(),
            "endDate": $("#endDate").val(),
            "toDoList": $("#toDoOptions").val(),
            "toBringList": $("#toBringOptions").val()
        };

        $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResponse) {
                console.log(jsonResponse);
            },
            error: function(errorMessage) {
                alert(errorMessage);
            }
        });
    }
});