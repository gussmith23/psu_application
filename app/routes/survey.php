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
$app->get('/api/survey/:permalink', function ($permalink) use ($app) {
    if(Survey::where('survey_permalink', '=', $permalink)->first() || Survey::where('survey_status', '=', 'open')->first()) {
        return;
    } else {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_survey'
        ));
        return;
    }
});


/**
 *  Get all surveys
 */
$app->get('/api/survey', function () use ($app) {
    $authBearerToken = $app->request->headers->get('Authorization');
    if (!checkBearerToken($authBearerToken)) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
        return;
    }
});


/**
 *  Get a survey
 */
$app->get('/api/survey/:id', function ($id) use ($app) {
    $authBearerToken = $app->request->headers->get('Authorization');
    if (!checkBearerToken($authBearerToken)) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
        return;
    }
});


/**
 * Create a survey
 */
$app->post('/api/survey/:id', function ($id) use ($app) {
    $authBearerToken = $app->request->headers->get('Authorization');
    if (!checkBearerToken($authBearerToken)) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
        return;
    }
});


/**
 * Update a survey
 */
$app->put('/api/survey/:id', function ($id) use ($app) {
    $authBearerToken = $app->request->headers->get('Authorization');
    if (!checkBearerToken($authBearerToken)) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
        return;
    }
});


/**
 * Delete a survey
 */
$app->delete('/api/survey/:id', function ($id) use ($app) {
    $authBearerToken = $app->request->headers->get('Authorization');
    if (!checkBearerToken($authBearerToken)) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
        return;
    }
});