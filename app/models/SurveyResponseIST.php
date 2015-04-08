<?php
/**
 * User: mporter
 * Date: 2/25/15
 * Time: 1:19 PM
 */

class SurveyResponseIST extends \Illuminate\Database\Eloquent\Model
{

    protected $table = 'survey_responses_ist';

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
        'high_school_name',
        'high_school_year',
        'ethnicity',
        'interest_undergrad_ist',
        'interest_undergrad_sra',
        'interest_graduate',
        'other_information'
    ];

    protected $hidden = [
        'updated_at',
        'created_at'
    ];

    public function survey()
    {
        return $this->belongsTo('Survey');
    }

}