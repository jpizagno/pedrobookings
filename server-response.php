<?php
    session_start();     

    if ( isset($_SESSION["loginsuccess"])==false || (isset($_SESSION["loginsuccess"])==true &  $_SESSION["loginsuccess"]=="false" ) ) {
        $json_data = array('message' => 'username not set');
        echo json_encode($json_data);
    } else {

        /* Database connection information */
        $gaSql['user']       = $_SESSION["username"];
        $gaSql['password']   = $_SESSION["password"];
        $gaSql['db']         = $_SESSION["database"];
        $gaSql['server']     = "localhost";

        // storing  request (ie, get/post) global array to a variable
        $requestData= $_REQUEST;

        /* Array of database columns which should be read and sent back to DataTables. Use a space where
         * you want to insert a non-database field (for example a counter or static image)
         */
        $columns = array(
            0 => 'kreuzfahrt', 
            1 => 'flug' , 
            2 => 'hotel' , 
            3 => 'versicherung' , 
            4 => 'total' , 
            5 => 'day_departure' ,
            6 => 'month_departure' ,
            7 => 'year_departure' ,
            8 => 'first_name', 
            9 => 'surname', 
            10 => 'booking_number' , 
            11 => 'storno' , 
            12 => 'booking_date'
        );

        /* Indexed column (used for fast and accurate table cardinality) */
        $sIndexColumn = "id";

        /* DB table to use */
        $sTable = "booking";

        $conn=mysqli_connect($gaSql['server'], $gaSql['user'] ,$gaSql['password'],$gaSql['db']);
        // Check connection
        if ( !$conn  ) {
          error_log( "Failed to connect to MySQL: " . mysqli_connect_error(), 3 , "C:\\xampp\\php\\logs\\php_error_log.txt");
            $json_data = array('message' => 'login information not correct');
           echo json_encode($json_data);
        } else {     
                // getting total number records without any search
                $sql = "SELECT ID ";
                $sql.=" FROM ".$sTable;
                $query=mysqli_query($conn, $sql) or die("server-response.php: get bookins");
                $totalData = mysqli_num_rows($query);
                $totalFiltered = $totalData;  // when there is no search parameter then total number rows = total number filtered rows.


                $sql = "SELECT kreuzfahrt, flug , hotel , versicherung , total ,day_departure ,month_departure ,year_departure ,first_name,surname, booking_number , storno ,booking_date ";
                $sql.=" FROM booking WHERE 1 = 1 ";

                // getting records as per search parameters
                if( !empty($requestData['columns'][0]['search']['value']) ){ //Kreuzfahrt
                    $rangeArray = explode("-",$requestData['columns'][0]['search']['value']);
                    $minRange = $rangeArray[0];
                    $maxRange = $rangeArray[1];
                    $sql.=" AND ( kreuzfahrt >= '".$minRange."' AND  kreuzfahrt <= '".$maxRange."' ) ";
                }
                if( !empty($requestData['columns'][1]['search']['value']) ){ //Flug
                    $rangeArray = explode("-",$requestData['columns'][1]['search']['value']);
                    $minRange = $rangeArray[0];
                    $maxRange = $rangeArray[1];
                    $sql.=" AND ( flug >= '".$minRange."' AND  flug <= '".$maxRange."' ) ";
                }
                if( !empty($requestData['columns'][2]['search']['value']) ){ //Hotel
                    $rangeArray = explode("-",$requestData['columns'][2]['search']['value']);
                    $minRange = $rangeArray[0];
                    $maxRange = $rangeArray[1];
                    $sql.=" AND ( hotel >= '".$minRange."' AND  hotel <= '".$maxRange."' ) ";
                }    
                if( !empty($requestData['columns'][3]['search']['value']) ){ //Versicherung
                    $rangeArray = explode("-",$requestData['columns'][3]['search']['value']);
                    $minRange = $rangeArray[0];
                    $maxRange = $rangeArray[1];
                    $sql.=" AND ( versicherung >= '".$minRange."' AND  versicherung <= '".$maxRange."' ) ";
                }      
                if( !empty($requestData['columns'][4]['search']['value']) ){ //Total
                    $rangeArray = explode("-",$requestData['columns'][4]['search']['value']);
                    $minRange = $rangeArray[0];
                    $maxRange = $rangeArray[1];
                    $sql.=" AND ( total >= '".$minRange."' AND  total <= '".$maxRange."' ) ";
                }                 
                if( !empty($requestData['columns'][5]['search']['value']) ){   //day_departure
                    $sql.=" AND day_departure = ".$requestData['columns'][5]['search']['value']." ";
                    #error_log($sql."\n", 3, "/tmp/php.log");
                }
                if( !empty($requestData['columns'][6]['search']['value']) ){   //month_departure
                    $sql.=" AND month_departure = ".$requestData['columns'][6]['search']['value']." ";
                }  
                if( !empty($requestData['columns'][7]['search']['value']) ){   //year_departure
                    $sql.=" AND year_departure = ".$requestData['columns'][7]['search']['value']." ";
                } 
                if( !empty($requestData['columns'][8]['search']['value']) ){   //first_name
                    $sql.=" AND first_name LIKE '".$requestData['columns'][8]['search']['value']."%' ";
                }
                if( !empty($requestData['columns'][9]['search']['value']) ){   //surname
                    $sql.=" AND surname LIKE '".$requestData['columns'][9]['search']['value']."%' ";
                }     
                if( !empty($requestData['columns'][10]['search']['value']) ){  //booking_number
                    $sql.=" AND booking_number = ".$requestData['columns'][10]['search']['value']." ";
                } 
                if( !empty($requestData['columns'][11]['search']['value']) ){   //storno
                    $sql.=" AND storno = ".$requestData['columns'][11]['search']['value']." ";
                }      
                if( !empty($requestData['columns'][12]['search']['value']) ){  //booking_date
                    $rangeArray = explode("-",$requestData['columns'][12]['search']['value']);
                    $minRange = $rangeArray[0];
                    $maxRange = $rangeArray[1];
                    $sql.=" AND ( booking_date >= '".$minRange."' AND  booking_date <= '".$maxRange."' ) ";
                }        

                $query=mysqli_query($conn, $sql) or die("server-response.php: get booking");
                $totalFiltered = mysqli_num_rows($query); // when there is a search parameter then we have to modify total number filtered rows as per search result.

                $sql.=" ORDER BY ". $columns[$requestData['order'][0]['column']]."   ".$requestData['order'][0]['dir']."   LIMIT ".$requestData['start']." ,".$requestData['length']."   ";  // adding length

                $query=mysqli_query($conn, $sql) or die("server-response.php: get booking");

                $data = array();
                while( $row=mysqli_fetch_array($query) ) {  // preparing an array
                    $nestedData=array(); 

                     $nestedData[] = $row["kreuzfahrt"]; 
                     $nestedData[] = $row["flug"];
                     $nestedData[] = $row["hotel"];
                     $nestedData[] = $row["versicherung"]; 
                     $nestedData[] = $row["total"]; 
                     $nestedData[] = $row["day_departure"];
                     $nestedData[] = $row["month_departure"];
                     $nestedData[] = $row["year_departure"];
                     $nestedData[] = $row["first_name"]; 
                     $nestedData[] = $row["surname"]; 
                     $nestedData[] = $row["booking_number"]; 
                     $nestedData[] = $row["storno"]; 
                     $nestedData[] = $row["booking_date"];

                    $data[] = $nestedData;
                }

                $json_data = array(
                            "draw"            => intval( $requestData['draw'] ),   // for every request/draw by clientside , they send a number as a parameter, when they recieve a response/data they first check the draw number, so we are sending same number in draw.
                            "recordsTotal"    => intval( $totalData ),  // total number of records
                            "recordsFiltered" => intval( $totalFiltered ), // total number of records after searching, if there is no searching then totalFiltered = totalData
                            "data"            => $data   // total data array
                            );

                echo json_encode($json_data);  // send data as json format
        }  // end mysql conn test
    } // end test for SESSIONS
?>
