<?php include('inc/header.php'); ?>

    <!-- custom script for this app -->
    <script type="text/javascript" language="javascript" src="js/custom.js"></script>

      <div class="container page-content">
          <div class="row">
            <div class="inner cover">
                <h1 class="cover-heading">Booking Handler</h1>
                <p class="lead">You are not logged in.  Please login to enter a new booking or to get a monthly report.</p>
                <p class="lead">
                  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#loginModal">
                        Login
                    </button>
                </p>
            </div>
          </div>
      </div>
      
      <!-- Login Modal Button -->
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Please login</h4>
              </div>
              <div class="modal-body">
                 <form class="form-signin">
                    <h2 class="form-signin-heading">Please sign in</h2>
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <input type="user" id="inputUser" class="form-control" placeholder="user name" required autofocus>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                    <button class="btn btn-lg btn-primary btn-block" type="submit" onclick="login()" id="submit">Sign in</button>
                  </form>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
  </body>
</html>
