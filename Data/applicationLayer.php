<?php
    header('Content-type: application/json');
    require_once __DIR__ . "/dataLayer.php";

    $action = $_POST["action"];

    switch($action){
        case "LOGIN" : 
            login();
            break;
        case "REGISTER" :
            registerUser();
            break;
        case "LOGOUT":
            logout();
            break;
        case "SAVECHECKLIST":
            saveChecklist();
            break;
        case "LOADCHECKLIST":
            loadChecklist();
            break;
    }

    function login() {
        $userName = $_POST["username"];
        $result = attemptLogin($userName);
        
        if ($result["status"] == "SUCCESS") {
            $userPassword = $_POST["password"];

            if (decryptPassword($result["password"]) == $userPassword){
                //Starts the current browser session
                session_start();
                $_SESSION["loggedUser"] = $userName;

                echo json_encode(array("message" => "Login Successful!"));
            }
            else{
                header('HTTP/1.1 500'  . "Error: Password is incorrect");
                die("Error: Password is incorrect");
            }
        }
        else {
            header('HTTP/1.1 500'  . "Error: Username not found");
            die("Error: Username not found");
        }
    }

    function logout() {
        session_start() ;
        session_destroy();
        echo json_encode(array("message" => "Logout Successful!"));
    }

    function registerUser() {
        $userName = $_POST["username"];
        $firstName = $_POST["firstName"];
        $lastName = $_POST["lastName"];
        $userPassword = encryptPassword($_POST["password"]);
        $email = $_POST["email"];

        $result = attemptRegistration($userName, $userPassword, $firstName, $lastName, $email);

        if ($result["status"] == "SUCCESS"){
            echo json_encode(array("message" => "Registration Successful!"));
        }
        else {
            header('HTTP/1.1 500'  . $result["status"]);
            die($result["status"]);
        }
    }

    function encryptPassword($userPassword) {
        $key = pack('H*', "526108b194bec74adb27da6ddc05adfa659ad82cf6ccb86b4d3652aab690feac");

        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);
        $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
        
        $ciphertext = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, $key, $userPassword, MCRYPT_MODE_CBC, $iv);
        $ciphertext = $iv . $ciphertext;
        
        $userPassword = base64_encode($ciphertext);

        return $userPassword;
    }

    function decryptPassword($userPassword) {
        $key = pack('H*', "526108b194bec74adb27da6ddc05adfa659ad82cf6ccb86b4d3652aab690feac");

        $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_128, MCRYPT_MODE_CBC);

        $ciphertext_dec = base64_decode($userPassword);
        $iv_dec = substr($ciphertext_dec, 0, $iv_size);
        $ciphertext_dec = substr($ciphertext_dec, $iv_size);

        $userPassword = mcrypt_decrypt(MCRYPT_RIJNDAEL_128, $key, $ciphertext_dec, MCRYPT_MODE_CBC, $iv_dec);
            
            $count = 0;
            $length = strlen($userPassword);

        for ($i = $length - 1; $i >= 0; $i --) {
            if (ord($userPassword{$i}) === 0) {
                $count ++;
            }
        }

        $userPassword = substr($userPassword, 0,  $length - $count); 

        return $userPassword;
    }

    function saveChecklist(){
        $checklistType = $_POST["checklistType"];
        $checklistDescription = $_POST["checklistDescription"];
        $checklistName = $_POST["checklistName"];
        $activityItems = $_POST["activityItems"];
        $username = $_POST["username"];

        $result = attemptRegisterChecklist($checklistType, $checklistDescription, $checklistName, $activityItems, $username);

        if ($result["status"] == "SUCCESS"){
            echo json_encode(array("message" => "Registration Successful!"));
        }
        else {
            header('HTTP/1.1 500'  . $result["status"]);
            die($result["status"]);
        }
    }

    function loadChecklist(){
        $checklistType = $_POST["checklistType"];
        $username = $_POST["username"];

        $result = attemptLoadChecklist($username, $checklistType);

        if ($result["status"] != "Error: Error connecting to the database"){
            echo json_encode($result);
        }
        else {
            header('HTTP/1.1 500'  . $result["status"]);
            die($result["status"]);
        }
    }
?>