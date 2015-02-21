<?php

use \Illuminate\Database\Capsule\Manager as Capsule;

/**
 * Array of drivers that can be used with Eloquent.
 */
$driver = array(

    /**
     * SQLite Driver Setup
     */
    'sqlite' => array(
        'driver'    => 'sqlite',
        'database'  => '../app/storage/db.sqlite',
        'prefix'    => ''
    ),

    /**
     * MySQL Driver Setup
     */
    'mysql' => array(
        'driver'    => 'mysql',
        'host'      => '',
        'database'  => '',
        'username'  => '',
        'password'  => '',
        'charset'   => 'utf8',
        'collation' => 'utf8_unicode_ci',
        'prefix'    => ''
    ),

    /**
     * PostgreSQL Driver Setup
     */
    'pgsql' => array(
        'driver'    => 'pgsql',
        'host'      => '',
        'database'  => '',
        'username'  => '',
        'password'  => '',
        'charset'   => 'utf8',
        'prefix'    => '',
        'schema'    => 'public',
    )

);

$capsule = new Capsule();

$capsule->addConnection($driver['sqlite']);

$capsule->setAsGlobal();
$capsule->bootEloquent();
