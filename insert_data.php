<?php
session_start();     

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
   $flug  = $_POST['flug'];
   $hotel = $_POST['hotel'];
   $versicherung = $_POST['versicherung'];
   $total = $_POST['total'];
   $day_departure = $_POST['day_departure'];
   $month_departure = $_POST['month_departure'];
   $year_departure = $_POST['year_departure'];
   $first_name = $_POST['first_name'];
   $surname = $_POST['surname'];
   $booking_number = $_POST['booking_number'];
   $storno = $_POST['storno'];
   $booking_date = $_POST['booking_date'];

    $query = "INSERT INTO `booking` (`kreuzfahrt`, `flug` , `hotel` , `versicherung` , `total` ,`day_departure` ,`month_departure` ,`year_departure` ,`first_name` , `surname` , `booking_number` , `storno` , `booking_date` ) VALUES ('$kreuzfahrt','$flug','$hotel','$versicherung','$total','$day_departure','$month_departure','$year_departure','$first_name','$surname','$booking_number','$storno','$booking_date')";

      if (mysqli_query($conn, $query)) { 
            echo 'It is working';
      }

   // Close connection
   mysqli_close($conn);

?>
