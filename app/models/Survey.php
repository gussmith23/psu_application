<?php

/**
 * Created by IntelliJ IDEA.
 * User: mporter
 * Date: 2/25/15
 * Time: 1:17 PM
 */
class Survey extends \Illuminate\Database\Eloquent\Model
{

    protected  $table = 'surveys';

    protected $fillable = [
        'survey_permalink',
        'survey_name',
        'survey_type',
        'survey_description',
        'survey_notes',
        'survey_status',
        'user_id'
    ];

    public function users()
    {
        return $this->belongsToMany('User', 'user_survey_join');
    }

    public function responsesPSU()
    {
        return $this->hasMany('SurveyResponsePSU');
    }

    public function responsesIST()
    {
        return $this->hasMany('SurveyResponseIST');
    }

}