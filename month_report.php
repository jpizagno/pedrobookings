<?php
session_start();     

    /* Database connection information */
    $config = parse_ini_file('config');
    $gaSql['user']       = $config['db_user'];
    $gaSql['password']   = $config['db_password'];
    $gaSql['db']         = $config['db_database'];
    $gaSql['server']     = $config['db_ip'];
    $conn=mysqli_connect($gaSql['server'],$gaSql['user'] ,$gaSql['password'],$gaSql['db']);
    // Check connection
    if (mysqli_connect_errno()) {
      echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }

    $month = $_POST['month'];
    $year  = $_POST['year'];

    $query = "SELECT SUM(total) AS month_total FROM  `booking` WHERE month_departure='$month' AND year_departure = '$year' AND storno=0";

    $results = mysqli_query($conn, $query);

    $row=mysqli_fetch_assoc($results);
    $total = $row['month_total'];
    $json_data = array("total" => $total );
    echo json_encode($json_data);

   // Close connection
   mysqli_close($conn);

?>
