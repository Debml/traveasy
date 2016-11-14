<!DOCTYPE HTML>
<html>
<head>
    <title>Trips</title>
    <?php include 'includes/imports.php';?>
    <script src="js/trips.js"></script>
    <script rel="stylesheet" src="js/mdl-selectfield.min.js"></script>
    <link rel="stylesheet" href="css/mdl-selectfield.min.css">
</head>

<body>
        <!-- Header -->
        <?php include 'includes/header.php';?>

        <!-- Content -->
        <main class="mdl-layout__content">

            <!-- Section where trip cards are loaded -->
            <table>
                <tr id="tripCards">
                    <!-- trip cards are appended here -->
                </tr>
            </table>

            <!-- Modal to add a new Trip checklist -->
            <div class="mdl-dialog" id="addTripWindow">
                <h4 class="mdl-dialog__title">New trip</h4>
                <div class="mdl-dialog__content">
                    <form  id="tripForm" action="#" class="mdl-grid">
                    </form>
                </div>
                <div class="mdl-dialog__actions">
                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="saveTrip">
                    <i class="material-icons">done</i>
                    <div class="mdl-tooltip" data-mdl-for="saveTrip">Save trip</div>
                    </button>
                
                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="closeTrip">
                    <i class="material-icons">clear</i>
                    <div class="mdl-tooltip" data-mdl-for="closeTrip">Discard trip</div>
                    </button>
                </div>
            </div>


            <!-- Modal to load a Trip -->
            <div class="mdl-dialog" id="tripExpanded">
                <div class="mdl-dialog__content">
                    <ul class='mdl-list' id="tripExpandedList">
                        <!-- Trip info is appended here -->
                    </ul>
                    <h4 style="text-align: center;">To-Do Checklist</h4>
                    <ul id="toDoSection">
                    </ul>

                    <h4 style="text-align: center;">Item Checklist</h4>
                    <ul id="toBringSection">
                    </ul>
                </div>
                <div class="mdl-dialog__actions">
                    <button type="button" class="mdl-button closeTrip">Close</button>
                    <button type="button" class="mdl-button closeTrip">Save</button>
                    <button type="button" class="mdl-button closeTrip" id="suggestionsButton">Load Suggestions</button>
                </div>                
            </div>

            <!-- Button to add a new trip -->
            <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--floating-action" id="addTrip">
            <i class="material-icons">add</i>
            </button>

            <div class="mdl-layout-spacer"></div>
            <!-- Footer -->
            <?php include 'includes/footer.php';?>
        </main>
</body>
</html>