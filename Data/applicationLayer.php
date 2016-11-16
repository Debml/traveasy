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
        case "LOADCHECKLISTS":
            loadChecklists();
            break;
        case "LOADALLCHECKLISTS":
            loadAllChecklists();
            break;
        case "LOADITEMS":
            loadItems();
            break;
        case "CREATESESSION":
            createSession();
            break;
        case "SAVETRIP":
            saveTrip();
            break;
        case "LOADTRIPS":
            loadTrips();
            break;
        case "LOADEXPANDEDTRIP":
            loadExpandedTrip();
            break;
        case "UPDATECHECKBOX":
            updateCheckedItems();
            break;
        case "GETWEATHER":
            getWeather();
            break;
    }

    function login() {
        $userName = $_POST["username"];
        $result = attemptLogin($userName);
        
        if ($result["status"] == "SUCCESS") {
            $userPassword = $_POST["password"];

            if (decryptPassword($result["password"]) == $userPassword){
                //Starts the current browser session
                createSession($userName);
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

    function createSession($userName){
        session_start();
        $_SESSION["loggedUser"] = $userName;
        echo json_encode(array("message" => "Login Successful!"));
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
            createSession($userName);
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
            echo json_encode($result);
        }
        else {
            header('HTTP/1.1 500'  . $result["status"]);
            die($result["status"]);
        }
    }

    function loadChecklists(){
        $checklistType = $_POST["checklistType"];
        $username = $_POST["username"];

        $result = attemptLoadChecklists($username, $checklistType);

        if ($result["status"] != "Error: Error connecting to the database"){
            echo json_encode($result);
        }
        else {
            header('HTTP/1.1 500'  . $result["status"]);
            die($result["status"]);
        }
    }

    function loadAllChecklists(){
        $username = $_POST["username"];

        $result = attemptLoadAllChecklists($username);

        if ($result["status"] != "Error: Error connecting to the database"){
            echo json_encode($result);
        }
        else {
            header('HTTP/1.1 500'  . $result["status"]);
            die($result["status"]);
        }
    }

    function loadItems(){
        $checklistId = $_POST["checklistId"];

        $result = attemptLoadItems($checklistId);

        if ($result["status"] != "Error: Error connecting to the database"){
            echo json_encode($result);
        }
        else {
            header('HTTP/1.1 500'  . $result["status"]);
            die($result["status"]);
        }
    }

    function saveTrip(){
        $username = $_POST["username"];
        $tripName = $_POST["tripName"];
        $city = $_POST["city"];
        $state = $_POST["state"]; 
        $country = $_POST["country"];
        $startDate = $_POST["startDate"];
        $endDate = $_POST["endDate"];
        $toDoList = $_POST["toDoList"];
        $toBringList = $_POST["toBringList"];  

        $result = attemptSaveTrip($username, $tripName, $city, $state, $country, $startDate, $endDate, $toDoList, $toBringList);

        if ($result["status"] == "SUCCESS"){
            echo json_encode($result);
        }
        else {
            header('HTTP/1.1 500'  . $result["status"]);
            die($result["status"]);
        }
    }

    function loadTrips(){
        $username = $_POST["username"];

        $result = attemptLoadTrips($username);

        if ($result["status"] != "Error: Error connecting to the database"){
            echo json_encode($result);
        }
        else {
            header('HTTP/1.1 500'  . $result["status"]);
            die($result["status"]);
        }
    }

    function loadExpandedTrip(){
        $tripId = $_POST["tripId"];

        $result = attemptLoadExpandedTrip($tripId);

        if ($result["status"] != "Error: Error connecting to the database"){
            echo json_encode($result);
        }
        else {
            header('HTTP/1.1 500'  . $result["status"]);
            die($result["status"]);
        }
    }

    function updateCheckedItems(){
        $tripId = $_POST["tripId"];
        $itemList = $_POST["items"];

        $result = attemptUpdateCheckedItems($tripId, $itemList);

        if ($result["status"] == "SUCCESS"){
            echo json_encode($result);
        }
        else {
            header('HTTP/1.1 500'  . $result["status"]);
            die($result["status"]);
        }
    }

    function getWeather(){
        $city = $_POST["city"];
        $country = $_POST["country"];
        $url = 'http://api.openweathermap.org/data/2.5/forecast?q=' . $city . ',' . $country . '&APPID=7357ef3e78c452abc9f0e009b17cba2a';
        $json = file_get_contents($url);
        echo json_encode($data);
    }
?>