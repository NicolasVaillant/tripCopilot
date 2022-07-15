<?php



header("Content-Type: application/json");

header("Access-Control-Allow-Origin:*");

date_default_timezone_set('Europe/Paris');



$file_name = "files/storage.json";



if (!isset($_GET["element"]) or !isset($_GET["clicked"])  or !file_exists($file_name)) {

    echo "0";

}

$element = $_GET["element"];

$clicked = $_GET["clicked"];



$json = file_get_contents($file_name);

$array = json_decode($json, true);



$output = "0";



foreach ($array as $item => $entry) {

    if ($entry['element'] == $element && $entry['clicked'] == $clicked) {

        //$json_extract = json_encode();

        $output = $entry['value'];

        break;

    }

}



echo $output;

