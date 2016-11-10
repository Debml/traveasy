<!DOCTYPE HTML>
<html>
<head>
    <title>Home</title>
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

            <!-- Modal to add a new To-Do checklist -->
            <div class="mdl-dialog" id="toDoWindow">
                <h4 class="mdl-dialog__title">New To-Do List</h4>
                <div class="mdl-dialog__content">
                    <form id="activityList">
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input" type="text" id="chName">
                            <label class="mdl-textfield__label" for="chName">Name your checklist</label>
                        </div>
                    <!-- Activities are appended here -->
                    </form>
                </div>
                <div class="mdl-dialog__actions">
                    <button type="button" class="mdl-button" id="addActivity">Add new activity</button>
                    <button type="button" class="mdl-button" id="saveToDo">Save</button>
                </div>
            </div>
                
            <!-- Section where To-Do checklist cards are loaded-->
            <table>
                <tr id="to-DoChecklists">
                    <!-- To-Do Checklist cards are appended here -->
                </tr>
            </table>

            <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--floating-action" id="addToDo">
            <i class="material-icons">add</i>
            </button>
            </div>
        </section>
        <section class="mdl-layout__tab-panel" id="fixed-tab-2">
            <div class="page-content">
                
                <button class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--floating-action">
                <i class="material-icons">add</i>
                </button>
            </div>
        </section>
    </main>

    <!-- Footer -->
    <?php include 'includes/footer.php';?>
</body>
</html>