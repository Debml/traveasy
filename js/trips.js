function openTripOnClick(tripId, tripName, startDate, endDate) {
    loadExpandedTrip(tripId, tripName, startDate, endDate);
}

function loadExpandedTrip(tripId, tripName, startDate, endDate) {
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
        success: function (jsonResponse) {
            loadTripDataExpanded(jsonResponse, tripId, tripName, startDate, endDate)
        },
        error: function (errorMessage) {
            alert(errorMessage.responseText);
        }
    });
}

function loadTripDataExpanded(tripData, tripId, tripName, startDate, endDate) {
    var htmlTag = $("#tripExpandedList");
    var toDoItems = 0;
    var toBringItems = 0;

    htmlTag.append('<div><h2 style="text-align: center;" class="tripHeader" id=' + tripId + '>' + tripName + '</h2>');
    htmlTag.append('<div><h4 style="text-align: center;" id="location">' + tripLocationFormatter(tripData[0]["city"], tripData[0]["state"], tripData[0]["country"]) + '</h4>');
    htmlTag.append('<p style="text-align: center;">' + startDate + " - " + endDate + '</p></div>');

    $.each(tripData, function (key, value) {
        if (value["checklistType"] == "ToDo") {
            toDoItems++;
            var checked = "";

            if (value["checked"] == 1) {
                checked = "checked";
            }

            var toDoSectionHtml = '<li style="list-style: none;margin-top:5px;"><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="td' + value["itemId"] + '"><input type="checkbox" id="td' + value["itemId"] + '" class="mdl-checkbox__input checklistItemTripExpanded" ' + checked + '><span class="mdl-checkbox__label">' + value["itemName"] + '</span></label><p class="expandedNotes">' + value["itemNotes"] + '</p></li>'
            $("#toDoSection").append(toDoSectionHtml);
            componentHandler.upgradeDom();
        }
        else if (value["checklistType"] == "ToBring") {
            toBringItems++;
            var checked = "";

            if (value["checked"] == 1) {
                checked = "checked";
            }

            var toBringSectionHtml = '<li style="list-style: none;margin-top:5px;"><label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="td' + value["itemId"] + '"><input type="checkbox" id="td' + value["itemId"] + '" class="mdl-checkbox__input checklistItemTripExpanded" ' + checked + '><span class="mdl-checkbox__label">' + value["itemName"] + '</span></label><p class="expandedNotes">' + value["itemNotes"] + '</p></li>'
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

function tripLocationFormatter(city, state, country) {
    var location = city + ", ";

    if (state != "") {
        location += state + ", ";
    }

    location += country;

    return location;
}

$(document).ready(function () {
    componentHandler.upgradeDom();

    loadTrips();

    $("#addTrip").on("click", function () {
        createAddTripModal();
        $("#addTripWindow").show();
        $("#addTrip").hide();
        $("#tripCards").hide();
        $("#emptyTList").hide();

    });

    function createAddTripModal() {
        htmlTag = '<form id="tripForm" action="#" class="mdl-grid"><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" pattern="[A-Z, a-z, , 0-9]*" id="tripName"><label class="mdl-textfield__label" for="tripName">Name your trip</label><span class="mdl-textfield__error">Letters and spaces only</span></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" pattern="[A-Z, a-z, ]*" id="city"><label class="mdl-textfield__label" for="city">City</label><span class="mdl-textfield__error">Letters and spaces only</span></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" pattern="[A-Z, a-z, ]*" id="state"><label class="mdl-textfield__label" for="state">State (Optional)</label><span class="mdl-textfield__error">Letters and spaces only</span></div><div id="select_country" class="mdl-selectfield mdl-js-selectfield mdl-textfield--floating-label"><select id="country" name="country" class="mdl-selectfield__select" required><option value=""></option></select><label for="country" class="mdl-selectfield__label">Country</label><span class="mdl-selectfield__error">Please select your country</span></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="startDate" pattern="[0-1][1-9][/][0-3][1-9][/][0-9][0-9][0-9][0-9]"><label class="mdl-textfield__label" for="startDate">Start Date (MM/DD/YYYY)</label><span class="mdl-textfield__error">MM/DD/YYYY</span></div><div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"><input class="mdl-textfield__input" type="text" id="endDate" pattern="[0-1][1-9][/][0-3][1-9][/][0-9][0-9][0-9][0-9]"><label class="mdl-textfield__label" for="endDate">End Date (MM/DD/YYYY)</label><span class="mdl-textfield__error">MM/DD/YYYY</span></div><div id="select_toDoOptions" class="mdl-selectfield mdl-js-selectfield mdl-textfield--floating-label"><select id="toDoOptions" name="toDoOptions" class="mdl-selectfield__select"><option value=""></option></select><label for="toDoOptions" class="mdl-selectfield__label">Select a To Do list (optional)</label></div><div id="select_toBringOptions" class="mdl-selectfield mdl-js-selectfield mdl-textfield--floating-label"><select id="toBringOptions" name="toBringOptions" class="mdl-selectfield__select"><option value=""></option></select><label for="toBringOptions" class="mdl-selectfield__label">Select an Item list (optional)</label></div></form>';

        $("#tripForm").append(htmlTag);
        loadAllChecklists();
        loadCountries();
        componentHandler.upgradeDom();
    }

    $("#saveTrip").on("click", function () {
        saveTrip();
        $('.mdl-tooltip.is-active').removeClass('is-active');
    });

    $(".getSuggestion").on("click", function () {
        var location = deFormatLocation();
        var city = location[0];
        var country = "";
        if (location.length == 3) {
            country = location[2];
        }
        else {
            country = location[1];
        }

        $.getJSON('http://api.openweathermap.org/data/2.5/forecast?q=' + city + ',' + country + '&units=metric&APPID=7357ef3e78c452abc9f0e009b17cba2a',
            function (json) {
                console.log(json["list"]);
                weatherConditions = normalizeWeatherInfo(json["list"]);
                addWeatherSuggestions(weatherConditions);
                $(".weatherSuggestionsTitle").show();
            });
    });

    function deFormatLocation(){
        var formattedLocation = $("#location").html().replace(/\s+/g, '');;
        var locationArr = formattedLocation.split(',');
        return locationArr;
    }

    function normalizeWeatherInfo(weatherInfo) {
        var normalizedData = {};
        $.each(weatherInfo, function (key, value) {
            //day was already read
            if (value["dt_txt"].split(' ')[0] in normalizedData) {
                normalizedData[value["dt_txt"].split(' ')[0]]["temperature"] = (normalizedData[value["dt_txt"].split(' ')[0]]["temperature"] + value["main"]["temp"]) / 2;

                //rain index can be averaged
                if (normalizedData[value["dt_txt"].split(' ')[0]]["rain"] != -1 && value["rain"]["3h"] != undefined){
                    normalizedData[value["dt_txt"].split(' ')[0]]["rain"] = (normalizedData[value["dt_txt"].split(' ')[0]]["rain"] + value["rain"]["3h"]) / 2;
                }
                else if (value["rain"] != undefined && value["rain"]["3h"] != undefined){
                    normalizedData[value["dt_txt"].split(' ')[0]]["rain"] = value["rain"]["3h"];
                }

                //snow index can be averaged
                if (normalizedData[value["dt_txt"].split(' ')[0]]["snow"] != -1 && value["snow"]["3h"] != undefined){
                    normalizedData[value["dt_txt"].split(' ')[0]]["snow"] = (normalizedData[value["dt_txt"].split(' ')[0]]["snow"] + value["snow"]["3h"]) / 2;
                }
                else if (value["snow"] != undefined && value["snow"]["3h"] != undefined){
                    normalizedData[value["dt_txt"].split(' ')[0]]["snow"] = value["snow"]["3h"];
                }
            }
            //first time reading this day
            else {
                normalizedData[value["dt_txt"].split(' ')[0]] = { "temperature": value["main"]["temp"] };
                
                if (value["rain"] != undefined && value["rain"]["3h"] != undefined) {
                    normalizedData[value["dt_txt"].split(' ')[0]]["rain"] = value["rain"]["3h"]
                }
                else { //no information on rain
                    normalizedData[value["dt_txt"].split(' ')[0]]["rain"] = -1;
                }
                if (value["snow"] != undefined && value["snow"]["3h"] != undefined) {
                    normalizedData[value["dt_txt"].split(' ')[0]]["snow"] = value["snow"]["3h"]
                }
                else { //no information on snow
                    normalizedData[value["dt_txt"].split(' ')[0]]["snow"] = -1;
                }
            }
        });

        console.log(normalizedData);
        return normalizedData;
    }

    function addWeatherSuggestions(weatherConditions) {
        var weatherList = $("#weatherSuggestions");
        var range30 = ["Hat", "Sunblock", "Sunglasses", "Shorts", "Lightweight Shirts"];
        var range20_29 = ["Shorts-Sleeved Shirts", "Shorts"];
        var range10_19 = ["Lightweight Jacket", "Long-Sleeved Shirts"];
        var range0_9 = ["Coat", "Long-Sleeved Shirts", "Sweater", "Knee-Length Socks"];
        var rangeN1 = ["Gloves", "Winter Jacket", "Scarf", "Beanie", "Coat", "Sweater", "Thermal Undershirt", "Knee-Length Socks", "Earmuffs", "Winter Boots"];
        var rainyDay = ["Umbrella", "Rain Shoes", "Waterproof Jacket"];
        var snowyDay = ["Snow Boots", "Gloves", "Scarf", "Winter Jacket"];

        var finalList = [];
        $.each(weatherConditions, function (key, value) {
            if (value["temperature"] < 0) {
                finalList = finalList.concat(rangeN1);
            }
            else if (value["temperature"] < 10) {
                finalList = finalList.concat(range0_9);
            }
            else if (value["temperature"] < 20) {
                finalList = finalList.concat(range10_19);
            }
            else if (value["temperature"] < 30) {
                finalList = finalList.concat(range20_29);
            }
            else {
                finalList = finalList.concat(range30);
            }

            if (value["rain"] > 0) {
                finalList = finalList.concat(rainyDay);
            }

            if (value["snow"] > 0) {
                finalList = finalList.concat(snowyDay);
            }
        });

        finalList = removeDuplicates(finalList);
        addSuggestedItemsToExpandedTrip(finalList);
    }

    function addSuggestedItemsToExpandedTrip(itemList) {
        var htmlTag = $("#weatherSuggestions");
        htmlTag.html("");
        $.each(itemList, function (key, value) {
            var newHtml = '<li class="mdl-list__item itemDetail"><i class="material-icons" style="padding-right: 10px;color:#4054B2">radio_button_checked</i><span><span class="mdl-list__item-primary-content itemSpan"><h6>' + value + '</h6></span></li></span>'
            htmlTag.append(newHtml);
            componentHandler.upgradeDom();
        });
    }

    function removeDuplicates(array) {
        var a = array.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }

        return a;
    }

    $("#closeTrip").on("click", function () {
        closeAddTrip();
        $('.mdl-tooltip.is-active').removeClass('is-active');
    });

    $(".closeTrip").on("click", function (event) {
        closeExpandedTrip();
    });

    $(".saveTrip").on("click", function (event) {
        updateCheckboxes();
        closeExpandedTrip();
    });

    function closeExpandedTrip() {
        $("#tripExpandedList").html(""); //resets the div
        $("#toDoSection").html(""); //resets the div
        $("#toBringSection").html(""); //resets the div
        $("#weatherSuggestions").html("");
        $("#tripExpanded").hide();
        $("#tripCards").show();
        $("#addTrip").show();
        $(".weatherSuggestionsTitle").hide();
    }

    function updateCheckboxes() {
        var jsonAux = [];

        $(".checklistItemTripExpanded").each(function () {
            var checkbox = $(this).attr('id')

            var arrAux = [];
            arrAux.push(checkbox.substring(2));

            if ($(this).is(":checked")) {
                arrAux.push(1);
            }
            else {
                arrAux.push(0);
            }

            jsonAux.push(arrAux);
        });

        var jsonData = {
            "action": "UPDATECHECKBOX",
            "tripId": $(".tripHeader").attr('id'),
            "items": jsonAux
        };

        $.ajax({
            url: "data/applicationLayer.php",
            type: "POST",
            data: jsonData,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function (jsonResponse) {
            },
            error: function (errorMessage) {
                alert(errorMessage);
            }
        });
    }

    function closeAddTrip() {
        $("#addTripWindow").hide();
        $("#addTrip").show();
        $("#tripCards").show();
        if ($("#tripCards").html() == "") {
            $("#emptyTList").show();
        }
        resetAddTrip();
    }

    function resetAddTrip() {
        $("#tripForm").html("");
    }

    function loadAllChecklists() {
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
            success: function (jsonResponse) {
                fillChecklistsSelectFields(jsonResponse);
            },
            error: function (errorMessage) {
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
            success: function (jsonResponse) {
                fillChecklistsSelectFields(jsonResponse);
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }

    function fillChecklistsSelectFields(checklists) {
        var toDoTag = $("#toDoOptions");
        var toBringTag = $("#toBringOptions")

        $.each(checklists, function (key, value) {
            if (value["checklistType"] == "ToDo") {
                toDoTag.append('<option value="' + value["id"] + '">' + value["checklistName"] + '</option>');
            }
            else {
                toBringTag.append('<option value="' + value["id"] + '">' + value["checklistName"] + '</option>');
            }
        });
    }

    function loadCountries() {
        $.ajax({
            url: "data/countries.php",
            type: "GET",
            dataType: "json",
            contentType: "application/x-www-form-urlencoded",
            success: function (jsonResponse) {
                $("#country").append(jsonResponse);
            },
            error: function (errorMessage) {
                alert(errorMessage);
            }
        });
    }

    function saveTrip() {
        var valid = true;
        var errorFeedback = "";

        //check for valid values
        if ($("#tripName").parent().hasClass("is-invalid") || $("#tripName").val() == "") {
			errorFeedback += "Enter a valid trip name. \n";
			valid = false;
        }
        if ($("#city").parent().hasClass("is-invalid") || $("#city").val() == "") {
			errorFeedback += "Enter a valid city. \n";
			valid = false;
        }
        if ($("#state").parent().hasClass("is-invalid")) {
			errorFeedback += "Enter a valid state. \n";
			valid = false;
        }
        if ($("#country").val() == "") {
			errorFeedback += "Enter a valid country. \n";
			valid = false;
        }
        if ($("#startDate").val() == "" || $("#startDate").parent().hasClass("is-invalid")) {
			errorFeedback += "Enter a valid start date. \n";
			valid = false;
        }
        if ($("#endDate").val() == "" || $("#startDate").parent().hasClass("is-invalid")) {
			errorFeedback += "Enter a valid end date. \n";
			valid = false;
        }

        if (valid) {
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
                success: function (jsonResponse) {
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
                error: function (errorMessage) {
                    alert(errorMessage);
                }
            });

            closeAddTrip();
        }
        else {
            alert("Please fix these mistakes: \n" + errorFeedback);
        }
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
            success: function (jsonResponse) {
                loadTripCards(jsonResponse);
            },
            error: function (errorMessage) {
                alert(errorMessage.responseText);
            }
        });
    }

    function loadTripCards(trips) {
        var htmlTag = $("#tripCards");
        $.each(trips, function (key, value) {
            addTripCardToDOM(value, htmlTag, true);
        });
        componentHandler.upgradeDom();
    }

    function addTripCardToDOM(value, htmlTag, append) {
        $("#emptyTList").hide();
        var card = '<div class="card" id="trip' + value["id"] + '" style="margin: 0 auto;"><div class="mdl-card-square mdl-card mdl-shadow--4dp"><div class="mdl-card__title mdl-card--expand"><h2 class="mdl-card__title-text title">' + value["tripName"] + '</h2></div><div class="mdl-card__supporting-text description">' + value["startDate"] + ' - ' + value["endDate"] + '</div><div class="mdl-card__actions mdl-card--border"><p class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect openTrip" id="trip' + value["id"] + '" onclick="openTripOnClick(' + value["id"] + ',\'' + value["tripName"] + '\',\'' + value["startDate"] + '\',\'' + value["endDate"] + '\')">View Trip</p></div><div class="mdl-card__menu"><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--white"><i class="material-icons">edit</i></button><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--white"><i class="material-icons">delete</i></button></div></div></div>';
        if (append) {
            htmlTag.append(card);
        }
        else {
            htmlTag.prepend(card);
        }
    }
});