<?php 
session_start();
$_SESSION['password'] = "false";
$title = "Starting page";
if ($_SESSION['password'] == "true") {
    header("Location: music.php");
    exit;
} 
else {
    require('dist/template/header/meta.php');
    require('dist/content/index.php');
    require('dist/template/footer/footer.php');     
};

