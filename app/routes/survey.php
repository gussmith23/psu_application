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
    $authBearerToken = $app->request->headers->get('Authorization');
    if (!checkBearerToken($authBearerToken)) {
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
    $authBearerToken = $app->request->headers->get('Authorization');
    $app->response->headers->set('Content-Type', 'application/json');
    if (!checkBearerToken($authBearerToken)) {
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
 * Create a survey
 */
$app->post('/api/survey/:id', function ($id) use ($app) {
    $authBearerToken = $app->request->headers->get('Authorization');
    $app->response->headers->set('Content-Type', 'application/json');
    if (!checkBearerToken($authBearerToken)) {
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
    $authBearerToken = $app->request->headers->get('Authorization');
    $app->response->headers->set('Content-Type', 'application/json');
    if (!checkBearerToken($authBearerToken)) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    }
});


/**
 * Delete a survey
 */
$app->delete('/api/survey/:id', function ($id) use ($app) {
    $authBearerToken = $app->request->headers->get('Authorization');
    $app->response->headers->set('Content-Type', 'application/json');
    if (!checkBearerToken($authBearerToken)) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {

    }
});