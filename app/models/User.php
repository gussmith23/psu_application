<?php

class User extends \Illuminate\Database\Eloquent\Model
{

    protected $table = 'users';

    protected $fillable = [
        'username',
        'email',
        'password',
        'salt',
        'first_name',
        'last_name',
        'role',
        'survey_id'
    ];

    public function surveys()
    {
        return $this->belongsToMany('Survey', 'user_survey_join');
    }

}