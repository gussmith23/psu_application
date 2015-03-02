<?php
/**
 * Created by IntelliJ IDEA.
 * User: mporter
 * Date: 2/25/15
 * Time: 1:18 PM
 */

class Student extends \Illuminate\Database\Eloquent\Model
{

    protected $table = 'students';

    protected $fillable = [
        'identification',
        'name',
        'address',
        'id_survey_response_psu',
        'id_survey_response_ist',
        'id_status_report'
    ];

    public function responsePSU()
    {
        return $this->hasOne('SurveyResponsePSU');
    }

    public function responseIST()
    {
        return $this->hasOne('SurveyResponseIST');
    }

    public function responseStatusReport()
    {
        return $this->hasOne('StatusReport');
    }

}