<?php

/**
 * OAuth2.0 compliant bearer token authorizer.
 *
 * @param $authBearerToken
 * @return bool
 */
function checkBearerToken($authBearerToken) {
    $sessionHashBearer = "Bearer " . $_SESSION['access_token'];
    if($authBearerToken === $sessionHashBearer) {
        return true;
    } else {
        return false;
    }
}