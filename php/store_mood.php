<?php
//header( "Content-Type: application/json" );
header("Access-Control-Allow-Origin:*");
date_default_timezone_set('Europe/Paris');

if (!isset($_GET["mood"])) {
    return;
}

$mood = $_GET["mood"];

$file_name = 'mood.json';
$tmp_file_name = 'mood.tmp';

while (file_exists($tmp_file_name)) {
}

$tmp_file = fopen($tmp_file_name, 'w') or die("Can't create file");

if (file_exists($file_name)) {
    $json = file_get_contents($file_name);
    $array = json_decode($json, true);

    $tempArray = array(
        "mood" => $mood,
        "date" => date("d/m")
    );
    $array[] = $tempArray;

} else {
    $array = array(
        $tempArray = array(
            "mood" => $mood,
            "date" => date("d/m")
        )
    );
}

$json = json_encode($array);
file_put_contents($tmp_file_name, $json);
fclose($tmp_file);
unlink($file_name);
rename($tmp_file_name, $file_name);

echo "ok";
