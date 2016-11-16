<!DOCTYPE HTML>
<html>
<head>
    <title>Registration</title>
    <?php include 'includes/imports.php';?>
    <script src="js/registration.js"></script>
</head>

<body>
        <!-- Header -->
        <?php include 'includes/header.php';?>

        <!-- Content -->
        <main class="mdl-layout__content">
            <div class="mdl-grid">
                <div class="mdl-layout-spacer"></div>
                <div class="mdl-cell mdl-cell--4-col">
                    <form class="coloredBorder">
                        <h3>Register</h3>
                        <div  id="tf-fName" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="text" pattern="[A-Z, a-z, ]*" id="firstName">
                            <label class="mdl-textfield__label" for="firstName">First Name</label>
                            <span class="mdl-textfield__error">Letters and spaces only</span>
                        </div><br>

                        <div  id="tf-lName" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="text" pattern="[A-Z, a-z, ]*" id="lastName">
                            <label class="mdl-textfield__label" for="lastName">Last Name</label>
                            <span class="mdl-textfield__error">Letters and spaces only</span>
                        </div><br>

                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="text" pattern="[A-Z, a-z, 0-9, #, -, _]*" id="username">
                            <label class="mdl-textfield__label" for="username">Username</label>
                            <span class="mdl-textfield__error">Letters, numbers, '#', '-' and '_' only</span>

                        </div><br>

                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="password" pattern="[A-Z, a-z, 0-9, #, -, _]*" id="password">
                            <label class="mdl-textfield__label" for="password">Password</label>
                            <span class="mdl-textfield__error">Letters, numbers, '#', '-' and '_' only</span>
                        </div><br>

                        <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="password" pattern="[A-Z, a-z, 0-9, #, -, _]*" id="confirmPassword">
                            <label class="mdl-textfield__label" for="confirmPassword">Confirm password</label>
                            <span class="mdl-textfield__error">Letters, numbers, '#', '-' and '_' only</span>                            
                        </div><br>

                        <div  id="tf-email" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="email" id="email">
                            <label class="mdl-textfield__label" for="email">Email</label>
                            <span class="mdl-textfield__error">Please enter a valid email address</span>                                                        
                        </div><br>

                        <!-- Accent-colored raised button with ripple -->
                        <button type="button" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent regButton" id="registerButton">
                        Register
                        </button>
                    </form>
                </div>

                <div class="mdl-layout-spacer"></div>
            </div>
        
        <!-- Header -->
        <?php include 'includes/footer.php';?>
        </main>
</body>
</html>