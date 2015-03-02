<?php

/*
 * Create/Register a new user
 */
$app->post('/api/user', function () use ($app) {

    // get the params
    $username = $app->request->post('username');
    $email = $app->request->post('email');
    $password = $app->request->post('password');
    $firstName = $app->request->post('first_name');
    $lastName = $app->request->post('last_name');

    if ($username === '' || $email === '' || $password === '' || $firstName === '' || $lastName === '') {
        $app->response->setStatus(401);
        echo json_encode(array(
            'error' => 'cannot_create'
        ));
        return;
    } else {

        if (User::where('email', '=', $email)->first() || User::where('username', '=', $username)->first()) {
            $app->response->status(401);
            echo json_encode(array(
                'error' => 'cannot_create'
            ));
            return;
        } else {

            $salt = uniqid(mt_rand(), true);
            $options = [
                'salt' => $salt,
                'cost' => 12
            ];
            $hash = password_hash($password, PASSWORD_BCRYPT, $options);

            $data = array(
                'username' => $username,
                'email' => $email,
                'password' => $hash,
                'salt' => $salt,
                'first_name' => $firstName,
                'last_name' => $lastName
            );

            // create the user
            $user = new User($data);
            $user->save();

            $app->response->status(201);
            echo '';
            return;

        }

    }

});


/**
 *  Get currently logged in user
 */
$app->get('/api/users', function () use ($app) {
    $authBearerToken = $app->request->headers->get('Authorization');
    if (!checkBearerToken($authBearerToken)) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
        return;
    }
    $user = User::where('username', '=', $_SESSION['user'])->first();
    echo json_encode(array(
        'id' => $user->id,
        'username' => $user->username,
        'email' => $user->email,
        'firstName' => $user->first_name,
        'lastName' => $user->last_name,
        'createdAt' => $user->created_at,
        'updatedAt' => $user->updated_at
    ));
    return;
});


/*
 *  Update currently logged in user
 */
$app->put('/api/user', function () use ($app) {
    return;
});


/*
 *  Delete currently logged in user.
 */
$app->delete('/api/user', function () use ($app){
    return;
});