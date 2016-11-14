<!DOCTYPE HTML>
<html>
<head>
    <title>Contact Us</title>
    <?php include 'includes/imports.php';?>
    <script type="text/javascript" src="js/contact.js"></script>
</head>

<body>

        <!-- Header -->
        <?php include 'includes/header.php';?>

        <!-- Content -->
        <main class="mdl-layout__content">
            <div class="mdl-grid">
                <div class="mdl-layout-spacer"></div>
                <div class="mdl-cell mdl-cell--4-col">
                    <form id="contact" class="coloredBorderMain" action="#">
                        <h3 id="form-title">Ask us anything!</h1>
                        <div id="tf-name" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="text" pattern="[A-Z, a-z, ]*" id="name">
                            <label class="mdl-textfield__label" for="name">Your name:</label>
                            <span class="mdl-textfield__error">Letters and spaces only.</span>
                        </div>
                        <div id="tf-email" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="text" id="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$">
                            <label class="mdl-textfield__label" for="email">Your email:</label>
                            <span class="mdl-textfield__error">Please enter a valid email address.</span> 
                        </div>
                        <div id="tf-subject" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <input class="mdl-textfield__input" type="text" id="subject">
                            <label class="mdl-textfield__label" for="subject">Your subject:</label>
                            <span class="mdl-textfield__error">Please enter a subject.</span> 
                        </div>
                        <div id="tf-message" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
                            <textarea class="mdl-textfield__input" type="text" rows= "6" id="message" ></textarea>
                            <label class="mdl-textfield__label" for="message">Your message:</label>
                            <span class="mdl-textfield__error">Please enter a message.</span> 
                        </div>
                        <button id="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
                            Send Email
                        </button>
                    </form>
                </div>
                <div class="mdl-layout-spacer"></div>
            </div>
            

        <!-- Footer -->
        <?php include 'includes/footer.php';?>
        </main>
</body>
</html>