<?php
//header( "Content-Type: application/json" );
header("Access-Control-Allow-Origin:*");
date_default_timezone_set('Europe/Paris');

if (!isset($_GET["element"]) or !isset($_GET["clicked"]) or !isset($_GET["value"])) {
    return;
}

$element = $_GET["element"];
$clicked = $_GET["clicked"];
$value = $_GET["value"];

$file_name = 'storage.json';
$tmp_file_name = 'storage.tmp';

while (file_exists($tmp_file_name)) {
}

$tmp_file = fopen($tmp_file_name, 'w') or die("Can't create file");

if (file_exists($file_name)) {
    $json = file_get_contents($file_name);
    $array = json_decode($json, true);
    $found_in_array = false;

    foreach ($array as $item => $entry) {

        if ($entry['element'] == $element && $entry["clicked"] == $clicked) {
            $array[$item]['value'] = $value;
            $found_in_array = true;
            break;
        }
    }

    if (!$found_in_array) {
        $tempArray = array(
            "element" => $element,
            "clicked" => $clicked,
            "value" => $value,
            "date" => date("d M y (H:i)")
        );
        $array[] = $tempArray;
    }

} else {
    $array = array(
        $tempArray = array(
            "element" => $element,
            "clicked" => $clicked,
            "value" => $value,
            "date" => date("d M y (H:i)")
        )
    );
}

$json = json_encode($array);
file_put_contents($tmp_file_name, $json);
// Swap tmp file with origin file
fclose($tmp_file);
unlink($file_name);
rename($tmp_file_name, $file_name);

echo "status:ok/"."element:".$element."/class:".$clicked."/value:".$value;
