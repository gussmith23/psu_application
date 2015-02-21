<?php

$app->get('/', function() use ($app) {
    $app->render('app.php');
});
