<?php
session_start();     

    /* Database connection information */
    $gaSql['user']       = $_SESSION["username"];
    $gaSql['password']   = $_SESSION["password"];
    $gaSql['db']         = $_SESSION["database"];
    $gaSql['server']     = "localhost";

    $mysqli = new mysqli ( $gaSql['server'], $gaSql['user'],  $gaSql['password'] , $gaSql['db'], 3306 );

    $number = mysqli_real_escape_string ( $mysqli,$_POST['booking_number']);
    $storno = $_POST['storno'];
    $kreuzfahrt = $_POST['kreuzfahrt'];

    if ($mysqli->connect_errno) {
        printf ( "Connect failed: %s\n", $mysqli->connect_error );
        exit ();
    } else {
        printf ( "cONN Sucees" );
         if ($mysqli->query (sprintf ( "UPDATE booking SET storno='%s' WHERE booking_number ='%s' AND kreuzfahrt='%s' ",$storno, $number, $kreuzfahrt  ) )) {
            printf ( "Affected Rows  %d rows.\n", $mysqli->affected_rows );
        } else {
            echo "Error updating record: " . $mysqli->error;
        }
    }

?>
