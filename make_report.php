<?php

    session_start();

    $month = $_POST['month'];
    $year = $_POST['year'];
    $filename = $_POST['filename'];
    $databaseName = "bookings"; //$_SESSION["database"];
    $user = "julia"; //$_SESSION["username"];
    $password = "james76" //$_SESSION["password"];

    unlink($filename);

    shell_exec( 'java -jar java/writepdf/target/writepdf-0.0.1-SNAPSHOT-jar-with-dependencies.jar "'.addslashes($month).'" "'.addslashes($year).'" "'.addslashes($filename).'" "'.addslashes($databaseName).'" "'.addslashes($user).'" "'.addslashes($password).'" ' );

?>