<?php

/**
 * Catch all route which allows for page reloads from
 * the ember application without causing a 404 error.
 */
$app->get('/:method', function($method) use ($app) {
    $app->render('app.php');
})->conditions(array('method' => '.+'));
