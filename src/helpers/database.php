<?php 
if (file_exists('../../DEVMACHINE')) {
    $con = mysqli_connect("localhost","root","","ase");
} else {
    $con = mysqli_connect("localhost","anton-sementsov","8restartnew!","anton-sementsov");
};
$_SESSION['password'] = "false";
// Check connection
if (mysqli_connect_errno())
  {
    echo "Failed to connect to MySQL: " . mysqli_connect_error(); 
  } 
// Check key for login
$mypass = mysqli_real_escape_string($con, md5($_POST['password']));
$check = mysqli_query($con, "SELECT * FROM `login` WHERE `log` = '$mypass'");
if(mysqli_num_rows($check) > 0){
        //The user had the correct login details
        echo("You have been logged in.");
        session_start();
        $_SESSION['password'] = "true";
?>
        <script type="text/javascript">setTimeout(function(){ location.href = '../../music.php'; }, 2000);</script>
<?php 
        } else {
        //There was an error
        echo "The password was not found." . mysqli_connect_error(); ?>
        <script type="text/javascript">setTimeout(function(){ location.href = '../../index.php'; }, 2000);</script>
       <?php } 
?> 

