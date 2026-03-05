<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'code',
        'credit_hours',
        'created_by'
    ];

    // Each course belongs to a user (admin)
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // A course can have many students
    public function students()
    {
        return $this->belongsToMany(User::class)
                    ->withTimestamps();
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }
}