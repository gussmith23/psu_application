<?php

/**
 * OAuth2.0 compliant bearer token authorization.
 */
$app->post('/api/token', function () use ($app) {
    $app->response->header('Content-Type', 'application/json');
    $app->response->header('Access-Control-Allow-Origin', '*');
    $body = $app->request->params();
    if ($body['grant_type'] === 'password') {
        $username = $body['username'];
        $password = $body['password'];
        $user = User::where('username', '=', $username)->orWhere('email', '=', $username)->first();
        if ($user && password_verify($password, $user->password)) {
            $sessionHash = hash('sha256', $user->username . uniqid(mt_rand(), true));
            $_SESSION['user'] = $user->id;
            $_SESSION['access_token'] = $sessionHash;
            echo json_encode(array(
                'id' => $_SESSION['user'],
                'role' => $user->role,
                'access_token' => $sessionHash
            ));
        } else {
            $app->response->status(400);
            echo json_encode(array(
                'error' => 'invalid_grant'
            ));
        }
    } else {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'unsupported_grant_type'
        ));
    }
});

/**
 * Route to revoke the OAuth2.0 compliant bearer token.
 */
$app->post('/api/revoke', function () use ($app) {
//    if (isset($_SESSION['user']) && isset($_SESSION['access_token'])) {
        unset($_SESSION['user']);
        unset($_SESSION['access_token']);
//    }
});