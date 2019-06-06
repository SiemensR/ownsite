<?php
session_start();
session_destroy();
echo "Logout done<br><script type=\"text/javascript\">setTimeout(function(){ location.href = '../../index.php'; }, 2000);</script>";
?>
