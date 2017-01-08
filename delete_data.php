<?php
     
    /* Database connection information */
    $gaSql['user']       = "root";
    $gaSql['password']   = "root";
    $gaSql['db']         = "bookings_test";
    $gaSql['server']     = "localhost";

   $kreuzfahrt = $_POST['kreuzfahrt'];
   $booking_number = $_POST['booking_number'];

    $mysqli = new mysqli ( $gaSql['server'], $gaSql['user'],  $gaSql['password'] , $gaSql['db'], 3306 );
    if ($mysqli->connect_errno) {
        printf ( "Connect failed: %s\n", $mysqli->connect_error );
        exit ();
    } else {
        printf ( "cONN Sucees" );
        if ($mysqli->query (sprintf ( "DELETE FROM booking WHERE booking_number ='%s' AND kreuzfahrt='%s' ", mysqli_real_escape_string ( $mysqli, $booking_number ) ,mysqli_real_escape_string ( $mysqli, $kreuzfahrt ) ) )) {
            printf ( "Affected Rows  %d rows.\n", $mysqli->affected_rows );
        }
    }

?>