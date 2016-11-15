<?php
	header('Accept: application/json');
	header('Content-type: application/json');
    require_once __DIR__ . "/dbLocal.php";

    function attemptLogin($username){
        $conn = connectionToDataBase();

        if ($conn != null){
            $sql = "SELECT * FROM Users WHERE username = '$username'";
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
                return array("status" => "Error: username or password is incorrect");
            }
        }
        else {
            $conn -> close();
            return array("status" => "Error: Error connecting to the database");
        }                
    }

    function attemptRegistration($username, $userPassword, $firstName, $lastName, $email){
        $conn = connectionToDataBase();

        if ($conn != null){
		    $sql = "SELECT fName, lName FROM Users WHERE username = '$username' OR email = '$email'";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $conn -> close();
                return array("status" => "Error: username or email is already registered");
            }
            else{
                $sql = "INSERT INTO Users(fName, lName, username, passwrd, email) VALUES ('$firstName', '$lastName', '$username', '$userPassword', '$email');";
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

        $conn -> close();
        return array("status" => "SUCCESS", "checklistId" => $checklistId);  
    }

    function attemptLoadChecklists($username, $checklistType){
        $conn = connectionToDataBase();

        if ($conn != null){
		    $sql = "SELECT ch.* FROM Checklists as ch, UserHasChecklists as uCh WHERE uCh.username = '$username' AND uCh.checklistId = ch.id AND ch.checklistType = '$checklistType' ORDER BY ch.id DESC";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $response = new ArrayObject();
                while ($row = $result->fetch_assoc()) {
                    $response->append(array("checklistName"=>$row["checklistName"], "checklistDescription"=>$row["checklistDescription"], 
                    "checklistType"=>$row["checklistType"], "id"=>$row["id"]));
                }
            }

            $conn -> close();
            return $response;
        }
        else {
            $conn -> close();
            return array("status" => "Error: Error connecting to the database");
        }    
    }

    function attemptLoadAllChecklists($username){
        $conn = connectionToDataBase();

        if ($conn != null){
		    $sql = "SELECT ch.* FROM Checklists as ch, UserHasChecklists as uCh WHERE uCh.username = '$username' AND uCh.checklistId = ch.id ORDER BY ch.id DESC";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $response = new ArrayObject();
                while ($row = $result->fetch_assoc()) {
                    $response->append(array("checklistName"=>$row["checklistName"], "checklistDescription"=>$row["checklistDescription"], 
                    "checklistType"=>$row["checklistType"], "id"=>$row["id"]));
                }
            }

            $conn -> close();
            return $response;
        }
        else {
            $conn -> close();
            return array("status" => "Error: Error connecting to the database");
        }    
    }

    function attemptLoadItems($checklistId){
        $conn = connectionToDataBase();

        if ($conn != null){
		    $sql = "SELECT it.* FROM ChecklistHasItems as chI, Items as it WHERE chI.checklistId = '$checklistId' AND it.id = chI.itemId ORDER BY chI.itemId DESC";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $response = new ArrayObject();
                while ($row = $result->fetch_assoc()) {
                    $response->append(array("itemName"=>$row["itemName"], "quantity"=>$row["quantity"], 
                    "notes"=>$row["notes"], "id"=>$row["id"]));
                }
            }

            $conn -> close();
            return $response;
        }
        else {
            $conn -> close();
            return array("status" => "Error: Error connecting to the database");
        }    
    }

    function attemptSaveTrip($username, $tripName, $city, $state, $country, $startDate, $endDate, $toDoList, $toBringList){
        $conn = connectionToDataBase();

        if ($conn != null){
		    $sql = "INSERT INTO Trips(city, state, country, tripName, startDate, endDate, id) VALUES('$city', '$state', '$country', '$tripName', STR_TO_DATE('$startDate','%m/%d/%Y'), STR_TO_DATE('$endDate','%m/%d/%Y'), 0);";

            if (mysqli_query($conn, $sql)){
                $tripId = $conn->insert_id;

                $sql = "INSERT INTO UserHasTrips(username, tripId, id) VALUES('$username', '$tripId', 0);";

                if (mysqli_query($conn, $sql)){
                    $sql = "INSERT INTO TripUsesChecklists(tripId, checklistId, id) VALUES('$tripId', '$toDoList', 0), ('$tripId', '$toBringList', 0);";

                    if (mysqli_query($conn, $sql)){
                        $sql = "SELECT it.id FROM Items as it, ChecklistHasItems as chIt WHERE chIt.checklistId = '$toDoList' AND chIt.itemId = it.id";
                        $result = $conn->query($sql);

                        if ($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                $itemId = $row["id"];

                                $sqlAux = "INSERT INTO TripHasItems(tripId, itemId, checked, id) VALUES('$tripId', '$itemId', 0, 0);";

                                if(!mysqli_query($conn, $sqlAux)){
                                    $conn -> close();
                                    return array("status" => "Error: Error saving trip");
                                }
                            }
                        }

                        $sql = "SELECT it.id FROM Items as it, ChecklistHasItems as chIt WHERE chIt.checklistId = '$toBringList' AND chIt.itemId = it.id";
                        $result = $conn->query($sql);

                        if ($result->num_rows > 0) {
                            while ($row = $result->fetch_assoc()) {
                                $itemId = $row["id"];

                                $sqlAux = "INSERT INTO TripHasItems(tripId, itemId, checked, id) VALUES('$tripId', '$itemId', 0, 0);";

                                if(!mysqli_query($conn, $sqlAux)){
                                    $conn -> close();
                                    return array("status" => "Error: Error saving trip");
                                }
                            }
                        }
                    }
                    else{
                        $conn -> close();
                        return array("status" => "Error: Error saving trip");
                    }
                }
                else{
                    $conn -> close();
                    return array("status" => "Error: Error saving trip");
                }
            }
            else{
                $conn -> close();
                return array("status" => "Error: Error saving trip");
            }
        }
        else {
            $conn -> close();
            return array("status" => "Error: Error connecting to the database");
        }
        $conn -> close();
        return array("status" => "SUCCESS", "tripId" => $tripId);              
    }

    function attemptLoadTrips($username){
        $conn = connectionToDataBase();

        if ($conn != null){
		    $sql = "SELECT tr.*, DATE_FORMAT(tr.startDate,'%M %e, %Y') AS niceSDate, DATE_FORMAT(tr.endDate,'%M %e, %Y') AS niceEDate FROM Trips as tr, UserHasTrips as uTr WHERE uTr.username = '$username' AND uTr.tripId = tr.id ORDER BY tr.startDate DESC";

            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $response = new ArrayObject();
                while ($row = $result->fetch_assoc()) {
                    $response->append(array("city"=>$row["city"], "state"=>$row["state"], 
                    "country"=>$row["country"], "tripName"=>$row["tripName"], "startDate"=>$row["niceSDate"], "endDate"=>$row["niceEDate"], "id"=>$row["id"]));
                }
            }

            $conn -> close();
            return $response;
        }
        else {
            $conn -> close();
            return array("status" => "Error: Error connecting to the database");
        }    
    }

    function attemptLoadExpandedTrip($tripId){
        $conn = connectionToDataBase();

        if ($conn != null){
            $sql = "SELECT * FROM Trips as tr JOIN TripUsesChecklists as trCh ON (tr.id = trCh.tripId) LEFT JOIN Checklists as ch ON (trCh.checklistId = ch.id) LEFT JOIN ChecklistHasItems as chI ON (ch.id = chI.checklistId) LEFT JOIN Items as it ON (chI.itemId = it.id) LEFT JOIN TripHasItems as trI ON(it.id = trI.itemId AND tr.id = trI.tripId) WHERE tr.id = '$tripId';";
            $result = $conn->query($sql);

            if ($result->num_rows > 0) {
                $response = new ArrayObject();
                while ($row = $result->fetch_assoc()) {
                    $response->append(array("city"=>$row["city"], "state"=>$row["state"], 
                    "country"=>$row["country"], "checklistName"=>$row["checklistName"], "checklistDescription"=>$row["checklistDescription"], "checklistType"=>$row["checklistType"], "itemName"=>$row["itemName"], "itemNotes"=>$row["notes"], "checked"=>$row["checked"], "itemId"=>$row["itemId"]));
                }
                return $response;
            }
            else {
                $conn -> close();
                return array("status" => "Error: Error connecting to the database");
            }
        }
        else {
            $conn -> close();
            return array("status" => "Error: Error connecting to the database");
        }
    }

    function attemptUpdateCheckedItems($tripId, $itemList){
        $conn = connectionToDataBase();

        if ($conn != null){
            foreach ($itemList as &$item) {
                $itemId = $item[0];
                $checked = $item[1];
                
                $sql = "UPDATE TripHasItems SET checked = '$checked' WHERE tripId = '$tripId' AND itemId = '$itemId';";

                if(!mysqli_query($conn, $sql)){
                    $conn -> close();
                    return array("status" => "Error: Error updating database");
                }
            }

            $conn -> close();
            return array("status" => "SUCCESS");   
        }
        else {
            $conn -> close();
            return array("status" => "Error: Error connecting to the database");
        }                
    }
?>