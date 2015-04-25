<?php

/*
 * Create/Register a new user
 */
$app->post('/api/user', function () use ($app) {

    $app->response->headers->set('Content-Type', 'application/json');

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
    } else {

        if (User::where('email', '=', $email)->first() || User::where('username', '=', $username)->first()) {
            $app->response->status(401);
            echo json_encode(array(
                'error' => 'cannot_create'
            ));
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
                'role' => 'request',
                'first_name' => $firstName,
                'last_name' => $lastName
            );

            // create the user
            $user = new User($data);
            $user->save();

            $app->response->status(201);
            echo json_encode([
                'status' => 200
            ]);

        }

    }

});


/**
 *  Get currently logged in user
 */
$app->get('/api/user', function () use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $user = User::where('id', '=', $_SESSION['user'])->first();
        echo json_encode($user);
    }
});


/**
 * Get users by role
 */
$app->get('/api/users/role/:role', function ($role) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $users = User::where('role', '=', $role)->get();
        echo json_encode($users);
    }
});


/*
 *  Update currently logged in user
 */
$app->put('/api/user', function () use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $data = json_decode($app->request->getBody());
        $user = User::where('id', '=', $_SESSION['user'])->first();
        $user->username = $data->username;
        $user->email = $data->email;
        $user->first_name = $data->first_name;
        $user->last_name = $data->last_name;
        $user->save();
        echo json_encode(array(
            'status' => '200'
        ));
    }
});


$app->put('/api/user/pw', function () use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    $oldPassword = $app->request->put('old_password');
    $newPassword = $app->request->put('new_password');
    if(!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        )); 
    } else {
        $user = User::where('id', '=', $_SESSION['user'])->first();
        if(password_verify($oldPassword, $user->password)) {
            $options = [
                'salt' => $user->salt,
                'cost' => 12
            ];
            $hash = password_hash($newPassword, PASSWORD_BCRYPT, $options);
            $user->password = $hash;
            $user->save();
            echo json_encode(array(
                'status' => '200'
            ));
        } else {
            $app->response->status(400);
            echo json_encode(array(
                'error' => 'invalid_password'
            ));
        }
    }
});


/*
 *  Delete currently logged in user.
 */
$app->delete('/api/user', function () use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {

    }
});


$app->get('/api/user/:id', function ($id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $user = User::where('id', '=', $id)->get();
        echo json_encode($user);
    }
});


$app->put('/api/user/:id', function ($id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $data = json_decode($app->request->getBody());
        $user = User::where('id', '=', $id)->first();
        $user->username = $data->username;
        $user->email = $data->email;
        $user->role = $data->role;
        $user->first_name = $data->first_name;
        $user->last_name = $data->last_name;
        $user->save();
        echo json_encode([
            'status' => 200
        ]);
    }
});

$app->delete('/api/user/:id', function ($id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $user = User::where('id', '=', $id)->first();
        $user->delete();
        echo json_encode([
            'status' => 200
        ]);
    }
});