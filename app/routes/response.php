<?php
/**
 * Created by IntelliJ IDEA.
 * User: mporter
 * Date: 3/2/15
 * Time: 1:33 AM
 */

/**
 *  Get all survey responses
 */
$app->get('/api/survey/response/:survey_id', function ($survey_id) use ($app) {

});


/**
 *  Get a survey response
 */
$app->get('/api/survey/response/:survey_id/:response_id', function ($survey_id, $response_id) use ($app) {

});


/**
 * Create a survey response
 */
$app->post('/api/survey/response/:survey_id/:response_id', function ($survey_id, $response_id) use ($app) {

});


/**
 * Update a survey response
 */
$app->put('/api/survey/response/:survey_id/:response_id', function ($survey_id, $response_id) use ($app) {

});


/**
 * Delete a survey response
 */
$app->delete('/api/survey/response/:survey_id/:response_id', function ($survey_id, $response_id) use ($app) {

});