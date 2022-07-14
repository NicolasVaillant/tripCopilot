<?php
require "php/admin/secure.php";
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Rubik&display=swap" rel="stylesheet">
    
    <link rel="shortcut icon" type="image/png" href="resources/ico/compass.ico"/>
    <link rel="shortcut icon" type="image/png" href="resources/ico/compass_16.png" sizes="16x16"/>
    <link rel="shortcut icon" type="image/png" href="resources/ico/compass_32.png" sizes="32x32"/>
    <link rel="stylesheet" href="fontawesome/css/all.css">
    
    <link rel="stylesheet" href="css/root.css">
    <!--    <link rel="stylesheet" href="css/main.css">-->
    <link rel="stylesheet" href="css/author.css">
    <link rel="stylesheet" href="css/dev.css">

    <script src="js/dev.js" defer></script>
    <title>[admin] Nicolas. | trip</title>
</head>
<body>
<main>
    <header>
        <h1>Dashboard</h1>
    </header>
    <div class="wrapper--content">
        <div class="elements-admin">
            <div class="header">
                <p>Sélectionner l'humeur du jour</p>
                <div class="allow">
                    <i class="fas fa-check can-write"></i>
                </div>
            </div>
            <div class="content">
                <div class="row first_row_change">
                    <label for="mood--day">Etat :
                        <select name="mood--day" id="mood--day">
                            <option value="content">Content</option>
                            <option value="incroyable">Incroyable</option>
                            <option value="normal">Normal</option>
                            <option value="mauvais">Mauvais</option>
                            <option value="fatigue">Fatigué</option>
                            <option value="triste">Triste</option>
                            <option value="enerve">Enervé</option>
                            <option value="stresse">Stressé</option>
                            <option value="saoule">Saoulé</option>
                        </select>
                    </label>
                    <button class="button-to-author send-data" onclick="send_request_mood()">Envoyer</button>
                </div>
                <div class="row col result-col">
                    <p class="result"></p>
                </div>
                <div class="row col mood_day">
                    <p class="mood_day_label">Hello</p>
                </div>
            </div>
        </div>
    </div>

    <div class="status-bar">
        <div class="status">
            <p>Status :</p>
            <p>En ligne</p>
        </div>
        <form action="php/admin/logout.php" method="post">
            <button type="submit" class="deco">Déconnexion</button>
        </form>
        <a class="button-to-author result-button" href="https://trip.nicolasvaillant.net">
            <i class="fas fa-globe"></i>
        </a>
    </div>
</main>
</body>