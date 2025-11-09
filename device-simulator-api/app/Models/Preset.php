<?php

namespace App\Models;

use App\Enums\DeviceType;
use Illuminate\Database\Eloquent\Model;

class Preset extends Model
{
    protected $fillable = [
        'device_id',
        'name',
        'type',
        'settings',
    ];

    protected $casts = [
        'type' => DeviceType::class,
        'settings' => 'array',
    ];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }
}
