<?php

/**
 * OAuth2.0 compliant bearer token authorizer.
 *
 * @param $authBearerToken
 * @return bool
 */
//function checkBearerToken ($authBearerToken) {
//    $sessionHashBearer = "Basic " . $_SESSION['access_token'];
//    if ($authBearerToken === $sessionHashBearer) {
//        return true;
//    } else {
//        return false;
//    }
//};

function ensureAuthenticated () {
    $app = \Slim\Slim::getInstance();
    $authToken = $app->request->headers->get('X-Authorization');
    $sessionHashToken = "Basic " . $_SESSION['access_token'];
    return ($authToken === $sessionHashToken);
};

function genPermalink()
{
    $characters = 'abcdefghjklmnpqrstuvwxyz23456789';
    $string = '';
    for ($i = 0; $i < 6; $i++) {
        $string .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $string;
}