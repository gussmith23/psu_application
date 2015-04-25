<?php

/*

    Some tables may not be used but that is ok. They won't affect the 
    overall outcome of the application.

*/

use Illuminate\Database\Capsule\Manager as Capsule;

Capsule::schema()->create('users', function ($table) {
    $table->increments('id');
    $table->string('username')->unique();
    $table->string('email')->unique();
    $table->string('password');
    $table->string('salt');
    $table->string('first_name');
    $table->string('last_name');
    $table->string('role')->default('user');
    $table->timestamps();
});


Capsule::schema()->create('surveys', function ($table) {
    $table->increments('id');
    $table->string('survey_permalink')->unique();
    $table->string('survey_name');
    $table->string('survey_type'); // i.e. PSU, IST, etc.
    $table->string('survey_description');
    $table->text('survey_notes');
    $table->string('survey_status')->default('closed'); // active, closed
    $table->timestamps();
});


Capsule::schema()->create('user_survey_join', function ($table) {
    $table->increments('id');
    $table->integer('user_id')->unsigned()->nullable();
    $table->foreign('user_id')->references('id')->on('users');
    $table->integer('survey_id')->unsigned()->nullable();
    $table->foreign('survey_id')->references('id')->on('surveys');
});


Capsule::schema()->create('survey_responses_ist', function ($table) {
    $table->increments('id');
    $table->integer('survey_id')->unsigned();
    $table->foreign('survey_id')->references('id')->on('surveys');
    $table->string('email');
    $table->string('todays_date');
    $table->string('first_name');
    $table->string('middle_initial')->nullable();
    $table->string('last_name');
    $table->string('street_address');
    $table->string('city');
    $table->string('state');
    $table->string('zip_code');
    $table->string('telephone');
    $table->string('date_of_birth');
    $table->string('gender');
    $table->string('high_school_name');
    $table->string('high_school_year');
    $table->string('ethnicity')->nullable();
    $table->string('interest_undergrad_ist')->nullable();
    $table->string('interest_undergrad_sra')->nullable();
    $table->string('interest_graduate')->nullable();
    $table->string('other_information')->nullable();
    $table->timestamps();
});


Capsule::schema()->create('survey_responses_psu', function ($table) {
    $table->increments('id');
    $table->integer('survey_id')->unsigned();
    $table->foreign('survey_id')->references('id')->on('surveys');
    $table->string('email');
    $table->string('todays_date');
    $table->string('first_name');
    $table->string('middle_initial')->nullable();
    $table->string('last_name');
    $table->string('street_address');
    $table->string('city');
    $table->string('state');
    $table->string('zip_code');
    $table->string('telephone');
    $table->string('date_of_birth');
    $table->string('gender');
    $table->string('school_name');
    $table->string('school_year');
    $table->string('ethnicity')->nullable();
    $table->string('interest_campus')->nullable();
    $table->string('interest_academic')->nullable();
    $table->timestamps();
});


Capsule::schema()->create('status_reports', function ($table) {
    $table->increments('id');
    $table->string('semester');
    $table->string('status');
    $table->string('type');
    $table->string('name');
    $table->string('major');
    $table->string('campus');
    $table->string('address_1');
    $table->string('address_2')->nullable();
    $table->string('address_3')->nullable();
    $table->string('ethnicity')->nullable();
    $table->string('gender');
    $table->timestamps();
});


Capsule::schema()->create('students', function ($table) {
    $table->increments('id');
    $table->string('identification')->unique();
    $table->string('name')->unique();
    $table->string('address')->unique();
    $table->integer('id_survey_response_psu')->unsigned()->nullable();
    $table->foreign('id_survey_response_psu')->references('id')->on('survey_responses_psu');
    $table->integer('id_survey_response_ist')->unsigned()->nullable();
    $table->foreign('id_survey_response_ist')->references('id')->on('survey_responses_ist');
    $table->integer('id_status_report')->unsigned()->nullable();
    $table->foreign('id_status_report')->references('id')->on('status_reports');
    $table->timestamps();
});