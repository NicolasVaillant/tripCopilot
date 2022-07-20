<?php
//header( "Content-Type: application/json" );
header("Access-Control-Allow-Origin:*");
date_default_timezone_set('Europe/Paris');

if (!isset($_GET["data"])) {
    echo "0";
}

$ip = $_SERVER['REMOTE_ADDR'];

//echo $ip;

$data = $_GET["data"];

$file_name = 'files/comments.json';
$tmp_file_name = 'files/comments.tmp';

while (file_exists($tmp_file_name)) {
}

$tmp_file = fopen($tmp_file_name, 'w') or die("Can't create file");
$json = json_encode($data);
file_put_contents($tmp_file_name, $json);
// Swap tmp file with origin file
fclose($tmp_file);
unlink($file_name);
rename($tmp_file_name, $file_name);

echo "Saved succesfully";
