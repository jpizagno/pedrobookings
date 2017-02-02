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
            
            <div class="col-md-4 col-md-offset-2">
                <form>
                    <div id="contact-form" class="form-container" data-form-container>
                        <div class="row">
                            <div class="form-title">
                                <span>Monthly Report</span>
                            </div>
                        </div>
                        <div class="input-container">
                            <div class="row">
                                <span class="req-input" >
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Input Month. i.e. 12"> </span>
                                    <input type="text" data-min-length="8" id="month_report" placeholder="enter month. i.e. 12">
                                </span>
                            </div>
                            <div class="row">
                                <span class="req-input">
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Enter Year. i.e. 2012"> </span>
                                    <input type="email" id="year_report" placeholder="enter year. i.e. 2017">
                                </span>
                            </div>
                            <div class="row submit-row">
                                <button type="button" class="btn btn-block submit-form" onclick="makePdf()">Create Report (PDF)</button>
                            </div>
                            <div class="row submit-row">
                                <button type="button" class="btn btn-block submit-form" onclick="location.href = 'report.pdf';">View PDF</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            
            <div class="col-md-4">
                <form>
                    <div id="contact-form" class="form-container" data-form-container  data-form-container style="color: rgb(46, 125, 50); background: rgb(200, 230, 201);">
                        <div class="row">
                            <div class="form-title">
                                <span>Calculate Total</span>
                            </div>
                        </div>
                        <div class="input-container">
                            <div class="row">
                                <span class="req-input valid" >
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Input Month. i.e. 12"> </span>
                                    <input type="text" data-min-length="8" id="month_total" placeholder="enter month. i.e. 12">
                                </span>
                            </div>
                            <div class="row">
                                <span class="req-input valid">
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Enter Year. i.e. 2012"> </span>
                                    <input type="text" id="year_total" placeholder="enter year. i.e. 2017">
                                </span>
                            </div>
                            <!--div class="row">
                                <span class="req-input valid">
                                    <span class="input-status" data-toggle="tooltip" data-placement="top" title="Input file name with PDF. i.e. report.pdf"> </span>
                                    <input type="tel"   id="total_report" placeholder="total">
                                </span>
                            </div-->
                            <div class="row">
                                <input type="text"   id="totalParagraph" placeholder="Total: Please month and year above">
                            </div>
                            <div class="row submit-row" >
                                <button type="button" class="btn btn-block submit-form valid" onclick="getTotal()">Show Total</button>
                            </div>
                        </div>
                    </div>
                </form>
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
