<?php
    

   $month = $_POST['month'];
   $year = $_POST['year'];
   $filename = $_POST['filename'];
   error_log($filename , 3, '/tmp/php.log');

   shell_exec( 'java -jar java/writepdf/target/writepdf-0.0.1-SNAPSHOT-jar-with-dependencies.jar "'.addslashes($month).'" "'.addslashes($year).'" "'.addslashes($filename).'" ');

?>