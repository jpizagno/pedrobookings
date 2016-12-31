<?php include('inc/header.php'); ?>
      
    <link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">
    <script type="text/javascript" language="javascript" src="js/jquery.js"></script>
    <script type="text/javascript" language="javascript" src="js/jquery.dataTables.js"></script>

    <script type="text/javascript" language="javascript" class="init">
        $(document).ready(function() {

            var dataTable = $('#example').DataTable( {
                                        "processing": true,
                                        "serverSide": true,
                                        "ajax":{
                                                url :"server-response.php", // json datasource
                                                type: "post",  // method  , by default get
                                        }
                                } );
            
            <!-- removes the default search textinput -->
            $("#example_filter").css("display","none");
            
            $('.search-input-text').on( 'keyup click', function () {   // for text boxes
                var i =$(this).attr('data-column');  // getting column index
                var v =$(this).val();  // getting search input value
                dataTable.columns(i).search(v).draw();
            } );
            $('.search-input-select').on( 'change', function () {   // for select box
                var i =$(this).attr('data-column');
                var v =$(this).val();
                dataTable.columns(i).search(v).draw();
            } );
            
        });
    </script>
      
      <!-- data table -->
      <table id="example" cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
            <thead>
            <tr>
                <th>Kreuzfahrt</th>
                <th>Flug</th>
                <th>Hotel</th>
                <th>Versicherung</th>
                <th>Total</th>
                <th>Day Departure</th>
                <th>Month Departure</th>
                <th>Year Departure</th>
                <th>First name</th>
                <th>Last Name</th>
                <th>Booking Number</th>
                <th>Storno</th>
                <th>Booking Date</th>
            </tr>
            </thead>
            <thead>
            <tr>    
                <td>
                    <select data-column="0"  class="search-input-select">
                        <option value="">(Select a range)</option>
                        <option value="0-100">0 - 100</option>
                        <option value="100-1000">100 - 1000</option>
                        <option value="1000-2000">1000 - 2000</option>
                    </select>
                </td> 
                <td>
                    <select data-column="1"  class="search-input-select">
                        <option value="">(Select a range)</option>
                        <option value="0-100">0 - 100</option>
                        <option value="100-1000">100 - 1000</option>
                        <option value="1000-10000">1000 - 10000</option>
                    </select>
                </td> 
                <td>
                    <select data-column="2"  class="search-input-select">
                        <option value="">(Select a range)</option>
                        <option value="0-100">0 - 100</option>
                        <option value="100-1000">100 - 1000</option>
                        <option value="1000-10000">1000 - 10000</option>
                    </select>
                </td> 
                <td>
                    <select data-column="3"  class="search-input-select">
                        <option value="">(Select a range)</option>
                        <option value="0-100">0 - 100</option>
                        <option value="100-1000">100 - 1000</option>
                        <option value="1000-10000">1000 - 10000</option>
                    </select>
                </td> 
                <td>
                    <select data-column="4"  class="search-input-select">
                        <option value="">(Select a range)</option>
                        <option value="0-100">0 - 100</option>
                        <option value="100-1000">100 - 1000</option>
                        <option value="1000-10000">1000 - 10000</option>
                    </select>
                </td>  
                <td><input type="text" data-column="5" class="search-input-text" ></td> 
                <td><input type="text" data-column="6" class="search-input-text" ></td> 
                <td><input type="text" data-column="7" class="search-input-text" ></td> 
                <td><input type="text" data-column="8" class="search-input-text" ></td> 
                <td><input type="text" data-column="9" class="search-input-text" ></td>  
                <td><input type="text" data-column="10" class="search-input-text" ></td>  
                <td><input type="text" data-column="11" class="search-input-text" ></td> 
                <td>
                    <select data-column="12"  class="search-input-select">
                        <option value="">(Select a range)</option>
                        <option value="0-100">0 - 100</option>
                        <option value="100-1000">100 - 1000</option>
                        <option value="1000-10000">1000 - 10000</option>
                    </select>
                </td> 
                
            </tr>
            </thead>
        </table>

  </body>
</html>
