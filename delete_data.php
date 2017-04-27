<?php
session_start();     

    $_SESSION["username"] = "julia"; //$_POST['username'];
    $_SESSION["password"] = "james76"; //$_POST['password'];
    $_SESSION["database"] = "bookings";
    $_SESSION["loginsuccess"] = "false";

    /* Database connection information */
    $gaSql['user']       = $_SESSION["username"];
    $gaSql['password']   = $_SESSION["password"];
    $gaSql['db']         = $_SESSION["database"];
    $gaSql['server']     = "localhost";

    $conn=mysqli_connect($gaSql['server'],$gaSql['user'] ,$gaSql['password'],$gaSql['db']);

    // Check connection
    if (mysqli_connect_errno()) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

   //mysql_set_charset('utf8');
   mysqli_set_charset($conn, "utf8");

   $kreuzfahrt = $_POST['kreuzfahrt'];
   $booking_number = $_POST['booking_number'];

    $query = "DELETE FROM booking WHERE  kreuzfahrt='$kreuzfahrt' AND booking_number='$booking_number'" ;
    echo $query;

      if (mysqli_query($conn, $query)) { 
          echo 'It is working';
      }

   // Close connection
   mysqli_close($conn);

?>
