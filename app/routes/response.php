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
$app->get('/api/survey/responses/:survey_id', function ($survey_id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $responses = Survey::find($survey_id)->responsesIST()->get();
        echo json_encode($responses);
    }
});


/**
 *  Get a response to a survey
 */
$app->get('/api/survey/response/:survey_id/:response_id', function ($survey_id, $response_id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'route_not_setup'
        ));
    }
});


/**
 * Create a response to a survey
 */
$app->post('/api/survey/response/:permalink', function ($permalink) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    // Does this route need authentication? If not, it might be a good
    // idea to require the permalink to be able to post.
    $survey = Survey::where('survey_permalink', '=', $permalink)->first();
    if ($survey) {

        $data = [
            'email' => $app->request->post('email'),
            'todays_date' => date('Y-m-d H:i:s'),
            'first_name' => $app->request->post('first_name'),
            'middle_initial' => $app->request->post('middle_initial'),
            'last_name' => $app->request->post('last_name'),
            'street_address' => $app->request->post('street_address'),
            'city' => $app->request->post('city'),
            'state' => $app->request->post('state'),
            'zip_code' => $app->request->post('zip_code'),
            'telephone' => $app->request->post('telephone'),
            'date_of_birth' => $app->request->post('date_of_birth'),
            'gender' => $app->request->post('gender'),
            'high_school_name' => $app->request->post('high_school_name'),
            'high_school_year' => $app->request->post('high_school_year'),
            'ethnicity' => $app->request->post('ethnicity'),
            'interest_undergrad_ist' => $app->request->post('interest_undergrad_ist'),
            'interest_undergrad_sra' => $app->request->post('interest_undergrad_sra'),
            'interest_graduate' => $app->request->post('interest_graduate'),
            'other_information' => $app->request->post('other_information')
        ];

        $response = new SurveyResponseIST($data);
        $survey->responsesIST()->save($response);

        echo json_encode([
            'status' => 200
        ]);

    } else {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'survey_does_not_exist'
        ));
    }
});


/**
 * Update a response to a survey
 */
$app->put('/api/survey/response/:survey_id/:response_id', function ($survey_id, $response_id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'route_not_setup'
        ));
    }
});


/**
 * Delete a response to a survey
 */
$app->delete('/api/survey/responses/:survey_id', function ($survey_id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $resId = $app->request->delete('responses_id');
        try{
            foreach ($resId as $id) {
                SurveyResponseIST::find($id)->delete();
            }
            echo json_encode(array(
                'status' => 200
            ));
        } catch (Exception $e) {
            $app->response->status(400);
            echo json_encode(array(
                'error' => 'could_not_remove_all'
            ));
        }
    }
});