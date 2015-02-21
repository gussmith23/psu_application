<?php

/**
 * Put all your schema maps here
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
    $table->timestamps();
});

Capsule::schema()->create('users_surveys', function ($table) {
    $table->increments('id');
    $table->integer('survey_id')->unsigned();
    $table->foreign('survey_id')->references('id')->on('surveys');
    $table->integer('user_id')->unsigned();
    $table->foreign('user_id')->references('id')->on('users');
    $table->timestamps();
});

Capsule::schema()->create('surveys', function ($table) {
    $table->increments('id');
    $table->string('name');
    $table->string('status');
    $table->string('type');
    $table->timestamps();
});

Capsule::schema()->create('survey_results_psu', function ($table) {
    $table->increments('id');
    $table->integer('survey_id')->unsigned();
    $table->foreign('survey_id')->references('id')->on('surveys');
    $table->string('email');
    $table->date('date'); // need this incase the mobile app doesnt write to the db right away
    $table->string('first_name');
    $table->string('middle_initial')->nullable();
    $table->string('last_name');
    $table->string('street_address');
    $table->string('city');
    $table->string('state');
    $table->string('zip_code');
    $table->string('telephone');
    $table->date('date_of_birth');
    $table->string('gender');
    $table->string('current_previous_school_name');
    $table->string('education_status');
    $table->string('ethnicity')->default('');
    $table->string('campus_choice')->default('');
    $table->string('academic_interests')->default('');
    $table->timestamps();
});

Capsule::schema()->create('survey_results_ist', function ($table) {
    $table->increments('id');
    $table->integer('survey_id')->unsigned();
    $table->foreign('survey_id')->references('id')->on('surveys');
    $table->string('email');
    $table->date('date');
    $table->string('first_name');
    $table->string('middle_initial')->default('');
    $table->string('last_name');
    $table->string('street_address');
    $table->string('city');
    $table->string('state');
    $table->string('zip_code');
    $table->string('telephone');
    $table->date('date_of_birth');
    $table->string('gender');
    $table->string('high_school_name');
    $table->string('high_school_year');
    $table->string('ethnicity')->default('');
    $table->string('undergraduate_options_ist');
    $table->string('undergraduate_options_sra');
    $table->string('interested_in_graduate_programs')->default('no');
    $table->string('other_information')->default('');
});

