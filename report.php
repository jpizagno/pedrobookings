<?php include('inc/header.php'); ?>
      
    <link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">
    <script type="text/javascript" language="javascript" src="js/jquery.js"></script>
    <script type="text/javascript" language="javascript" src="js/jquery.dataTables.js"></script>

    <!-- custom script for this app -->
    <script type="text/javascript" language="javascript" src="js/custom.js"></script>

    <script type="text/javascript" language="javascript" class="init">
        $(document).ready(report_ready);
    </script>

    <div class="container-fluid">
        <div class="row" >
            <h1 class="col-md-10 col-md-offset-1">Monthly Report </h1>
              <div class="col-md-3 col-md-offset-1">
                    <div class="form-group">
                        <label for="month">Month</label>
                        <input type="text" class="form-control" id="month" placeholder="12">
                    </div>
              </div>
              <div class="col-md-3">
                    <div class="form-group">
                        <label for="month">Year</label>
                        <input type="text" class="form-control" id="year" placeholder="2016">
                    </div>  
              </div>
              <div class="col-md-3">
                    <div class="form-group">
                        <label for="filename">filename</label>
                        <input type="text" class="form-control" id="filename" placeholder="report.pdf">
                    </div>  
              </div>
        </div>
        <div class="row" > 
            <div class="col-md-2 col-md-offset-1">
                <button class="btn btn-default" type="submit" onclick="makePdf()">Print Report (PDF)</button>
            </div>
            <div class="col-md-2">
               <button class="btn btn-default" type="submit" onclick="getTotal()">Show Total</button>
            </div>
            <div class="col-md-2">
               <div class="form-group">
                <input type="text" class="form-control" id="total_report" placeholder="Enter month and year above">
              </div>
            </div>
        </div>
    </div>


    <div class="container-fluid">
        <div class="row" >
            <hr/>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row" >
            <h4 class="col-md-10 col-md-offset-1">Use Table below to get details on bookings for each month. </h4>
        </div>
    </div>

    <div class="container-fluid">
         <div class="row" >  
             <div class="col-md-8 col-md-offset-1">
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
                 </div>
        </div>
    </div>

  </body>
</html>
