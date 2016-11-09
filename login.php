<!DOCTYPE HTML>
<html>
<head>
    <title>Login</title>
    <!--<script src="js/jquery.js" type="text/javascript"></script>-->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.2.1/material.indigo-red.min.css">
    <script defer src="https://code.getmdl.io/1.2.1/material.min.js"></script>
</head>

<body>
        <!-- Header -->
        <?php include 'includes/header.php';?>

        <!-- Content -->
        <main class="mdl-layout__content">
            <div class="mdl-grid">
                <div class="mdl-layout-spacer"></div>
                <div class="mdl-cell mdl-cell--4-col">
                    <form>
                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="text" id="username">
                            <label class="mdl-textfield__label" for="username">Username</label>
                        </div><br>

                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="password" id="password">
                            <label class="mdl-textfield__label" for="password">Password</label>
                        </div><br>

                        <!-- Accent-colored raised button with ripple -->
                        <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
                        Login
                        </button>
                    </form>
                </div>
                <div class="mdl-layout-spacer"></div>
            </div>
        </main>

        <!-- Header -->
        <?php include 'includes/footer.php';?>

    </div>
</body>
</html>