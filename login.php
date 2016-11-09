<!DOCTYPE HTML>
<html>
<head>
    <title>Login</title>
    <?php include 'includes/imports.php';?>
    <script src="js/login.js"></script>
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
                        <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent" id="loginButton">
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