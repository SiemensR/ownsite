<?php 
session_start();
$title = "Starting page";
if (isset($_SESSION['userid'])) {
    function Redirect($url, $permanent = false)
    {
        header('Location: ' . $url, true, $permanent ? 301 : 302);
        exit();
    }
    Redirect('music.php', false);
} else {
    require('dist/template/header/meta.php');
    require('dist/content/index.php');
    require('dist/template/footer/footer.php');    
};
