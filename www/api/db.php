<?php
$db_user = "aencoin";
$db_pass = "WibbleWobble101";
$db = "aen_signup";
$db_host = "localhost";

$mysqli = new mysqli( $db_host, $db_user, $db_pass, $db );

if ($mysqli->connect_errno) {
    echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}else{
    $mysqli->select_db($db);
	//$mysqli->set_charset("utf8");
}
?>