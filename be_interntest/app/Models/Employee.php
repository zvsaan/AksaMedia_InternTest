<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory;
    protected $table = 'employees';
    protected $primaryKey = 'id_employee';
    public $incrementing = false;
    protected $keyType = 'uuid';
    protected $fillable = [
        'name',
        'phone',
        'position',
        'division_id',
        'image',
    ];

    public function division()
    {
        return $this->belongsTo(Division::class, 'division_id', 'id_division');
    }
}