<?php function dbkapcs() 
{
    $host="localhost";
    $user="root";
    $pass="";
    $db="utiroda";
    global $kapcs;

    $kapcs=mysqli_connect($host,$user,$pass,$db) or die ("Hiba a kapcsolódáskor!");
    $kapcs -> set_charset("utf-8");
    return $kapcs;
}
