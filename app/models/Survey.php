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
        'survey_status'
    ];

    public function users()
    {
        return $this->belongsToMany('User');
    }

    public function responsesPSU()
    {
        return $this->hasMany('SurveyResponsesPSU');
    }

    public function responsesIST()
    {
        return $this->hasMany('SurveyResponsesIST');
    }

}