<?php
    echo '
    <!-- Always shows a header, even in smaller screens. -->
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header class="mdl-layout__header">
            <div class="mdl-layout__header-row">
                <!-- Title -->
                <span class="mdl-layout-title">Traveasy</span>
                <!-- Add spacer, to align navigation to the right -->
                <div class="mdl-layout-spacer"></div>
                <!-- Navigation. We hide it in small screens. -->
                <nav class="mdl-navigation mdl-layout--large-screen-only">';

                session_start();
                if (isset($_SESSION["loggedUser"])) { 
                    echo'
                    <a class="mdl-navigation__link" href="">Trips</a>
                    <a class="mdl-navigation__link" href="">Checklists</a>
                    <a class="mdl-navigation__link" href="">Contact</a>
                    <p class="mdl-navigation__link">' . $_SESSION["loggedUser"] . '</p>
                    <!-- Large Tooltip -->
                    <div id="ttLogout" class="icon material-icons">cancel</div>
                    <div class="mdl-tooltip mdl-tooltip--large" for="ttLogout">
                    Logout
                    </div>';
                }
                else {
                    echo'
                    <a class="mdl-navigation__link" href="registration.php">Sign Up</a>
                    <a class="mdl-navigation__link" href="login.php">Login</a>';
                }
                echo'
                </nav>
            </div>
        </header>';

        echo'
        <!-- Drawer -->
        <div class="mdl-layout__drawer">
            <span class="mdl-layout-title">Traveasy</span>
            <nav class="mdl-navigation">';

            if (isset($_SESSION["loggedUser"])) { 
                echo'
                <a class="mdl-navigation__link" href="">Trips</a>
                <a class="mdl-navigation__link" href="">Checklists</a>
                <a class="mdl-navigation__link" href="">Contact</a>';
            }
            else {
                echo'
                <a class="mdl-navigation__link" href="registration.php">Sign Up</a>
                <a class="mdl-navigation__link" href="login.php">Login</a>';
                }
            echo'
            </nav>
        </div>';
?>