function openTripOnClick(tripId, tripName, startDate, endDate) {
    loadExpandedTrip(tripId, tripName, startDate, endDate);
}

function loadExpandedTrip(tripId, tripName, startDate, endDate){
    var jsonData = {
        "action": "LOADEXPANDEDTRIP",
        "tripId": tripId
    };

    $.ajax({
        url: "data/applicationLayer.php",
        type: "POST",
        data: jsonData,
        dataType: "json",
        contentType: "application/x-www-form-urlencoded",
        success: function(jsonResponse) {
            loadTripDataExpanded(jsonResponse, tripId, tripName, startDate, endDate)        
        },
        error: function(errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function loadTripDataExpanded(tripData, tripId, tripName, startDate, endDate){
    var htmlTag = $("#tripExpandedList");
    var toDoItems = 0;
    var toBringItems = 0;

    htmlTag.append('<div><h2 style="text-align: center;">' + tripName + '</h2>');
    htmlTag.append('<div><h4 style="text-align: center;">' + tripLocationFormatter(tripData[0]["city"], tripData[0]["state"], tripData[0]["country"]) + '</h4>');
    htmlTag.append('<p style="text-align: center;">' + startDate + " - " + endDate + '</p></div>');

    $.each(tripData, function(key, value) {
        if (value["checklistType"] == "ToDo") {
            toDoItems++;

            var toDoSectionHtml = '<li style="list-style: none;"><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="td' + value["itemId"] + '"><input type="checkbox" id="td' + value["itemId"] + '" class="mdl-checkbox__input" checked><span class="mdl-checkbox__label">' + value["itemName"] + '</span></label><p class="expandedNotes">' + value["itemNotes"] + '</p></li>'
            $("#toDoSection").append(toDoSectionHtml);
            componentHandler.upgradeDom();
        }
        else if (value["checklistType"] == "ToBring") {
            toBringItems++;

            var toBringSectionHtml = '<li style="list-style: none;"><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="td' + value["itemId"] + '"><input type="checkbox" id="td' + value["itemId"] + '" class="mdl-checkbox__input" checked><span class="mdl-checkbox__label">' + value["itemName"] + '</span></label><p class="expandedNotes">' + value["itemNotes"] + '</p></li>'
            $("#toBringSection").append(toBringSectionHtml);
            componentHandler.upgradeDom();
        }
    });

    if (toDoItems == 0) {
        $("#toDoSection").append('<p class="expandedNotes">Looks like you didn\'t select a To-Do checklist!</p>');
    }
    if (toBringItems == 0) {
        $("#toBringSection").append('<p class="expandedNotes">Looks like you didn\'t select an Item checklist!</p>');
    }

    $("#tripCards").hide();
    $("#addTrip").hide();
    $("#tripExpanded").show();
}

function tripLocationFormatter(city, state, country){
    var location = city + ", ";

    if (state != ""){
        location += state + ", ";
    }

    location += country;

    return location;
}

$(document).ready(function() {
    componentHandler.upgradeDom();

    loadTrips();

    $("#addTrip").on("click", function() {
        createAddTripModal();
        $("#addTripWindow").show();
        $("#addTrip").hide();
        $("#tripCards").hide();
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

    $(".closeTrip").on("click", function(event) {
        $("#tripExpandedList").html(""); //resets the div
        $("#toDoSection").html(""); //resets the div
        $("#toBringSection").html(""); //resets the div
        $("#tripExpanded").hide();
        $("#tripCards").show();
        $("#addTrip").show();            
    });

    function closeAddTrip() {
        $("#addTripWindow").hide();
        $("#addTrip").show();
        $("#tripCards").show();
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
                var newCardData = {
                    "id": jsonResponse["tripId"],
                    "tripName": jsonData["tripName"], 
                    "startDate": jsonData["startDate"],
                    "endDate": jsonData["endDate"]
                }

                addTripCardToDOM(newCardData, $("#tripCards"), false);
                closeAddTrip();
                componentHandler.upgradeDom();            
            },
            error: function(errorMessage) {
                alert(errorMessage);
            }
        });
    }

    function loadTrips() {
        var jsonData = {
            "action": "LOADTRIPS",
            "username": $("#username").html()
        };

        $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function(jsonResponse) {
                loadTripCards(jsonResponse);
            },
            error: function(errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }

    function loadTripCards(trips) {
        var htmlTag = $("#tripCards");
        $.each(trips, function(key, value) {
            addTripCardToDOM(value, htmlTag, true);
        });
        componentHandler.upgradeDom();
    }

    function addTripCardToDOM(value, htmlTag, append){
        var card = '<td><div class="card" id="trip' + value["id"] + '"><div class="mdl-card-square mdl-card mdl-shadow--4dp"><div class="mdl-card__title mdl-card--expand"><h2 class="mdl-card__title-text title">' + value["tripName"] + '</h2></div><div class="mdl-card__supporting-text description">' + value["startDate"] + ' - ' + value["endDate"] + '</div><div class="mdl-card__actions mdl-card--border"><p class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect openTrip" id="trip' + value["id"] + '" onclick="openTripOnClick(' + value["id"] + ',\'' + value["tripName"] + '\',\'' + value["startDate"] + '\',\'' + value["endDate"] + '\')">View Trip</p></div><div class="mdl-card__menu"><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--white"><i class="material-icons">edit</i></button><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--white"><i class="material-icons">delete</i></button></div></div></div></td>';
        if(append){
            htmlTag.append(card);
        }
        else{
            htmlTag.prepend(card);
        }
    }    
});