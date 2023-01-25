<style>
  body{
    background-color: #002A32;
    color: azure;
    text-align: center;
    font-family: 'Roboto';
  }
  .custom_BG{
    background-color:#222121 !important;
  border: 1px #002A32 solid !important;
  border-radius: 60px;
  top: 30%;
  }
  .custom_PB{
    padding-bottom: 20%;
  }
</style>
<?php

if (isset($_POST['gomb'])) {
            require('kapcs.php');
            dbkapcs();
            $query = "select email from nyeremeny where email='$_POST[email]'";
            $eredm = mysqli_query($kapcs, $query);
            if (mysqli_num_rows($eredm) != 0) {
              echo "<div class='custom_PB'>";
              echo "</div>";
              echo "<div class='custom_BG'>";
              echo "<h1>Már jelenleg részt vesz ezen a nyereményjátékon!</h1>";
              echo "<h2>A sorsolás eredményét az email címjére fogjuk küldeni!</h2>";
              echo "<h3>Visszalépés a főoldalra: <div id='countdown'></div></h3>";
              echo "</div>";
              

            } else {

              $query = "Insert into nyeremeny values
            ('nyer_id','$_POST[email]','$_POST[nev]')";
              mysqli_query($kapcs, $query);
              echo "<div class='custom_BG'>";
              echo "<h1>A nyereményjátékra feliratkozott!</h1>";
              echo "<h2>Köszönjük a részvételt!</h2>";
              echo "<h2>A sorsolás eredményét az email címjére fogjuk küldeni!</h2>";
              echo "<h3>Visszalépés a főoldalra: <div id='countdown'></div></h3>";
              echo "</div>";
            }
          }

?>
<script>
  var timeleft = 10;
var downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "";
  } else {
    document.getElementById("countdown").innerHTML = timeleft + " másodperc múlva";
  }
  timeleft -= 1;
}, 1000);
  const myTimeout = setTimeout(myGreeting, 11000);
  function myGreeting() {
    window.location.replace("../index.html");
}
</script>