<?php

session_start();

if (!isset($_SESSION['admin_trip_log_successfully']) || $_SESSION['admin_trip_log_successfully'] != true) {
    header("Location: login");
    exit();
}else{

}
