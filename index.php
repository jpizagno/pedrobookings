<?php include('inc/header.php'); ?>

    <!-- custom script for this app -->
    <script type="text/javascript" language="javascript" src="js/custom.js"></script>

    <script>
        $(document).ready(index_ready);
    </script>

      <div class="container page-content">
          <div class="row">
            <div class="inner cover">
                <h1 class="cover-heading">Booking Handler</h1>
                
                <form>
                    <div id="contact-form" class="form-container" data-form-container  data-form-container style="background: #ededed;"> 
                        <div class="input-container">
                            <div class="row">
                                <input type="text" id="loginMessage" placeholder="You are not logged in.">
                            </div>
                        </div>
                    </div>
                </form>
                
                <p class="lead">
                    <button type="button" class="btn btn-success btn3d" data-toggle="modal" data-target="#loginModal" id="loginbutton">Login</button>
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
                <h2 class="modal-title" id="myModalLabel">Please login</h2>
              </div>
              <div class="modal-body">
                 <form class="form-signin">
                    <h4 class="form-signin-heading">Use MySQL Database login (hint: j***a/j****6) </h4>
                    <label for="inputEmail" class="sr-only">Email address</label>
                    <input type="user" id="inputUser" class="form-control" placeholder="user name" required autofocus>
                    <label for="inputPassword" class="sr-only">Password</label>
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
                    <button class="btn btn-primary btn-block" type="submit" onclick="login()" id="submitUsernamePassword">Sign in</button>
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
