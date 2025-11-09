<?php

namespace App\Models;

use App\Enums\DeviceType;
use Illuminate\Database\Eloquent\Model;

class Device extends Model
{
    protected $fillable = [
        'type',
        'name',
        'settings',
    ];

    protected $casts = [
        'type' => DeviceType::class,
        'settings' => 'array',
    ];

    public function presets()
    {
        return $this->hasMany(Preset::class);
    }
}
