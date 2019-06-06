<?php 
session_start();
if (file_exists('../../DEVMACHINE')) {
  $pdo = new PDO('mysql:host=localhost;dbname=ase', 'root', '');
} else {
  $pdo = new PDO('mysql:host=localhost;dbname=anton-sementsov', 'anton-sementsov', '8restartnew!');
};

if(isset($_POST['password'])) {
    $passwort = md5($_POST['password']);
    $statement = $pdo->prepare("SELECT * FROM `login` WHERE `log` = '$passwort'");
    $result = $statement->execute(array('log' => $passwort));
    $user = $statement->fetch();

    //Überprüfung des Passworts
    if ($user > 0) {
        $_SESSION['userid'] = $user['id'];
        function Redirect($url, $permanent = false)
        {
            header('Location: ' . $url, true, $permanent ? 301 : 302);
            exit();
        }
        Redirect('../../music.php', false);
    } else {
        echo "Password was wrong<br><script type=\"text/javascript\">setTimeout(function(){ location.href = '../../index.php'; }, 2000);</script>";
    }; 

}
?>
