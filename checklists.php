<!DOCTYPE HTML>
<html>
<head>
    <title>My Checklists</title>
    <?php include 'includes/imports.php';?>
    <script src="js/global.js"></script>
    <script src="js/checklists.js"></script>
</head>

<body>
    <!-- Header -->
    <?php include 'includes/header.php';?>

    <!-- Content -->
    <main class="mdl-layout__content">
        <section class="mdl-layout__tab-panel is-active" id="fixed-tab-1">
            <div class="page-content">

            <!-- Section where To-Do checklist cards are loaded -->
            <table>
                <tr id="toDoChecklists">
                    <!-- To-Do Checklist cards are appended here -->
                </tr>
            </table>

            <!-- Necessary to load Cards here (before whole DOM is loaded) for card actions to work
            <script src="js/loadToDoChecklist.js"></script>-->

            <!-- Modal to add a new To-Do checklist -->
            <div class="mdl-dialog" id="toDoWindow">
                <h4 class="mdl-dialog__title">New To-Do List</h4>
                <div class="mdl-dialog__content">
                    
                    <form id="activityList">                    
                    <!-- Activities are appended here -->
                    </form>
                </div>
                <div class="mdl-dialog__actions">
                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="saveToDo">
                    <i class="material-icons">done</i>
                    <div class="mdl-tooltip" data-mdl-for="saveToDo">Save checklist</div>
                    </button>

                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="addActivity">
                    <i class="material-icons">add</i>
                    <div class="mdl-tooltip" data-mdl-for="addActivity">Add activity</div>
                    </button>                    

                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="closeToDo">
                    <i class="material-icons">clear</i>
                    <div class="mdl-tooltip" data-mdl-for="closeToDo">Discard checklist</div>
                    </button>
                </div>
            </div>

            <!-- Modal to load a To-Do checklist -->
            <div class="mdl-dialog" id="toDoExpanded">
                <div class="mdl-dialog__content">
                    <ul class='mdl-list' id="toDoExpandedList">
                        <!-- Activities are appended here -->
                    </ul>
                </div>
                <div class="mdl-dialog__actions">
                    <button type="button" class="mdl-button closeToDoChecklist">Close</button>
                </div>                
            </div>

            <!-- Button to add a new checklist -->
            <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--floating-action" id="addToDo">
            <i class="material-icons">add</i>
            </button>
            </div>
        </section>

        <section class="mdl-layout__tab-panel" id="fixed-tab-2">
            <div class="page-content">

                <!-- Section where To-Bring checklist cards are loaded -->
                <table>
                    <tr id="toBringChecklists">
                        <!-- To-Bring Checklist cards are appended here -->
                    </tr>
                </table>

                <!-- Necessary to load Cards here (before whole DOM is loaded) for card actions to work
                <script src="js/loadToBringChecklist.js"></script>-->                    
                
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--floating-action" id="addToBring">
                <i class="material-icons">add</i>
                </button>
            </div>

            <!-- Modal to add a new To-Bring checklist -->
            <div class="mdl-dialog" id="toBringWindow">
                <h4 class="mdl-dialog__title">New Item List</h4>
                <div class="mdl-dialog__content">
                    <form id="itemList">                    
                        <!-- Items are appended here -->
                    </form>
                </div>
                <div class="mdl-dialog__actions">
                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="saveToBring">
                    <i class="material-icons">done</i>
                    <div class="mdl-tooltip" data-mdl-for="saveToBring">Save checklist</div>
                    </button>

                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="addItem">
                    <i class="material-icons">add</i>
                    <div class="mdl-tooltip" data-mdl-for="addActivity">Add item</div>
                    </button>                    

                    <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" id="closeToBring">
                    <i class="material-icons">clear</i>
                    <div class="mdl-tooltip" data-mdl-for="closeToDo">Discard checklist</div>
                    </button>
                </div>
            </div>

            <!-- Modal to load a To-Bring checklist -->
            <div class="mdl-dialog" id="toBringExpanded">
                <div class="mdl-dialog__content">
                    <ul class='mdl-list' id="toBringExpandedList">
                        <!-- Activities are appended here -->
                    </ul>
                </div>
                <div class="mdl-dialog__actions">
                    <button type="button" class="mdl-button closeToBringChecklist">Close</button>
                </div>                
            </div>            
        </section>
    </main>

    <!-- Footer -->
    <?php include 'includes/footer.php';?>
</body>
</html>