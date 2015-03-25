<?php
/**
 * Created by IntelliJ IDEA.
 * User: mporter
 * Date: 3/2/15
 * Time: 1:33 AM
 */


/**
 *  Get all responses to a survey
 */
$app->get('/api/survey/response/:survey_id', function ($survey_id) use ($app) {
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    }
});


/**
 *  Get a response to a survey
 */
$app->get('/api/survey/response/:survey_id/:response_id', function ($survey_id, $response_id) use ($app) {
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    }
});


/**
 * Create a response to a survey
 */
$app->post('/api/survey/response/:permalink', function ($permalink) use ($app) {
    // Does this route need authentication? If not, it might be a good
    // idea to require the permalink to be able to post.
});


/**
 * Update a response to a survey
 */
$app->put('/api/survey/response/:survey_id/:response_id', function ($survey_id, $response_id) use ($app) {
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    }
});


/**
 * Delete a response to a survey
 */
$app->delete('/api/survey/response/:survey_id/:response_id', function ($survey_id, $response_id) use ($app) {
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    }
});