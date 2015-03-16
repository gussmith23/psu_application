<?php
/**
 * Created by IntelliJ IDEA.
 * User: mporter
 * Date: 3/16/15
 * Time: 12:31 AM
 */


function genPermalink()
{
    $characters = 'abcdefghjklmnpqrstuvwxyz23456789';
    $string = '';
    for ($i = 0; $i < 6; $i++) {
        $string .= $characters[rand(0, strlen($characters) - 1)];
    }
    return $string;
}


{
    $password = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';
    $salt = uniqid(mt_rand(), true);
    $options = [
        'salt' => $salt,
        'cost' => 12
    ];
    $hash = password_hash($password, PASSWORD_BCRYPT, $options);
    $user = new User(array(
        'username' => 'testaccount',
        'email' => 'test@account.com',
        'password' => $hash,
        'salt' => $salt,
        'first_name' => 'Test',
        'last_name' => 'Account'
    ));
    $user->save();
}


{
    $survey = new Survey(array(
        'survey_permalink' => genPermalink(),
        'survey_name' => 'Survey 1',
        'survey_type' => 'IST',
        'survey_description' => 'This is a description',
        'survey_notes' => 'You can put some notes about the survey here'
    ));
    $survey->save();
}

{
    $survey = new Survey(array(
        'survey_permalink' => genPermalink(),
        'survey_name' => 'Survey 2',
        'survey_type' => 'IST',
        'survey_description' => 'This is a description',
        'survey_notes' => 'You can put some notes about the survey here'
    ));
    $survey->save();
}

{
    $survey = new Survey(array(
        'survey_permalink' => genPermalink(),
        'survey_name' => 'Survey 3',
        'survey_type' => 'PSU',
        'survey_description' => 'This is a description',
        'survey_notes' => 'You can put some notes about the survey here'
    ));
    $survey->save();
}

{
    $survey = new Survey(array(
        'survey_permalink' => genPermalink(),
        'survey_name' => 'Survey 4',
        'survey_type' => 'IST',
        'survey_description' => 'This is a description',
        'survey_notes' => 'You can put some notes about the survey here'
    ));
    $survey->save();
}

{
    $survey = new Survey(array(
        'survey_permalink' => genPermalink(),
        'survey_name' => 'Survey 5',
        'survey_type' => 'PSU',
        'survey_description' => 'This is a description',
        'survey_notes' => 'You can put some notes about the survey here'
    ));
    $survey->save();
}

User::find(1)->surveys()->attach([1,2,3,4,5]);