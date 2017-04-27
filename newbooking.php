<?php include('inc/header.php'); ?>

    <link rel="stylesheet" type="text/css" href="css/jquery.dataTables.css">

    <!-- script type="text/javascript" language="javascript" src="js/jquery.js"></script -->
    <!-- script type="text/javascript" language="javascript" src="js/jquery.dataTables.js"></script-->
    <script src="https://cdn.datatables.net/1.10.13/js/jquery.dataTables.js"></script>


    <!-- custom script for this app -->
    <script type="text/javascript" language="javascript" src="js/custom.js"></script>

    <script>
        $(document).ready(newbooking_ready);
    </script>

      <div class="container-fluid">
          <div class="row">
            <div class="col-md-4">
                <form>
                    <div id="contact-form" class="form-container" data-form-container>
                        <div class="row">
                            <div class="form-title">
                                <span>Costs </span>
                            </div>
                        </div>
                        <div class="input-container">
                            <div class="row">
                                <span class="req-input" >
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Input Kreuzfahrt"> </span>
                                    <input type="text" data-min-length="8" id="kreuzfahrt" default=0 placeholder="Kreuzfahrt">
                                </span>
                            </div>
                            <div class="row">
                                <span class="req-input">
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Input Flug"> </span>
                                    <input type="text" id="flug" placeholder="Flug">
                                </span>
                            </div>
                            <div class="row">
                                <span class="req-input">
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Input Hotel"> </span>
                                    <input type="text" id="hotel" placeholder="Hotel">
                                </span>
                            </div>
                            <div class="row">
                                <span class="req-input">
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Input Versicherung"> </span>
                                    <input type="text" id="versicherung" placeholder="Versicherung">
                                </span>
                            </div>
                            <div class="row">
                                <span class="req-input">
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Input Storno"> </span>
                                    <input type="text" id="storno" placeholder="Storno (0=Good, 1=Storno)">
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
                
                
            <div class="col-md-4">
                <form>
                    <div id="contact-form" class="form-container" data-form-container style="color: rgb(46, 125, 50); background: rgb(200, 230, 201);">
                        <div class="row">
                            <div class="form-title">
                                <span>Name and Booking Number </span>
                            </div>
                        </div>
                        <div class="input-container">
                            <div class="row">
                                <span class="req-input valid" >
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Input Surname"> </span>
                                    <input type="text" data-min-length="8" id="surname" placeholder="Surname">
                                </span>
                            </div>
                            <div class="row">
                                <span class="req-input valid">
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Please Input First Name"> </span>
                                    <input type="text" id="firstname" placeholder="First Name">
                                </span>
                            </div>
                            <div class="row">
                                <span class="req-input valid">
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Please Input Booking Number"> </span>
                                    <input type="text" id="bookingnumber" placeholder="Booking Number">
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
                
            <div class="col-md-4">
                <form>
                    <div id="contact-form" class="form-container" data-form-container style="color: rgb(198, 40, 40); background: rgb(255, 205, 210);">
                        <div class="row">
                            <div class="form-title">
                                <span> Dates </span>
                            </div>
                        </div>
                        <div class="input-container">
                            <div class="row">
                                <span class="req-input invalid" >
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Input Booking Date DD/MM/YYYY. i.e. 28/02/2017"> </span>
                                    <input type="text" data-min-length="8" id="bookingdate" placeholder="Booking Date (31/12/2017)">
                                </span>
                            </div>
                            <div class="row">
                                <span class="req-input invalid">
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Please Input Day Departure. i.e. 28"> </span>
                                    <input type="text" id="dayDeparture" placeholder="Departure Day (25)">
                                </span>
                            </div>
                            <div class="row">
                                <span class="req-input invalid">
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Please Input Month Departure. i.e. 12"> </span>
                                    <input type="text" id="monthDeparture" placeholder="Departure Month (06)">
                                </span>
                            </div>
                             <div class="row">
                                <span class="req-input invalid">
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Please Input Year Departure. i.e. 2017"> </span>
                                    <input type="text" id="yearDeparture" placeholder="Departure Year (2017)">
                                </span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
                
		</div>
       
          </div>
          <div class="row" >
              <div class="col-md-8 col-md-offset-1">
                  <button type="button" class="btn btn-success btn3d" onclick="bookThisCruise()">Book Cruise</button>
                  <button type="button" class="btn btn-delete btn3d" id="deleteSelectedBooking">Delete Selected Booking</button>
                  <button type="button" class="btn btn-storno btn3d" id="stornoBooking">Storno Selected Booking</button>
                  <button type="button" class="btn btn-clear btn3d" id="clearFields">Clear Fields</button>
                  <button type="button" class="btn btn-unsto btn3d" id="unStornoBooking">UN-Storno Selected Booking</button>
              </div>
          </div>
      </div> <!-- end of container -->
    
      <div class="container-fluid">
          <div class="row">
              <div class="col-md-8 col-md-offset-1">
                <table id="dataTable" cellpadding="0" cellspacing="0" border="0" class="display" width="100%">
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
                                <option value="0-100">0 - 101</option>
                                <option value="100-1000">100 - 1000</option>
                                <option value="1000-2000">1000 - 2000</option>
                            </select>
                        </td> 
                        <td>
                            <select data-column="1"  class="search-input-select">
                                <option value="">(Select a range)</option>
                                <option value="0-101">0 - 100</option>
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
          </div> <!-- end of row -->
              
      </div> 
      
  </body>
</html>
