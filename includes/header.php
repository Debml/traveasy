<?php
    echo '
    <!-- Always shows a header, even in smaller screens. -->
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--fixed-tabs">
        <header class="mdl-layout__header">
            <div class="mdl-layout__header-row">
                <!-- Title -->
                <span class="mdl-layout-title home">Traveasy</span>
                <!-- Add spacer, to align navigation to the right -->
                <div class="mdl-layout-spacer"></div>
                <!-- Navigation. We hide it in small screens. -->
                <nav class="mdl-navigation mdl-layout--large-screen-only">';

                session_start();
                if (isset($_SESSION["loggedUser"])) { 
                    echo'
                    <a class="mdl-navigation__link" href="checklists.php">My Checklists</a>
                    <a class="mdl-navigation__link" href="trips.php">My Trips</a>
                    <a class="mdl-navigation__link" href="about.php">About Us</a>
                    <a class="mdl-navigation__link" href="contact.php">Contact Us</a>
                    <p class="mdl-navigation__link" id="username">' . $_SESSION["loggedUser"] . '</p>
                    <!-- Large Tooltip -->
                    <div id="ttLogout" class="icon material-icons logoutIcon">exit_to_app</div>
                    <div class="mdl-tooltip mdl-tooltip--large" for="ttLogout">
                    Logout
                    </div>';
                }
                else {
                    echo'
                    <a class="mdl-navigation__link" href="about.php">About Us</a>
                    <a class="mdl-navigation__link" href="contact.php">Contact Us</a>
                    <a class="mdl-navigation__link" href="registration.php">Sign Up</a>
                    <a class="mdl-navigation__link" href="login.php">Login</a>';
                }
                echo'
                </nav>
            </div>';

            if (basename($_SERVER['PHP_SELF']) == "checklists.php"){
                echo'
                <!-- Tabs -->
                <div class="mdl-layout__tab-bar mdl-js-ripple-effect">
                <a href="#fixed-tab-1" class="mdl-layout__tab is-active">To-do checklists</a>
                <a href="#fixed-tab-2" class="mdl-layout__tab">Item checklists</a>
                </div>';
            }

        echo'
        </header>
        <!-- Drawer -->
        <div class="mdl-layout__drawer">
            <span class="mdl-layout-title">Traveasy</span>
            <nav class="mdl-navigation">';

            if (isset($_SESSION["loggedUser"])) { 
                echo'
                <a class="mdl-navigation__link" href="checklists.php">My Checklists</a>
                <a class="mdl-navigation__link" href="trips.php">My Trips</a>
                <a class="mdl-navigation__link" href="about.php">About Us</a>
                <a class="mdl-navigation__link" href="contact.php">Contact Us</a>';
            }
            else {
                echo'
                <a class="mdl-navigation__link" href="about.php">About Us</a>
                <a class="mdl-navigation__link" href="contact.php">Contact Us</a>
                <a class="mdl-navigation__link" href="registration.php">Sign Up</a>
                <a class="mdl-navigation__link" href="login.php">Login</a>';
                }
            echo'
            </nav>
        </div>';
?>