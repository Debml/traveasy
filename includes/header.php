<?php
    echo'
    <!-- Always shows a header, even in smaller screens. -->
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header class="mdl-layout__header">
            <div class="mdl-layout__header-row">
                <!-- Title -->
                <span class="mdl-layout-title">Traveasy</span>
                <!-- Add spacer, to align navigation to the right -->
                <div class="mdl-layout-spacer"></div>
                <!-- Navigation. We hide it in small screens. -->
                <nav class="mdl-navigation mdl-layout--large-screen-only">
                    <a class="mdl-navigation__link" href="">Trips</a>
                    <a class="mdl-navigation__link" href="">Checklists</a>
                    <a class="mdl-navigation__link" href="">Contact</a>
                    <a class="mdl-navigation__link" href="registration.php">Sign Up</a>
                    <a class="mdl-navigation__link" href="login.php">Login</a>
                </nav>
            </div>
        </header>

        <!-- Drawer -->
        <div class="mdl-layout__drawer">
            <span class="mdl-layout-title">Traveasy</span>
            <nav class="mdl-navigation">
                <a class="mdl-navigation__link" href="">My Trips</a>
                <a class="mdl-navigation__link" href="">My Checklists</a>
                <a class="mdl-navigation__link" href="">Contact</a>
                <a class="mdl-navigation__link" href="registration.php">Sign Up</a>
                <a class="mdl-navigation__link" href="login.php">Login</a>
            </nav>
        </div>'
?>