<?php
/**
 * Created by IntelliJ IDEA.
 * User: mporter
 * Date: 3/2/15
 * Time: 1:25 AM
 */


/**
 * This route is used to make sure that a survey exists. We don't want a user to be able to access
 * a survey if it is either 1) not active or 2) non existent.
 */
$app->get('/api/survey/has/:permalink', function ($permalink) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (Survey::where('survey_permalink', '=', $permalink)->first() && Survey::where('survey_status', '=', 'open')->first()) {
        $survey = Survey::where('survey_permalink', '=', $permalink)->first();
        $app->response->status(200);
        echo json_encode($survey);
    } else {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_survey'
        ));
    }
});


/**
 *  Get all surveys
 */
$app->get('/api/survey', function () use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $app->response->status(200);
        $surveys = User::find($_SESSION['user'])->surveys()->get();
        echo json_encode($surveys);
    }
});


/**
 *  Get a survey
 */
$app->get('/api/survey/:id', function ($id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $survey = Survey::where('id', '=', $id)->first();
        $app->response->status(200);
        echo json_encode($survey);
    }
});

/**
 * Get users who have access to survey
 */
$app->get('/api/survey/users/:id', function ($id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $users = Survey::find($id)->users()->get();
        $user = User::find($_SESSION['user'])->first();
        for($i = 0; $i<sizeof($users); $i++) {
            if($users[$i]['id'] == $user->id) {
                unset($users[$i]);
            }
        }
        echo json_encode($users);
    }
});

$app->post('/api/survey/users/:id', function ($id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $identification = $app->request->post('identification');
        $user = User::where('username', '=', $identification)->orWhere('email', '=', $identification)->first();
        if($user) {
            User::find($user->id)->surveys()->attach([$id]);
            echo json_encode($user);
        } else {
            $app->response->status(400);
            echo json_encode(array(
                'error' => 'user_does_not_exist'
            ));
        }
    }
});


/**
 * Create a survey
 */
$app->post('/api/survey/:id', function ($id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    }
});


/**
 * Update a survey
 */
$app->put('/api/survey/:id', function ($id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $json = json_decode($app->request->getBody());
        $survey = Survey::where('id', '=', $id)->first();
        $survey->survey_permalink = $json->survey_permalink;
        $survey->survey_name = $json->survey_name;
        $survey->survey_description = $json->survey_description;
        $survey->survey_notes = $json->survey_notes;
        $survey->survey_status = $json->survey_status;
        $survey->save();
    }
});


/**
 * Delete a survey
 */
$app->delete('/api/survey/:id', function ($id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {

    }
});