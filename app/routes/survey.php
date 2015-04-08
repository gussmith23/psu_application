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
        $surveys = User::find($_SESSION['user'])->surveys()->take(100)->get();
        echo json_encode($surveys->reverse());
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
        $user = User::where('id', '=', $_SESSION['user'])->first();
        $users_minus_self = [];
        for ($i = 0; $i < sizeof($users); $i++) {
            if ($users[$i]->id != $user->id) {
                array_push($users_minus_self, $users[$i]);
            }
        }
        echo json_encode($users_minus_self);
    }
});


/**
 * attach user to survey
 */
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
        if ($user) {
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
 * detach user to survey
 */
$app->delete('/api/survey/users/:id', function ($id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $userId = $app->request->delete('id');
        User::find($userId)->surveys()->detach($id);
        echo json_encode(array(
            'status' => 200,
            'ok' => 'successfully_detached'
        ));
    }
});


/**
 * Create a survey
 */
$app->post('/api/survey', function () use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {
        $permalink = genPermalink();
        while (true) {
            $permalink = genPermalink();
            $survey = Survey::where('survey_permalink', '=', $permalink)->first();
            if ($survey == null) break;
        }
        $data = [
            'survey_permalink' => $permalink,
            'survey_name' => $app->request->post('survey_name'),
            'survey_description' => $app->request->post('survey_description'),
            'survey_notes' => 'Enter some notes about the survey',
            'survey_type' => 'IST',
            'survey_status' => 'closed'
        ];
        $survey = new Survey($data);
        $survey->save();
        User::find($_SESSION['user'])->surveys()->attach([$survey->id]);
        echo json_encode([
            'status' => 200,
            'data' => $survey->id
        ]);
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
        $data = json_decode($app->request->getBody());
        $survey = Survey::where('id', '=', $id)->first();
        $survey->survey_permalink = $data->survey_permalink;
        $survey->survey_name = $data->survey_name;
        $survey->survey_description = $data->survey_description;
        $survey->survey_notes = $data->survey_notes;
        $survey->survey_status = $data->survey_status;
        $survey->save();
        echo json_encode(array(
            'status' => '200'
        ));
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
        $survey = Survey::where('id', '=', $id)->first();
        if ($survey != null) {
            $survey->delete();
            echo json_encode([
                'status' => 200
            ]);
        } else {
            $app->response->status(400);
            echo json_encode([
                'error' => 'survey_does_not_exist'
            ]);
        }
    }
});

/**
 * Export survey
 */
///api/survey/export/{{id}}
$app->get('/api/survey/export/:id', function ($id) use ($app) {
    $app->response->headers->set('Content-Type', 'application/json');
    if (!ensureAuthenticated()) {
        $app->response->status(400);
        echo json_encode(array(
            'error' => 'invalid_bearer_token'
        ));
    } else {

        $table = Survey::find($id)->responsesIST()->get();
        $survey = Survey::find($id);
        $survey_name = $survey->survey_name;
        $survey_name = str_replace(' ', '_', $survey_name);

        $app->response->headers->set('Content-type', 'text/csv');
        $app->response->headers->set('Pragma', 'public');
        $app->response->headers->set('Content-Transfer-Encoding', 'binary');
        $app->response->headers->set('Content-Disposition', 'attachment; filename=' . $survey_name . '.csv');

        $output_header = [
            'id',
            'email',
            'submission date',
            'first name',
            'middle initial',
            'last name',
            'address',
            'city',
            'state',
            'zip code',
            'telephone',
            'date of birth',
            'high school name',
            'high school year',
            'ethnicity',
            'interests ist',
            'interests sra',
            'interests graduate',
            'other information'
        ];
        $output = implode(",", $output_header);
        $output .= "\n";
        foreach ($table as $row) {
            $output .= implode(",", $row->toArray());
            $output .= "\n";
        }
        $output = trim($output, "\n");
        echo $output;
    }
});

