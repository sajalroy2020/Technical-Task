<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DeviceResource;
use App\Models\Device;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class DeviceController extends Controller
{
    use ApiResponse;

    public function index()
    {
        $devices = Device::with('presets')->get();
        return $this->successResponse(DeviceResource::collection($devices));
    }
}
