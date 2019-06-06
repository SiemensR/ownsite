<?php 
session_start();
if(!isset($_SESSION['userid'])) {
    die("<h2>The contents are available only after <a href=\"index.php\">login</a></h2>");
};
$title = "Music from ASE";
require('dist/template/header/meta.php');
require('dist/content/music.php');
require('dist/template/footer/footer.php'); 
