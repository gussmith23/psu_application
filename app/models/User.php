<?php

class User extends \Illuminate\Database\Eloquent\Model{
    
    protected $table = 'users';
    
    protected $fillable = ['username', 'email', 'password', 'salt', 'first_name', 'last_name'];
    
}