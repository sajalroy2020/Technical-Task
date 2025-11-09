<?php

namespace Database\Seeders;

use App\Enums\DeviceType;
use App\Models\Device;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DeviceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create devices
        Device::create([
            'type' => DeviceType::FAN,
            'name' => 'Living Room Fan',
            'settings' => ['power' => false, 'speed' => 0]
        ]);

        Device::create([
            'type' => DeviceType::LIGHT,
            'name' => 'Kitchen Light',
            'settings' => ['power' => false, 'brightness' => 50, 'color' => '#ffffff']
        ]);
    }
}
