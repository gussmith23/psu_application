<?php
/**
 * Created by IntelliJ IDEA.
 * User: mporter
 * Date: 3/16/15
 * Time: 12:31 AM
 */



//
//  Create default user 
//  !!! Needed to initially log into the application !!!
//
{
    $password = hash("sha256", "enter-desired-password-here");
    $salt = uniqid(mt_rand(), true);
    $options = [
        'salt' => $salt,
        'cost' => 12
    ];
    $hash = password_hash($password, PASSWORD_BCRYPT, $options);
    $user = new User(array(
        'username' => 'adminaccount',
        'email' => 'change@me.com',
        'password' => $hash,
        'salt' => $salt,
        'role' => 'admin',
        'first_name' => 'Admin',
        'last_name' => 'Account'
    ));
    $user->save();
}