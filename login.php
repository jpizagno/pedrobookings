<?php
    session_start();

    $_SESSION["username"] = $_POST['username'];
    $_SESSION["password"] = $_POST['password'];
    $_SESSION["database"] = "bookings_test";

    /* Database connection information */
    $gaSql['user']       = $_SESSION["username"];
    $gaSql['password']   = $_SESSION["password"];
    $gaSql['db']         = $_SESSION["database"];
    $gaSql['server']     = "localhost";

    $conn=mysqli_connect($gaSql['server'], $gaSql['user'] ,$gaSql['password'],$gaSql['db']);
    $json_data = array('message' => 'login information not correct');
    if (!$conn) {
        error_log("\n failed to login:  user=".$gaSql['user'], 3, '/tmp/php.log');
        $_SESSION["username"] = '';
        $_SESSION["password"] = '';
    } else {
        $json_data = array('message' => 'ok');
    }

    echo json_encode($json_data);


?>
