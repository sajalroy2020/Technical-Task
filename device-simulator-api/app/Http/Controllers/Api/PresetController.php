<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PresetRequest;
use App\Http\Resources\PresetResource;
use App\Models\Preset;
use App\Traits\ApiResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class PresetController extends Controller
{
    use ApiResponse;

    // Get Preset data
    public function index()
    {
        $presets = Preset::with('device')->latest()->get();
        return $this->successResponse(PresetResource::collection($presets));
    }

    // store Preset data
    public function store(PresetRequest $request)
    {
        DB::beginTransaction();

        try {
            $preset = Preset::create($request->validated());

            DB::commit();

            return $this->successResponse(
                new PresetResource($preset),
                'Preset created successfully.',
                Response::HTTP_CREATED
            );

        } catch (\Exception $e) {
            DB::rollBack();

            return $this->errorResponse(
                'Failed to create preset.',
                Response::HTTP_INTERNAL_SERVER_ERROR,
                $e->getMessage()
            );
        }
    }

    // Update Preset data
    public function update(PresetRequest $request, Preset $preset)
    {

        DB::beginTransaction();

        try {
            $preset->update($request->validated());

            DB::commit();

            return $this->successResponse(
                new PresetResource($preset),
                'Preset updated successfully.'
            );

        } catch (\Exception $e) {
            DB::rollBack();

            return $this->errorResponse(
                'Failed to update preset.',
                Response::HTTP_INTERNAL_SERVER_ERROR,
                $e->getMessage()
            );
        }
    }

    // Delete Preset data
    public function destroy(Preset $preset)
    {
        DB::beginTransaction();

        try {
            $preset->delete();

            DB::commit();

            return $this->successResponse(
                null,
                'Preset deleted successfully.',
                Response::HTTP_NO_CONTENT
            );

        } catch (\Exception $e) {
            DB::rollBack();

            return $this->errorResponse(
                'Failed to delete preset.',
                Response::HTTP_INTERNAL_SERVER_ERROR,
                $e->getMessage()
            );
        }
    }
}
