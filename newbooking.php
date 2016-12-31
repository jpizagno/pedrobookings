<?php include('inc/header.php'); ?>
      
      <div class+"container page-content">
          <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <h1>Please Enter a new booking below</h1>
                <form>
                  <div class="form-group">
                    <label for="exampleInputKreuzfahrt">Kreuzfahrt</label>
                    <input type="text" class="form-control" id="kreuzfahrt" placeholder="Kreuzfahrt">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputFlug">Flug</label>
                    <input type="text" class="form-control" id="flug" placeholder="flug">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputHotel">Hotel</label>
                    <input type="text" class="form-control" id="hotel" placeholder="hotel">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputVersicherung">Versicherung</label>
                    <input type="text" class="form-control" id="versicherung" placeholder="versicherung">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputTotal">Total</label>
                    <input type="text" class="form-control" id="total" placeholder="total">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputDayDeparture">Day Departure</label>
                    <input type="text" class="form-control" id="dayDeparture" placeholder="dayDeparture">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputMonthDeparture">Month Departure</label>
                    <input type="text" class="form-control" id="monthDeparture" placeholder="monthDeparture">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputYearDeparture">Year Departure</label>
                    <input type="text" class="form-control" id="yearhDeparture" placeholder="yearDeparture">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputSurname">Surname</label>
                    <input type="text" class="form-control" id="surname" placeholder="surname">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputFirstName">First Name</label>
                    <input type="text" class="form-control" id="firstname" placeholder="firstname">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputBookingNumber">Booking Number</label>
                    <input type="text" class="form-control" id="bookingnumber" placeholder="bookingnumber">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputStorno">Storno</label>
                    <input type="text" class="form-control" id="storno" placeholder="storno">
                  </div>
                  <div class="form-group">
                    <label for="exampleInputBookingDate">Booking Date</label>
                    <input type="text" class="form-control" id="bookingdate" placeholder="bookingdate">
                  </div>
                </form>
            </div>
          </div>
          <div class="row">
              <div class="col-md-8 col-md-offset-1">
                  <button class="btn btn-default" type="submit">Book this cruise</button>
                  <button class="btn btn-default" type="submit">Delete Selected Booking</button>
                  <button class="btn btn-default" type="submit">Storno Selected Booking</button>
                  <button class="btn btn-default" type="submit">Clear Fields</button>
                  <button class="btn btn-default" type="submit">UN-Storno Selected Booking</button>
              </div>
          </div>
          
          <div class="row">
              <div class="col-md-8 col-md-offset-3">
                <h2 class="sub-header">Most Recently Entered Bookings</h2>
                  <div class="table-responsive">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Header</th>
                          <th>Header</th>
                          <th>Header</th>
                          <th>Header</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1,001</td>
                          <td>Lorem</td>
                          <td>ipsum</td>
                          <td>dolor</td>
                          <td>sit</td>
                        </tr>
                        <tr>
                          <td>1,002</td>
                          <td>amet</td>
                          <td>consectetur</td>
                          <td>adipiscing</td>
                          <td>elit</td>
                        </tr>
                        </tbody>
                      </table>
                  </div>
              </div>
          </div>
              
      </div> 
      
  </body>
</html>
