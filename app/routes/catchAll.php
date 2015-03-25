<?php

/**
 * Catch all route which allows for page reloads from
 * the ember application without causing a 404 error.
 */
$app->get('/:method', function($method) use ($app) {
    $app->render('app.php');
})->conditions(array('method' => '.+'));


$app->options('/(:name+)', function() use ($app) {
    $app->response->header('Access-Control-Allow-Origin', '*');
    $app->response->header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE");
    $app->response->header('Access-Control-Allow-Headers', 'X-Requested-With, X-Authentication, X-Authorization, X-client, X-authentication'); //Allow JSON data to be consumed
})->conditions(array('method' => '.+'));