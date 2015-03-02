<?php

/**
 * User: mporter
 * Date: 2/25/15
 * Time: 1:19 PM
 */
class SurveyResponsePSU extends \Illuminate\Database\Eloquent\Model
{

    protected $table = 'survey_responses_psu';

    protected $fillable = [
        'email',
        'todays_date',
        'first_name',
        'middle_initial',
        'last_name',
        'street_address',
        'city',
        'state',
        'zip_code',
        'telephone',
        'date_of_birth',
        'gender',
        'school_name',
        'school_year',
        'ethnicity',
        'interest_campus',
        'interest_academic'
    ];

    public function survey()
    {
        return $this->belongsTo('Survey');
    }

}