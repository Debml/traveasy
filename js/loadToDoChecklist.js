/*This javascript is necessary since MDL is not upgrading the Card components when dynamically adding one, we have
to add the cards BEFORE the page finishes loading (before MDL automatically upgrades elements)*/
loadToDo();

function loadToDo() {
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

function loadToDoCards(toDoChecklists) {
    console.log("loading1");
    $.each(toDoChecklists, function (key, value) {
        var card = '<td><div class="card" id="tdc' + value["id"] + '"><div class="mdl-card-square mdl-card mdl-shadow--4dp"><div class="mdl-card__title mdl-card--expand"><h2 class="mdl-card__title-text title">' + value["checklistName"] + '</h2></div><div class="mdl-card__supporting-text description">' + value["checklistDescription"] + '</div><div class="mdl-card__actions mdl-card--border"><p class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect openToDoChecklist" id="tdco' + value["id"] + '" onclick="openToDoOnClick(' + value["id"] + ',\'' + value["checklistName"] + '\',\'' + value["checklistDescription"] + '\')">Open Checklist</p></div><div class="mdl-card__menu"><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--white"><i class="material-icons">edit</i></button><button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect mdl-button--white"><i class="material-icons">delete</i></button></div></div></div></td>';
        $("#toDoChecklists").append(card);
    });
    componentHandler.upgradeDom();
}