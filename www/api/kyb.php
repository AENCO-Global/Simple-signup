<?php
require_once 'db.php';

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

if(isset($request->formdata)){ $formdata = $mysqli->real_escape_string(json_encode($request->formdata)); }else{ echo 'hmm'; die; }

$sql = "INSERT INTO kyb SET entry='$formdata'";
$res = $mysqli->query($sql);
echo $mysqli->error;

$insertID = $mysqli->insert_id;

$sql = "SELECT * FROM kyb WHERE entry_ID=$insertID";
$res = $mysqli->query($sql);
$data = $res->fetch_assoc();

echo json_encode($data['entry']);
?>