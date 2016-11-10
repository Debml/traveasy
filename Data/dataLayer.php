<?php
	header('Accept: application/json');
	header('Content-type: application/json');
    require_once __DIR__ . "/dbLocal.php";

    function attemptLogin($userName){
        $conn = connectionToDataBase();

        if ($conn != null){
            $sql = "SELECT * FROM Users WHERE username = '$userName'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $response = array("status" => "SUCCESS", "password" => $row['passwrd']);
                }

                $conn -> close();
                return $response;
            }
            else{
                $conn -> close();
                return array("status" => "Error: Username or password is incorrect");
            }
        }
        else {
            $conn -> close();
            return array("status" => "Error: Error connecting to the database");
        }                
    }

    function attemptRegistration($userName, $userPassword, $firstName, $lastName, $email){
        $conn = connectionToDataBase();

        if ($conn != null){
		    $sql = "SELECT fName, lName FROM Users WHERE username = '$userName' OR email = '$email'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $conn -> close();
                return array("status" => "Error: Username or email is already registered");
            }
            else{
                $sql = "INSERT INTO Users(fName, lName, username, passwrd, email) VALUES ('$firstName', '$lastName', '$userName', '$userPassword', '$email');";
                if (mysqli_query($conn, $sql)){
                    $conn -> close();
                    return array("status" => "SUCCESS");
                }
                else{
                    $conn -> close();
                    return array("status" => "Error: Error registering username");
                }
            }
        }
        else {
            $conn -> close();
            return array("status" => "Error: Error connecting to the database");
        }                
    }

    function attemptRegisterChecklist($checklistType, $checklistDescription, $checklistName, $activityItems, $username){
        $conn = connectionToDataBase();

        if ($conn != null){
            $sql = "INSERT INTO Checklists(checklistName, checklistDescription, checklistType, id) VALUES('$checklistName', '$checklistDescription', '$checklistType', 0);";
            
            if (mysqli_query($conn, $sql)){
                $checklistId = $conn->insert_id;

                $sql = "INSERT INTO UserHasChecklists(username, checklistId, id) VALUES('$username', '$checklistId', 0);";
                
                if (mysqli_query($conn, $sql)) {
                    foreach ($activityItems as &$item) {
                        $itemName = $item["name"];
                        $quantity = $item["quantity"];
                        $notes = $item["notes"];
                        $sql = "INSERT INTO Items(itemName, quantity, notes, id) VALUES('$itemName', '$quantity', '$notes', 0);";

                        if (mysqli_query($conn, $sql)) {
                            $itemId = $conn->insert_id;

                            $sql = "INSERT INTO ChecklistHasItems(checklistId, itemId, id) VALUES($checklistId, $itemId, 0);";

                            if (!mysqli_query($conn, $sql)) {
                                $conn -> close();
                                return array("status" => "Error: Error saving checklist");
                            }
                        }
                        else {
                            $conn -> close();
                            return array("status" => "Error: Error saving checklist"); 
                        }
                    }                    
                }
                else {
                    $conn -> close();
                    return array("status" => "Error: Error saving checklist"); 
                }
            }
            else {
                $conn -> close();
                return array("status" => "Error: Error saving checklist");
            }
        }
        else {
            $conn -> close();
            return array("status" => "Error: Error connecting to the database");
        }   
    }
?>