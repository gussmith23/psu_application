<?php
/**
 * Created by IntelliJ IDEA.
 * User: mporter
 * Date: 2/25/15
 * Time: 1:19 PM
 */

class StatusReport extends \Illuminate\Database\Eloquent\Model
{

    protected $table = 'status_reports';

    protected $fillable = [
        'semester',
        'status',
        'type',
        'name',
        'major',
        'campus',
        'address_1',
        'address_2',
        'address_3',
        'ethnicity',
        'gender'
    ];

    public function student()
    {
        return $this->belongsTo('Student');
    }

}