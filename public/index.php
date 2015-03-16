<?php

date_default_timezone_set('America/New_York');

require '../vendor/autoload.php';

$app = new \Slim\Slim();
$app->add(new \Slim\Middleware\SessionCookie(array('secret' => uniqid(rand(), true))));

// config
require '../app/configs/config.php';
require '../app/configs/database.php';

// create the tables and stuff
//require '../app/start.php';
//require '../app/seeder.php';

// other stuff
require '../app/utility/authenticator.php';

// routes
require '../app/routes/index.php';
require '../app/routes/session.php';
require '../app/routes/user.php';
require '../app/routes/survey.php';
require '../app/routes/response.php';

// default catch-all route
require '../app/routes/catchAll.php';

$app->run();
